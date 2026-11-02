import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common'
import { AdminAuthGuard } from './admin-auth.guard.ts'
import { RegistrationsService } from '../registrations/registrations.service.ts'

export class AdminRegistrationsController {
  constructor(private readonly registrations: RegistrationsService) {}

  list(eventId: string) {
    return this.registrations.listByEvent(eventId)
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
