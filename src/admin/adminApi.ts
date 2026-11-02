import { currentEvent } from '../data/events'
import { requestJson } from '../api/requestJson'
import type { EventId, NormalizedEmail, PrivacyNoticeVersion } from '../../shared/registration-domain'

export interface AdminRegistration {
  eventId: EventId
  contact: { name: string; email: NormalizedEmail; phone: string }
  consent: { consentedAt: string; privacyNoticeVersion: PrivacyNoticeVersion }
  createdAt: string
}

export async function listEventRegistrations(token: string): Promise<AdminRegistration[]> {
  return requestJson<AdminRegistration[]>(`/admin/events/${currentEvent.id}/registrations`, {
    headers: { authorization: `Bearer ${token}` },
  }, 'Não foi possível carregar as inscrições.')
}
