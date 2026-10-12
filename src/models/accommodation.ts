import type { Address, PriceRange, Slug, Url, UUID } from './primitives'

export type AccommodationCategory = 'hotel' | 'hostel' | 'apartment' | 'other'
export type AccommodationStatus = 'available' | 'limited' | 'unavailable'

export interface Accommodation {
  id: UUID
  slug: Slug
  name: string
  description: string
  category: AccommodationCategory
  status: AccommodationStatus
  address: Address
  websiteUrl?: Url
  bookingUrl?: Url
  priceRange?: PriceRange
  distanceFromVenue?: string
  notes?: string
}
