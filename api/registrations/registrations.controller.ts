import { Body, Controller, Inject, Post } from '@nestjs/common'
import {
  RegistrationsService,
  type RegistrationInput,
} from './registrations.service.ts'

export class RegistrationsController {
  private readonly registrations: RegistrationsService

  constructor(registrations: RegistrationsService) {
    this.registrations = registrations
  }

  register(input: RegistrationInput) {
    return this.registrations.register(input)
  }
}

const registerDescriptor = Object.getOwnPropertyDescriptor(
  RegistrationsController.prototype,
  'register',
)!
Body()(RegistrationsController.prototype, 'register', 0)
Post()(RegistrationsController.prototype, 'register', registerDescriptor)
Inject(RegistrationsService)(RegistrationsController, undefined, 0)
Controller('registrations')(RegistrationsController)
