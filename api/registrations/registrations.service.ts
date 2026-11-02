import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import {
  DuplicateRegistrationError,
  EventUnavailableError,
} from './registration.errors.ts'
import {
  REGISTRATION_STORE,
  type RegistrationStore,
} from './registration.store.ts'
import {
  isCurrentPrivacyNoticeVersion,
  isEventId,
  normalizeEmail,
} from '../../shared/registration-domain.ts'

export interface RegistrationInput {
  contact?: {
    name?: unknown
    email?: unknown
    phone?: unknown
  }
  eventId?: unknown
  consent?: {
    accepted?: unknown
    privacyNoticeVersion?: unknown
  }
}

export class RegistrationsService {
  private readonly store: RegistrationStore

  constructor(store: RegistrationStore) {
    this.store = store
  }

  async register(input: RegistrationInput) {
    if (
      typeof input.contact?.name !== 'string' || input.contact.name.trim().length < 2 ||
      typeof input.contact.email !== 'string' || !/^\S+@\S+\.\S+$/.test(input.contact.email.trim()) ||
      typeof input.contact.phone !== 'string' || input.contact.phone.replace(/\D/g, '').length < 10 ||
      !isEventId(input.eventId) ||
      !isCurrentPrivacyNoticeVersion(input.consent?.privacyNoticeVersion) ||
      input.consent.accepted !== true
    ) {
      throw new BadRequestException({
        status: 'invalid',
        message: 'Revise os dados informados e aceite o aviso de privacidade.',
      })
    }

    try {
      await this.store.create({
        eventId: input.eventId,
        contact: {
          name: input.contact.name.trim(),
          email: normalizeEmail(input.contact.email),
          phone: input.contact.phone.trim(),
        },
        consent: {
          privacyNoticeVersion: input.consent.privacyNoticeVersion,
          consentedAt: new Date(),
        },
      })
    } catch (error) {
      if (error instanceof DuplicateRegistrationError) {
        throw new ConflictException({
          status: 'duplicate',
          message: 'Já existe uma inscrição para este e-mail neste evento.',
        })
      }
      if (error instanceof EventUnavailableError) {
        throw new BadRequestException({
          status: 'event-unavailable',
          message: 'Este evento não está disponível para inscrição.',
        })
      }
      throw new InternalServerErrorException({
        status: 'unavailable',
        message: 'Não foi possível concluir sua inscrição. Tente novamente.',
      })
    }

    return {
      status: 'confirmed',
      message: 'Inscrição realizada com sucesso.',
    }
  }

  async listByEvent(eventId: string) {
    let registrations
    try {
      registrations = await this.store.listByEvent(eventId)
    } catch {
      throw new InternalServerErrorException({
        status: 'unavailable',
        message: 'Não foi possível carregar as inscrições. Tente novamente.',
      })
    }
    return registrations.map((registration) => ({
      eventId: registration.eventId,
      contact: registration.contact,
      consent: registration.consent,
      createdAt: registration.createdAt,
    }))
  }
}

Inject(REGISTRATION_STORE)(RegistrationsService, undefined, 0)
Injectable()(RegistrationsService)
