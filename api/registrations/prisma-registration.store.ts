import { Prisma, PrismaClient } from '@prisma/client'
import {
  DuplicateRegistrationError,
  EventUnavailableError,
} from './registration.errors.ts'
import type {
  CreateRegistrationRecord,
  RegistrationRecord,
  RegistrationStore,
} from './registration.store.ts'
import {
  type EventId,
  isEventId,
  normalizeEmail,
  toPrivacyNoticeVersion,
} from '../../shared/registration-domain.ts'

export class PrismaRegistrationStore implements RegistrationStore {
  private readonly prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(input: CreateRegistrationRecord): Promise<RegistrationRecord> {
    try {
      return await this.prisma.$transaction(async (transaction) => {
        const event = await transaction.event.findUnique({ where: { id: input.eventId } })
        if (!event || !event.registrationOpen) {
          throw new EventUnavailableError()
        }

        const person = await transaction.person.upsert({
          where: { email: input.contact.email },
          update: { name: input.contact.name, phone: input.contact.phone },
          create: input.contact,
        })
        const registration = await transaction.registration.create({
          data: {
            personId: person.id,
            eventId: input.eventId,
            consentedAt: input.consent.consentedAt,
            privacyNoticeVersion: input.consent.privacyNoticeVersion,
          },
        })
        return {
          id: registration.id,
          personId: registration.personId,
          event: { id: input.eventId, name: event.name, year: event.year },
          contact: {
            name: person.name,
            email: normalizeEmail(person.email),
            phone: person.phone,
          },
          consent: {
            consentedAt: registration.consentedAt,
            privacyNoticeVersion: input.consent.privacyNoticeVersion,
          },
          createdAt: registration.createdAt,
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new DuplicateRegistrationError()
      }
      throw error
    }
  }

  async listEvents() {
    const events = await this.prisma.event.findMany({ orderBy: [{ year: 'desc' }, { name: 'asc' }] })
    return events.flatMap((event) => isEventId(event.id)
      ? [{ id: event.id, name: event.name, year: event.year }]
      : [])
  }

  async listByEvent(eventId: EventId): Promise<readonly RegistrationRecord[]> {
    const registrations = await this.prisma.registration.findMany({
      where: { eventId },
      include: { person: true, event: true },
      orderBy: { createdAt: 'desc' },
    })
    return registrations.map(({ person, ...registration }) => {
      if (!isEventId(registration.eventId)) {
        throw new Error('Invalid event ID stored in registration')
      }
      return {
        id: registration.id,
        personId: registration.personId,
        event: {
          id: registration.eventId,
          name: registration.event.name,
          year: registration.event.year,
        },
        contact: {
          name: person.name,
          email: normalizeEmail(person.email),
          phone: person.phone,
        },
        consent: {
          consentedAt: registration.consentedAt,
            privacyNoticeVersion: toPrivacyNoticeVersion(registration.privacyNoticeVersion),
        },
        createdAt: registration.createdAt,
      }
    })
  }
}
