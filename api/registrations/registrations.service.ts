import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import {
  DuplicateRegistrationError,
  EventUnavailableError,
} from './registration.errors.ts'
import {
  REGISTRATION_STORE,
  type RegistrationStore,
} from './registration.store.ts'

export interface RegistrationInput {
  name?: unknown
  email?: unknown
  phone?: unknown
  eventId?: unknown
  privacyNoticeVersion?: unknown
  consent?: unknown
}

export class RegistrationsService {
  constructor(private readonly store: RegistrationStore) {}

  async register(input: RegistrationInput) {
    if (
      typeof input.name !== 'string' || input.name.trim().length < 2 ||
      typeof input.email !== 'string' || !/^\S+@\S+\.\S+$/.test(input.email.trim()) ||
      typeof input.phone !== 'string' || input.phone.replace(/\D/g, '').length < 10 ||
      typeof input.eventId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.eventId) ||
      typeof input.privacyNoticeVersion !== 'string' || input.privacyNoticeVersion.length === 0 ||
      input.consent !== true
    ) {
      throw new BadRequestException({
        status: 'invalid',
        message: 'Revise os dados informados e aceite o aviso de privacidade.',
      })
    }

    try {
      await this.store.create({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone.trim(),
        eventId: input.eventId,
        privacyNoticeVersion: input.privacyNoticeVersion,
        consentedAt: new Date(),
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
      name: registration.name,
      email: registration.email,
      phone: registration.phone,
      consentedAt: registration.consentedAt,
      privacyNoticeVersion: registration.privacyNoticeVersion,
      createdAt: registration.createdAt,
    }))
  }
}

Inject(REGISTRATION_STORE)(RegistrationsService, undefined, 0)
Injectable()(RegistrationsService)
