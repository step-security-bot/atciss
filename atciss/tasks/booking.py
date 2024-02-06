from typing import Annotated

from aiohttp import ClientSession
from loguru import logger
from pydantic import TypeAdapter
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from taskiq_dependencies import Depends

from atciss.app.utils import get_aiohttp_client
from atciss.app.views.booking import Booking, VatbookData
from atciss.config import settings
from atciss.tkq import broker


@broker.task()
async def fetch_booking(
    http_client: Annotated[ClientSession, Depends(get_aiohttp_client)],
) -> None:
    """Periodically fetch sector data."""
    async with http_client.get("https://atc-bookings.vatsim.net/api/booking") as res:
        data = TypeAdapter(list[Booking]).validate_python(await res.json())

    async with http_client.get("http://vatbook.euroutepro.com/xml2.php") as res:
        try:
            vatbook_data = VatbookData.from_xml(await res.read())
        except Exception as e:
            logger.warning(e)
            raise

    logger.info(f"Vatsim bookings received: {len(data)} bookings")
    logger.info(f"Vatbook bookings received: {len(vatbook_data.atcs.bookings)} bookings")

    engine = create_async_engine(
        url=str(settings.DATABASE_DSN),
    )

    async with AsyncSession(engine) as session:
        callsigns = await session.execute(select(Booking.callsign).distinct())
        data.extend(
            Booking.model_validate(b)
            for b in vatbook_data.atcs.bookings
            if b.callsign not in callsigns.all()
        )

        for booking in data:
            _ = await session.merge(booking)

        await session.commit()
