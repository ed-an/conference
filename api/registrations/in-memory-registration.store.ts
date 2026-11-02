import { randomUUID } from 'node:crypto'
import type {
  CreateRegistrationRecord,
  RegistrationRecord,
  RegistrationStore,
} from './registration.store.ts'
import { DuplicateRegistrationError, EventUnavailableError } from './registration.errors.ts'
import { toEventId, type EventId, type EventSummary } from '../../shared/registration-domain.ts'

export class InMemoryRegistrationStore implements RegistrationStore {
  readonly records: RegistrationRecord[] = []
  private readonly events: ReadonlyMap<EventId, EventSummary>

  constructor(events: readonly EventSummary[] = [
    { id: toEventId('11111111-1111-4111-8111-111111111111'), name: 'Evento de teste', year: 2026 },
    { id: toEventId('22222222-2222-4222-8222-222222222222'), name: 'Evento de teste', year: 2026 },
  ]) {
    this.events = new Map(events.map((event) => [event.id, event]))
  }

  async create(input: CreateRegistrationRecord): Promise<RegistrationRecord> {
    const event = this.events.get(input.eventId)
    if (!event) throw new EventUnavailableError()
    const duplicate = this.records.some(
      (registration) => registration.event.id === input.eventId && registration.contact.email === input.contact.email,
    )

    if (duplicate) {
      throw new DuplicateRegistrationError()
    }

    const now = new Date()
    const registration = {
      ...input,
      id: randomUUID(),
      personId: randomUUID(),
      event,
      createdAt: now,
    }
    this.records.push(registration)
    return registration
  }

  async listEvents(): Promise<readonly EventSummary[]> {
    return [...this.events.values()]
  }

  async listByEvent(eventId: EventId): Promise<readonly RegistrationRecord[]> {
    return this.records.filter((registration) => registration.event.id === eventId)
  }
}
