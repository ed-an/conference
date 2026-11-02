import type {
  AttendeeContact,
  EventId,
  EventSummary,
  RegistrationConsent,
} from '../../shared/registration-domain.ts'

export interface RegistrationRecord {
  id: string
  personId: string
  event: EventSummary
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
  listEvents(): Promise<readonly EventSummary[]>
  listByEvent(eventId: EventId): Promise<readonly RegistrationRecord[]>
}

export const REGISTRATION_STORE = Symbol('REGISTRATION_STORE')
