import type {
  AttendeeContact,
  EventId,
  RegistrationConsent,
} from '../../shared/registration-domain.ts'

export interface RegistrationRecord {
  id: string
  personId: string
  eventId: EventId
  contact: AttendeeContact
  consent: RegistrationConsent
  createdAt: Date
}

export interface CreateRegistrationRecord {
  eventId: EventId
  contact: AttendeeContact
  consent: RegistrationConsent
}

export interface RegistrationStore {
  create(input: CreateRegistrationRecord): Promise<RegistrationRecord>
  listByEvent(eventId: string): Promise<readonly RegistrationRecord[]>
}

export const REGISTRATION_STORE = Symbol('REGISTRATION_STORE')
