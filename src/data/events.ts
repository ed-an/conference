import type { Event } from '../models/event.ts'
import { eventId, talkIds } from './ids.ts'
import { instant, slug } from './values.ts'

export const currentEvent = {
  id: eventId,
  slug: slug('react-conference-2026'),
  name: 'React Conference',
  description: 'Um evento para a comunidade frontend que cria experiências incríveis com React.',
  startDate: instant('2026-12-12T11:30:00Z'),
  endDate: instant('2026-12-12T21:30:00Z'),
  timeZone: 'America/Sao_Paulo',
  status: 'scheduled',
  talkIds: Object.values(talkIds),
  city: 'São Paulo, SP, Brasil',
  venueName: 'Expo Center',
} satisfies Event

export const events = [currentEvent] satisfies readonly Event[]
