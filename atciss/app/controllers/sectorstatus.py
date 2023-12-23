"""Application controllers - metar."""
from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Annotated, Dict, Sequence, Optional
from fastapi_async_sqlalchemy import db
from fastapi import APIRouter, HTTPException, Query, Depends
from sqlmodel import select
from starlette.status import HTTP_403_FORBIDDEN

from ..views.sectorstatus import SectorStatus, Status

from ..controllers.auth import get_user
from ..models import User

router = APIRouter()


@router.get(
    "/sectorstatus",
)
async def sectorstatus_get(
    sectors: Annotated[Sequence[str], Query(alias="id")],
    user: Annotated[User, Depends(get_user)],
) -> Dict[str, SectorStatus]:
    """Get status for multiple sectors."""

    stmt = select(SectorStatus).where(SectorStatus.id.in_(sectors))
    sector_rows = await db.session.scalars(stmt)
    found_sectors = {s.id: s for s in sector_rows}
    defaults = {
        id: SectorStatus(
            id=id, status=Status.green, changed_by_cid="unset", updated_at=datetime.now(UTC)
        )
        for id in sectors
    }
    return defaults | found_sectors


@dataclass
class StatusData:
    id: str
    status: Status


@router.post(
    "/sectorstatus",
)
async def sectorstatus_post(
    status_data: StatusData,
    user: Annotated[User, Depends(get_user)],
) -> Optional[SectorStatus]:
    """Set status for a sector."""

    if user.rating not in ["S2", "S3", "C1", "C3", "I1", "I3", "SUP", "ADM"]:
        raise HTTPException(HTTP_403_FORBIDDEN, f"not allowed with rating {user.rating}")
    async with db():
        stmt = select(SectorStatus).where(SectorStatus.id == status_data.id)
        sector = await db.session.scalar(stmt)

        if sector is None:
            sector = SectorStatus(
                id=status_data.id,
                status=status_data.status,
                changed_by_cid=str(user.cid),
                updated_at=datetime.now(UTC),
            )
        else:
            sector.status = status_data.status
            sector.changed_by_cid = str(user.cid)
            sector.updated_at = datetime.now(UTC)

        sector = await db.session.merge(sector)
        await db.session.commit()

    return sector
