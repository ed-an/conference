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

export class PrismaRegistrationStore implements RegistrationStore {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateRegistrationRecord): Promise<RegistrationRecord> {
    try {
      return await this.prisma.$transaction(async (transaction) => {
        const event = await transaction.event.findUnique({ where: { id: input.eventId } })
        if (!event || !event.registrationOpen) {
          throw new EventUnavailableError()
        }

        const person = await transaction.person.upsert({
          where: { email: input.email },
          update: { name: input.name, phone: input.phone },
          create: { name: input.name, email: input.email, phone: input.phone },
        })
        const registration = await transaction.registration.create({
          data: {
            personId: person.id,
            eventId: input.eventId,
            consentedAt: input.consentedAt,
            privacyNoticeVersion: input.privacyNoticeVersion,
          },
        })
        return {
          ...registration,
          name: person.name,
          email: person.email,
          phone: person.phone,
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new DuplicateRegistrationError()
      }
      throw error
    }
  }

  async listByEvent(eventId: string): Promise<readonly RegistrationRecord[]> {
    const registrations = await this.prisma.registration.findMany({
      where: { eventId },
      include: { person: true },
      orderBy: { createdAt: 'desc' },
    })
    return registrations.map(({ person, ...registration }) => ({
      ...registration,
      name: person.name,
      email: person.email,
      phone: person.phone,
    }))
  }
}
