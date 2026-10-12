import type { Address, PriceRange, Slug, Url, UUID } from './primitives'

export type FoodCategory = 'on-site' | 'restaurant' | 'cafe' | 'market' | 'other'
export type FoodStatus = 'open' | 'temporarily-closed' | 'closed'
export type DietaryOption =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'lactose-free'
  | 'halal'
  | 'kosher'

export interface Food {
  id: UUID
  slug: Slug
  name: string
  description: string
  category: FoodCategory
  status: FoodStatus
  address?: Address
  websiteUrl?: Url
  priceRange?: PriceRange
  dietaryOptions?: readonly DietaryOption[]
  notes?: string
}
