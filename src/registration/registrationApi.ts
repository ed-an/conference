import { requestJson } from '../api/requestJson'

export interface RegistrationRequest {
  name: string
  email: string
  phone: string
  eventId: string
  privacyNoticeVersion: string
  consent: true
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
