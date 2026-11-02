import { requestJson } from '../api/requestJson'
import type {
  AttendeeContact,
  EventId,
  RegistrationConsentAcceptance,
} from '../../shared/registration-domain'

export interface RegistrationRequest {
  contact: AttendeeContact
  eventId: EventId
  consent: RegistrationConsentAcceptance
}
export interface RegistrationConfirmation {
  status: 'confirmed'
  message: string
}

export async function registerAttendee(input: RegistrationRequest): Promise<RegistrationConfirmation> {
  return requestJson<RegistrationConfirmation>('/registrations', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  }, 'Não foi possível enviar sua inscrição. Tente novamente.')
}
