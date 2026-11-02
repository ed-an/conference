declare const eventIdBrand: unique symbol
declare const normalizedEmailBrand: unique symbol
declare const privacyNoticeVersionBrand: unique symbol

export type EventId = string & { readonly [eventIdBrand]: true }
export type NormalizedEmail = string & { readonly [normalizedEmailBrand]: true }
export type PrivacyNoticeVersion = string & { readonly [privacyNoticeVersionBrand]: true }

export interface AttendeeContact {
  name: string
  email: NormalizedEmail
  phone: string
}

export interface EventSummary {
  id: EventId
  name: string
  year: number
}

export interface RegistrationConsent {
  privacyNoticeVersion: PrivacyNoticeVersion
  consentedAt: Date
}

export interface RegistrationConsentAcceptance {
  accepted: true
  privacyNoticeVersion: PrivacyNoticeVersion
}

export function isEventId(value: unknown): value is EventId {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

export function toEventId(value: string): EventId {
  if (!isEventId(value)) throw new Error('Event ID inválido.')
  return value
}

export function normalizeEmail(value: string): NormalizedEmail {
  return value.trim().toLowerCase() as NormalizedEmail
}

export function isValidAttendeeName(value: string): boolean {
  return value.trim().length >= 2
}

export function isValidEmail(value: string): boolean {
  return /^\S+@\S+\.\S+$/.test(value.trim())
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, '').length >= 10
}

export function toPrivacyNoticeVersion(value: string): PrivacyNoticeVersion {
  return value as PrivacyNoticeVersion
}
