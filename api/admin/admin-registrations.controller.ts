import { BadRequestException, Controller, Get, Inject, Param, UseGuards } from '@nestjs/common'
import { AdminAuthGuard } from './admin-auth.guard.ts'
import { RegistrationsService } from '../registrations/registrations.service.ts'
import { isEventId } from '../../shared/registration-domain.ts'

export class AdminRegistrationsController {
  private readonly registrations: RegistrationsService

  constructor(registrations: RegistrationsService) {
    this.registrations = registrations
  }

  list(eventId: string) {
    if (!isEventId(eventId)) {
      throw new BadRequestException({ status: 'invalid', message: 'Selecione um evento válido.' })
    }
    return this.registrations.listByEvent(eventId)
  }

  listEvents() {
    return this.registrations.listEvents()
  }
}

const listDescriptor = Object.getOwnPropertyDescriptor(
  AdminRegistrationsController.prototype,
  'list',
)!
Param('eventId')(AdminRegistrationsController.prototype, 'list', 0)
Get('events/:eventId/registrations')(
  AdminRegistrationsController.prototype,
  'list',
  listDescriptor,
)
UseGuards(AdminAuthGuard)(
  AdminRegistrationsController.prototype,
  'list',
  listDescriptor,
)
Inject(RegistrationsService)(AdminRegistrationsController, undefined, 0)
Controller('admin')(AdminRegistrationsController)

const listEventsDescriptor = Object.getOwnPropertyDescriptor(
  AdminRegistrationsController.prototype,
  'listEvents',
)!
Get('events')(
  AdminRegistrationsController.prototype,
  'listEvents',
  listEventsDescriptor,
)
UseGuards(AdminAuthGuard)(
  AdminRegistrationsController.prototype,
  'listEvents',
  listEventsDescriptor,
)
