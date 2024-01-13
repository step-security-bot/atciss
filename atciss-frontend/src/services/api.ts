import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchWithAuth } from "app/auth"
import { tafFormat } from "app/utils"
import { Agreements } from "services/agreementsApi"
// import { Booking } from "services/bookingApi"
import { SectorStatus } from "services/sectorstatusApi"
import { AircraftPerformanceData } from "types/aircraft"
import { AreaBooking } from "types/area"
import { Aerodrome, AirwaySegment, Navaid } from "types/dfs"
import { Event, FlowMeasure } from "types/ecfmp"
import { LoaItem } from "types/loa"
import { Notam } from "types/notam"
import { SectorData } from "types/vatglasses"
import { AerodromeTraffic, Atis, Controller } from "types/vatsim"
import { Metar, Sigmet } from "types/wx"

export const api = createApi({
  baseQuery: fetchWithAuth,
  tagTypes: ["agreements", "notamSeen", "sectorstatus"],
  endpoints: (builder) => ({
    aerodromesByIcaos: builder.query<{ [id: string]: Aerodrome }, string[]>({
      query: (icaoList) => ({
        url: "aerodrome",
        params: icaoList.map((icao) => ["icao", icao]),
      }),
    }),

    agreementsByFir: builder.query<Agreements, string>({
      query: (fir) => ({
        url: `agreements/${fir}`,
      }),
      providesTags: (result, _, arg) =>
        result
          ? ["agreements", { type: "agreements", id: arg }]
          : ["agreements"],
    }),
    editAgreement: builder.mutation<
      Agreements,
      { fir: string; agreements: string }
    >({
      query: ({ fir, agreements }) => ({
        url: `agreements/${fir}`,
        body: agreements,
        method: "POST",
      }),
      invalidatesTags: (_r, _e, arg) => [{ type: "agreements", id: arg.fir }],
    }),

    metarsByIcaoCodes: builder.query<{ [id: string]: Metar }, string[]>({
      query: (icaoList) => ({
        url: "metar",
        params: icaoList.map((icao) => ["icao", icao]),
      }),
    }),
    rawMetar: builder.query<string, string>({
      query: (icao) => ({
        url: "metar/raw",
        params: [["id", icao]],
        responseHandler: "text",
      }),
    }),

    searchAircrafts: builder.query<AircraftPerformanceData[], string>({
      query: (q) => ({
        url: "aircraft/search",
        params: { query: q },
      }),
    }),

    airways: builder.query<AirwaySegment[], "LOWER" | "UPPER">({
      query: (hiLo) => ({
        url: `airway/${hiLo}`,
      }),
    }),

    aliases: builder.query<string, string>({
      query: (fir) => ({
        url: `aliases/${fir}`,
      }),
    }),

    areas: builder.query<AreaBooking[], void>({
      query: () => ({
        url: "areas/",
      }),
    }),

    atisByIcaoCodes: builder.query<{ [id: string]: Atis }, string[]>({
      query: (icaoList) => ({
        url: "atis",
        params: icaoList.map((icao) => ["icao", icao]),
      }),
    }),

    // bookingsByRegions: builder.query<Booking[], string[]>({
    //   query: (regions) => ({
    //     url: "booking",
    //     params: regions.map((region) => ["region", region]),
    //   }),
    // }),

    controllers: builder.query<Controller[], void>({
      query: () => ({
        url: "vatsim/controllers",
      }),
    }),

    ecfmpByFir: builder.query<FlowMeasure[], string>({
      query: (fir) => ({
        url: `ecfmp/${fir}`,
      }),
    }),

    eventsByFir: builder.query<Event[], string[]>({
      query: (firs) => ({
        url: "event",
        params: firs.map((fir) => ["fir", fir]),
      }),
    }),

    loaBySectors: builder.query<LoaItem[], string[]>({
      query: (sectors) => ({
        url: "loa",
        params: sectors.map((sector) => ["sector", sector.replace(/.*\//, "")]),
      }),
    }),

    navaidsByDesignators: builder.query<Navaid[], string[]>({
      query: (designatorList) => ({
        url: "navaid",
        params: designatorList.map((desig) => ["id", desig]),
      }),
    }),
    searchNavaids: builder.query<Navaid[], string>({
      query: (searchStr) => ({
        url: "navaid/search",
        params: { q: searchStr },
      }),
    }),
    navaidsByAirway: builder.query<Navaid[], string | null>({
      query: (airway) => ({
        url: `navaid/airway/${airway}`,
      }),
    }),

    notamsByIcaoCodes: builder.query<{ [icao: string]: Notam[] }, string[]>({
      query: (icaoList) => ({
        url: "notam",
        params: icaoList.map((icao) => ["icao", icao]),
      }),
    }),
    notamsSeen: builder.query<string[], void>({
      query: () => ({
        url: "notam/read",
      }),
      providesTags: ["notamSeen"],
    }),
    notamSeen: builder.mutation<void, string>({
      query: (id) => ({
        url: "notam/read",
        params: { id },
        method: "POST",
      }),
      invalidatesTags: ["notamSeen"],
    }),
    notamUnseen: builder.mutation<void, string>({
      query: (id) => ({
        url: "notam/read",
        params: { id },
        method: "DELETE",
      }),
      invalidatesTags: ["notamSeen"],
    }),

    sectors: builder.query<SectorData, void>({
      query: () => ({
        url: "airspace",
      }),
    }),

    sectorStatusByIds: builder.query<{ [id: string]: SectorStatus }, string[]>({
      query: (ids) => ({
        url: "sectorstatus",
        params: ids.map((id) => ["id", id]),
      }),
      providesTags: (result) =>
        result
          ? [
              "sectorstatus",
              ...Object.keys(result).map((id) => ({
                type: "sectorstatus" as const,
                id,
              })),
            ]
          : ["sectorstatus"],
    }),
    editSectorStatus: builder.mutation<
      SectorStatus,
      Pick<SectorStatus, "id" | "status">
    >({
      query: (body) => ({
        url: "sectorstatus",
        body,
        method: "POST",
      }),
      invalidatesTags: (_r, _e, arg) => [{ type: "sectorstatus", id: arg.id }],
    }),

    sigmet: builder.query<Sigmet[], string[]>({
      query: (firs) => ({
        url: "sigmet",
        params: firs.map((fir) => ["fir", fir]),
      }),
    }),

    tafByIcaoCodes: builder.query<{ [id: string]: string }, string[]>({
      query: (icaoList) => ({
        url: "taf",
        params: icaoList.map((icao) => ["icao", icao]),
      }),
      transformResponse: (tafs) =>
        Object.entries(tafs ?? {}).reduce(
          (acc, [ad, taf]) => ({ ...acc, [ad]: tafFormat(taf) }),
          {},
        ),
    }),

    traffic: builder.query<AerodromeTraffic, string>({
      query: (q) => ({
        url: "traffic",
        params: { icao: q },
      }),
    }),
  }),
})
