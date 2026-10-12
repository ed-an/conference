import type {
  CalendarDate,
  IsoDateTime,
  Slug,
  UUID,
} from './primitives'

interface ScheduleEntryBase {
  id: UUID
  name: string
  description: string
  startsAt: IsoDateTime
  endsAt: IsoDateTime
  location?: string
}

export interface TalkScheduleEntry extends ScheduleEntryBase {
  kind: 'talk'
  talkId: UUID
}

export interface BreakScheduleEntry extends ScheduleEntryBase {
  kind: 'break'
  breakType: 'coffee' | 'meal' | 'networking'
}

export interface SessionScheduleEntry extends ScheduleEntryBase {
  kind: 'session'
  sessionType: 'opening' | 'closing' | 'announcement' | 'social'
}

export type ScheduleEntry =
  | TalkScheduleEntry
  | BreakScheduleEntry
  | SessionScheduleEntry

export interface Schedule {
  id: UUID
  slug: Slug
  name: string
  description: string
  eventId: UUID
  date: CalendarDate
  timeZone: string
  entries: readonly ScheduleEntry[]
}
