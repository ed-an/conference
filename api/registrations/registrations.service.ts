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
  type EventId,
  isEventId,
  isValidAttendeeName,
  isValidEmail,
  isValidPhone,
  normalizeEmail,
} from '../../shared/registration-domain.ts'
import { isCurrentPrivacyNoticeVersion } from '../../content/privacy-notice.ts'

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
    const contact = input.contact
    const consent = input.consent

    if (typeof contact?.name !== 'string' || !isValidAttendeeName(contact.name)) {
      throw invalidRegistration('Informe seu nome com pelo menos 2 caracteres.')
    }
    if (typeof contact.email !== 'string' || !isValidEmail(contact.email)) {
      throw invalidRegistration('Informe um e-mail válido.')
    }
    if (typeof contact.phone !== 'string' || !isValidPhone(contact.phone)) {
      throw invalidRegistration('Informe um telefone com DDD para continuar.')
    }
    if (!isEventId(input.eventId)) {
      throw invalidRegistration('Selecione um evento válido.')
    }
    if (consent?.accepted !== true) {
      throw invalidRegistration('Leia e aceite o aviso de privacidade para continuar.')
    }
    if (!isCurrentPrivacyNoticeVersion(consent.privacyNoticeVersion)) {
      throw invalidRegistration('O aviso de privacidade foi atualizado. Revise e aceite a versão atual.')
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

  async listByEvent(eventId: EventId) {
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
      event: registration.event,
      contact: registration.contact,
      consent: registration.consent,
      createdAt: registration.createdAt,
    }))
  }

  async listEvents() {
    try {
      return await this.store.listEvents()
    } catch {
      throw new InternalServerErrorException({
        status: 'unavailable',
        message: 'Não foi possível carregar os eventos. Tente novamente.',
      })
    }
  }
}

Inject(REGISTRATION_STORE)(RegistrationsService, undefined, 0)
Injectable()(RegistrationsService)

function invalidRegistration(message: string): BadRequestException {
  return new BadRequestException({ status: 'invalid', message })
}
