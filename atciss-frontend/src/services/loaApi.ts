import { createSelector } from "@reduxjs/toolkit"
import { api } from "services/api"
import { RootState } from "../app/store"
import { selectOwnedSectors } from "services/activePositions"
import { LoaItem } from "types/loa"

const sortBy = (attrs: (keyof LoaItem)[]) => (a: LoaItem, b: LoaItem) => {
  for (const attr of attrs) {
    if (a[attr] === null || typeof a[attr] === "boolean") continue
    const comp =
      typeof a[attr] === "string"
        ? (a[attr] as string).localeCompare(b[attr] as string)
        : (a[attr] as number) - (b[attr] as number)
    if (comp !== 0) return comp
  }

  return 0
}

const selectByOwnedSectors = createSelector(
  selectOwnedSectors,
  api.endpoints.loaBySectors.select,
)
const selectOwnedLoas = createSelector(
  (state: RootState) => state,
  selectByOwnedSectors,
  (state, selector) => selector(state)?.data ?? [],
)
const selectRelevantLoas = createSelector(
  selectOwnedLoas,
  selectOwnedSectors,
  (loas, ownedSectors) =>
    loas.filter(
      (loa) =>
        !ownedSectors.includes(loa.from_sector) ||
        !ownedSectors.includes(loa.to_sector),
    ),
)

export const selectRelevantExitLoas = createSelector(
  selectRelevantLoas,
  selectOwnedSectors,
  (relevantLoas, ownedSectors) =>
    relevantLoas
      .filter((loa) => ownedSectors.includes(loa.from_sector))
      .sort(sortBy(["from_sector", "cop", "to_sector", "to_fir", "adep_ades"])),
)

export const selectRelevantEntryLoas = createSelector(
  selectRelevantLoas,
  selectOwnedSectors,
  (relevantLoas, ownedSectors) =>
    relevantLoas
      .filter((loa) => ownedSectors.includes(loa.to_sector))
      .sort(
        sortBy(["to_sector", "cop", "from_sector", "from_fir", "adep_ades"]),
      ),
)

const filterFn = (filter: string, to_from: "to" | "from") => (loa: LoaItem) =>
  loa.aerodrome.toLowerCase().includes(filter.toLowerCase()) ||
  loa.from_sector.toLowerCase().includes(filter.toLowerCase()) ||
  loa.to_sector.toLowerCase().includes(filter.toLowerCase()) ||
  loa[`${to_from}_fir`].toLowerCase().includes(filter.toLowerCase()) ||
  loa.special_conditions.toLowerCase().includes(filter.toLowerCase()) ||
  loa.cop.toLowerCase().includes(filter.toLowerCase())

export const selectFilteredExitLoas = createSelector(
  selectRelevantExitLoas,
  (_state: RootState, filter: string) => filter,
  (loas, filter) => loas.filter(filterFn(filter, "to")),
)

export const selectFilteredEntryLoas = createSelector(
  selectRelevantEntryLoas,
  (_state: RootState, filter: string) => filter,
  (loas, filter) => loas.filter(filterFn(filter, "from")),
)

export const selectLoaCops = createSelector(
  selectRelevantLoas,
  (relevantLoas) => [...new Set(relevantLoas.map((loa) => loa.cop))],
)

export const selectExitLoasByNavaid = createSelector(
  selectRelevantExitLoas,
  (_state: RootState, designator: string) => designator,
  (relevantLoas, designator) =>
    relevantLoas.filter((loa) => loa.cop == designator),
)

export const selectEntryLoasByNavaid = createSelector(
  selectRelevantEntryLoas,
  (_state: RootState, designator: string) => designator,
  (relevantLoas, designator) =>
    relevantLoas.filter((loa) => loa.cop == designator),
)
