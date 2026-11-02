import { randomUUID } from 'node:crypto'
import type {
  CreateRegistrationRecord,
  RegistrationRecord,
  RegistrationStore,
} from './registration.store.ts'
import { DuplicateRegistrationError } from './registration.errors.ts'

export class InMemoryRegistrationStore implements RegistrationStore {
  readonly records: RegistrationRecord[] = []

  async create(input: CreateRegistrationRecord): Promise<RegistrationRecord> {
    const duplicate = this.records.some(
      (registration) => registration.eventId === input.eventId && registration.email === input.email,
    )

    if (duplicate) {
      throw new DuplicateRegistrationError()
    }

    const now = new Date()
    const registration = {
      ...input,
      id: randomUUID(),
      personId: randomUUID(),
      createdAt: now,
    }
    this.records.push(registration)
    return registration
  }

  async listByEvent(eventId: string): Promise<readonly RegistrationRecord[]> {
    return this.records.filter((registration) => registration.eventId === eventId)
  }
}
