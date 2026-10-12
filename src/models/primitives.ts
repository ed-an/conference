declare const brand: unique symbol

export type Brand<Value, Name extends string> = Value & {
  readonly [brand]: Name
}

export type UUID = Brand<string, 'UUID'>
export type Slug = Brand<string, 'Slug'>
export type IsoDateTime = Brand<string, 'IsoDateTime'>
export type CalendarDate = Brand<string, 'CalendarDate'>
export type Url = Brand<string, 'Url'>

export interface Address {
  street: string
  city: string
  region: string
  postalCode?: string
  country: string
}

export type SocialPlatform =
  | 'website'
  | 'github'
  | 'linkedin'
  | 'bluesky'
  | 'mastodon'

export interface SocialLink {
  platform: SocialPlatform
  url: Url
  label?: string
}

export interface PriceRange {
  currency: 'BRL'
  minimum: number
  maximum: number
  unit: 'night' | 'meal' | 'item'
}
