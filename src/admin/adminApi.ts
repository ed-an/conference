import { currentEvent } from '../data/events'
import { requestJson } from '../api/requestJson'

export interface AdminRegistration {
  name: string; email: string; phone: string; eventId: string
  consentedAt: string; privacyNoticeVersion: string; createdAt: string
}

export async function listEventRegistrations(token: string): Promise<AdminRegistration[]> {
  return requestJson<AdminRegistration[]>(`/admin/events/${currentEvent.id}/registrations`, {
    headers: { authorization: `Bearer ${token}` },
  }, 'Não foi possível carregar as inscrições.')
}
