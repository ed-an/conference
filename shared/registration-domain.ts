declare const eventIdBrand: unique symbol
declare const normalizedEmailBrand: unique symbol
declare const privacyNoticeVersionBrand: unique symbol

export type EventId = string & { readonly [eventIdBrand]: true }
export type NormalizedEmail = string & { readonly [normalizedEmailBrand]: true }
export type PrivacyNoticeVersion = string & { readonly [privacyNoticeVersionBrand]: true }

const currentPrivacyNoticeVersion = '2026-11-02' as PrivacyNoticeVersion

export const currentPrivacyNotice = {
  version: currentPrivacyNoticeVersion,
  title: 'Aviso de privacidade',
  text: 'Nome, e-mail e telefone serão usados somente para administrar sua participação neste evento. O acesso é restrito à organização, e os dados não serão usados para pagamentos ou marketing. Você poderá solicitar informações, correção ou exclusão à organização. O prazo de retenção será publicado antes da abertura das inscrições em produção.',
} as const

export interface AttendeeContact {
  name: string
  email: NormalizedEmail
  phone: string
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

export function normalizeEmail(value: string): NormalizedEmail {
  return value.trim().toLowerCase() as NormalizedEmail
}

export function isCurrentPrivacyNoticeVersion(value: unknown): value is PrivacyNoticeVersion {
  return value === currentPrivacyNotice.version
}

export function toPrivacyNoticeVersion(value: string): PrivacyNoticeVersion {
  return value as PrivacyNoticeVersion
}
