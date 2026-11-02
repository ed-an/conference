export interface RegistrationRecord {
  id: string
  personId: string
  eventId: string
  name: string
  email: string
  phone: string
  consentedAt: Date
  privacyNoticeVersion: string
  createdAt: Date
}

export interface CreateRegistrationRecord {
  eventId: string
  name: string
  email: string
  phone: string
  privacyNoticeVersion: string
  consentedAt: Date
}

export interface RegistrationStore {
  create(input: CreateRegistrationRecord): Promise<RegistrationRecord>
  listByEvent(eventId: string): Promise<readonly RegistrationRecord[]>
}

export const REGISTRATION_STORE = Symbol('REGISTRATION_STORE')
