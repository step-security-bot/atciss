import { Polygon, Tooltip } from "react-leaflet"
import { Box, Text } from "theme-ui"
import { z3 } from "../../app/utils"
import { Sector, sectorApi } from "../../services/airspaceApi"
import { useAppSelector } from "../../app/hooks"
import { selectSelectedPosition } from "../../services/activePositionSlice"

type SectorPolygonProps = {
  sector: Sector
  name: string
  controllingSector: string
}

export const SectorPolygon = ({
  sector: { points, min, max },
  name,
  controllingSector,
}: SectorPolygonProps) => {
  const { data } = sectorApi.useGetByRegionQuery("germany")
  const selectedPosition = useAppSelector(selectSelectedPosition)

  return (
    <Polygon
      pathOptions={{
        color: data?.positions[controllingSector].colours[0].hex,
        weight: controllingSector === selectedPosition ? 5 : 1,
        opacity: 0.5,
        fillOpacity: controllingSector === selectedPosition ? 0.5 : 0.3,
      }}
      positions={points}
    >
      <Tooltip>
        <Box>
          <Text variant="label">{name}</Text> by {controllingSector}
        </Box>
        <Box>
          FL{z3(min ?? 0)}-FL{z3(max ?? 660)}
        </Box>
      </Tooltip>
    </Polygon>
  )
}