import type { Slug, UUID } from './primitives'

export type TalkCategory = 'keynote' | 'session' | 'workshop' | 'panel'
export type TalkStatus = 'proposed' | 'confirmed' | 'cancelled'
export type TalkLevel = 'introductory' | 'intermediate' | 'advanced' | 'all-levels'

export interface Talk {
  id: UUID
  slug: Slug
  name: string
  description: string
  speakerIds: readonly UUID[]
  category: TalkCategory
  status: TalkStatus
  durationMinutes?: number
  level?: TalkLevel
}
