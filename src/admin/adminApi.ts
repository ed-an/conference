import { requestJson } from '../api/requestJson'
import type { AttendeeContact, EventId, EventSummary, PrivacyNoticeVersion } from '../../shared/registration-domain'

export interface AdminRegistration {
  event: EventSummary
  contact: AttendeeContact
  consent: { consentedAt: string; privacyNoticeVersion: PrivacyNoticeVersion }
  createdAt: string
}

export async function listAvailableEvents(token: string): Promise<EventSummary[]> {
  return requestJson<EventSummary[]>('/admin/events', {
    headers: { authorization: `Bearer ${token}` },
  }, 'Não foi possível carregar os eventos.')
}

export async function listEventRegistrations(eventId: EventId, token: string): Promise<AdminRegistration[]> {
  return requestJson<AdminRegistration[]>(`/admin/events/${eventId}/registrations`, {
    headers: { authorization: `Bearer ${token}` },
  }, 'Não foi possível carregar as inscrições.')
}
