import { Polygon, Tooltip } from "react-leaflet"
import { Box, Text } from "theme-ui"
import { z3 } from "../../app/utils"
import {
  Sector as SectorBounds,
  sectorApi,
  selectAirports,
  selectSector,
} from "../../services/sectorApi"
import { useAppSelector } from "../../app/hooks"
import {
  selectOwner,
  selectSelectedPosition,
} from "../../services/activePositionSlice"
import createCachedSelector from "re-reselect"
import { selectLevel } from "../../services/mapSlice"
import { selectAllAtis } from "../../services/atisApi"
import { RootState } from "../../app/store"
import { useEffect, useRef, useState } from "react"
import { VerticalBoundary } from "./VerticalBoundary"
import { LatLng } from "leaflet"

const selectSectorBounds = createCachedSelector(
  [
    selectSector,
    selectLevel,
    selectAirports,
    selectAllAtis,
    (_state: RootState, id: string) => id,
  ],
  (sector, level, airports, atis) =>
    sector.sectors
      .filter((s) => (s.min ?? 0) <= level && level < (s.max ?? 999))
      .filter(
        (s) =>
          s.runways.length === 0 ||
          s.runways.some((rwy) => {
            const rwysInUse = atis?.[rwy.icao]?.runways_in_use ?? []
            const rwyPriority = airports?.[rwy.icao]?.runways ?? []
            return rwysInUse.length > 0
              ? rwysInUse.some((activeRwy) =>
                  typeof rwy.runway === "string"
                    ? activeRwy.startsWith(rwy.runway)
                    : rwy.runway.every((rwy) => rwysInUse.includes(rwy)),
                )
              : rwyPriority[0] === rwy.runway
          }),
      ),
)((_state, id) => id)

export const Sector = ({ id }: { id: string }) => {
  const owner = useAppSelector((store) => selectOwner(store, id))
  const sectorBounds = useAppSelector((store) => selectSectorBounds(store, id))

  return owner
    ? sectorBounds.map((sectorBounds, index) => (
        <SectorPolygon key={index} sectorBounds={sectorBounds} id={id} />
      ))
    : []
}

type SectorPolygonProps = {
  sectorBounds: SectorBounds
  id: string
}

export const SectorPolygon = ({
  sectorBounds: { points, min, max },
  id,
}: SectorPolygonProps) => {
  sectorApi.useGetQuery()
  const owner = useAppSelector((store) => selectOwner(store, id))
  const sector = useAppSelector((store) => selectSector(store, id))
  const selectedPosition = useAppSelector(selectSelectedPosition)
  const polygon = useRef<L.Polygon>(null)
  const [center, setCenter] = useState<LatLng | null>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore (fixes "layer not on map", no public API)
    if (polygon.current && polygon.current._map) {
      setCenter(polygon.current.getCenter())
    }

    polygon.current?.on("add", () => {
      polygon.current && setCenter(polygon.current.getCenter())
    })
  }, [polygon.current])

  return (
    owner && (
      <Polygon
        pathOptions={{
          color: owner?.colours[0]?.hex,
          weight: owner?.id === selectedPosition ? 5 : 1,
          opacity: 0.5,
          fillOpacity: owner?.id === selectedPosition ? 0.5 : 0.3,
        }}
        positions={points}
        ref={polygon}
      >
        <VerticalBoundary
          color={owner?.colours[0]?.hex}
          center={center}
          min={min}
          max={max}
        />
        <Tooltip>
          <Box sx={{ fontSize: "1" }}>
            <Text variant="label">{sector.id}</Text>
            {sector.remark && ` (${sector.remark})`} by {owner?.name}
          </Box>
          <Box sx={{ fontSize: "1" }}>
            FL{z3(min ?? 0)}-FL{z3(max ?? 660)}
          </Box>
        </Tooltip>
      </Polygon>
    )
  )
}
