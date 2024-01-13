export type Event = {
  name: string
  date_start: string
  date_end: string
  fir: string
}

export type FilterEvent = {
  event_id: number
  event_vatcan: string | null
}

export type Filter = {
  type:
    | "ADEP"
    | "ADES"
    | "level_above"
    | "level_below"
    | "level"
    | "member_event"
    | "member_non_event"
    | "waypoint"
  value: (string | number)[] | number | FilterEvent
}

export type Measure = {
  type:
    | "prohibit"
    | "minimum_departure_interval"
    | "average_departure_interval"
    | "per_hour"
    | "miles_in_trail"
    | "max_ias"
    | "max_mach"
    | "ias_reduction"
    | "mach_reduction"
    | "ground_stop"
    | "mandatory_route"
  value: number | string[] | null
}

export type FlowMeasure = {
  ident: string
  event_id: number | null
  reason: string
  starttime: string
  endtime: string
  measure: Measure
  filters: Filter[]
  notified_firs: string[]
  withdrawn_at: string | null
}
