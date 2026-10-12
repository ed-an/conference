import type { Slug, SocialLink, Url, UUID } from './primitives'

export interface Speaker {
  id: UUID
  slug: Slug
  name: string
  description: string
  bio: string
  jobTitle?: string
  company?: string
  avatarUrl?: Url
  socialLinks?: readonly SocialLink[]
}
