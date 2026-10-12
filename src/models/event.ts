import type { IsoDateTime, Slug, UUID } from './primitives'

export type EventStatus = 'announced' | 'scheduled' | 'completed' | 'cancelled'

export interface Event {
  id: UUID
  slug: Slug
  name: string
  description: string
  startDate: IsoDateTime
  endDate: IsoDateTime
  timeZone: string
  status: EventStatus
  talkIds: readonly UUID[]
  city?: string
  venueName?: string
}
