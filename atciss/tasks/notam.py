from typing import Annotated

from aiohttp import ClientSession
from bs4 import BeautifulSoup
from fastapi import Depends
from loguru import logger
from parsimonious import ParseError
from pynotam import Notam
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlmodel import select

from atciss.app.utils import Redis, get_aiohttp_client, get_redis
from atciss.app.views.dfs_aixm import Aerodrome
from atciss.config import settings
from atciss.tkq import broker


def convert_notam(n: str) -> Notam | None:
    try:
        return Notam.from_str(f"({n.strip()})")
    except ParseError as e:
        logger.debug(f"could not parse notam: {n}\n{e}")

    return None


@broker.task(schedule=[{"cron": "*/30 * * * *"}])
async def fetch_notam(
    http_client: Annotated[ClientSession, Depends(get_aiohttp_client)],
    redis: Annotated[Redis, Depends(get_redis)],
) -> None:
    """Periodically fetch relevant NOTAMs."""
    engine = create_async_engine(
        url=str(settings.DATABASE_DSN),
    )

    all_icao = settings.FIRS
    async with AsyncSession(engine) as session:
        statement = select(Aerodrome)
        ads = await session.execute(statement)
        for (ad,) in ads.fetchall():
            all_icao.append(ad.icao_designator)

    notams = []
    for notams_to_fetch in (
        all_icao[i * 50 : i * 50 + 50] for i in range(int(len(all_icao) / 50) + 1)
    ):
        async with http_client.get(
            "https://www.notams.faa.gov/dinsQueryWeb/queryRetrievalMapAction.do"
            + f"?reportType=Raw&retrieveLocId={'+'.join(notams_to_fetch)}"
            + "&actionType=notamRetrievalByICAOs&submit=View+NOTAMs",
        ) as res:
            notam_html = BeautifulSoup(await res.text(), "html.parser")

        for notam_elem in notam_html.find_all("pre"):
            notam = convert_notam(notam_elem.string)
            if notam is not None and len(notam.location) > 0:
                notams.append(notam)

    async with redis.pipeline() as pipe:
        for notam in notams:
            for location in notam.location:
                pipe.set(f"notam:{location}:{notam.notam_id}", notam.full_text)
        logger.info(f"NOTAMs: {len(notams)} received")
        await pipe.execute()
