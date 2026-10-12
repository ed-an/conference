import type { Event } from '../models/event.ts'
import { eventId, talkIds } from './ids.ts'
import { instant, slug } from './values.ts'

export const events = [
  {
    id: eventId,
    slug: slug('react-conference-2026'),
    name: 'React Conference 2026',
    description: 'Evento com os maiores especialistas em React falando sobre o presente e o futuro do frontend.',
    startDate: instant('2026-12-12T11:30:00Z'),
    endDate: instant('2026-12-12T21:30:00Z'),
    timeZone: 'America/Sao_Paulo',
    status: 'scheduled',
    talkIds: Object.values(talkIds),
    city: 'São Paulo, SP, Brasil',
    venueName: 'Centro de Convenções Horizonte',
  },
] satisfies readonly Event[]
