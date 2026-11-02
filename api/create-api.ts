import 'reflect-metadata'
import { Module, type INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AdminRegistrationsController } from './admin/admin-registrations.controller.ts'
import { ADMIN_AUTH_TOKENS, AdminAuthGuard, type AdminAuthTokens } from './admin/admin-auth.guard.ts'
import { RegistrationsController } from './registrations/registrations.controller.ts'
import { RegistrationsService } from './registrations/registrations.service.ts'
import {
  REGISTRATION_STORE,
  type RegistrationStore,
} from './registrations/registration.store.ts'

export async function createApi(
  store: RegistrationStore,
  authTokens: AdminAuthTokens = { admin: 'test-admin-token', nonAdmin: 'test-viewer-token' },
  allowedOrigin?: string,
): Promise<INestApplication> {
  class ApiModule {}

  Module({
    controllers: [RegistrationsController, AdminRegistrationsController],
    providers: [
      RegistrationsService,
      { provide: REGISTRATION_STORE, useValue: store },
      { provide: ADMIN_AUTH_TOKENS, useValue: authTokens },
      {
        provide: AdminAuthGuard,
        useFactory: (tokens: AdminAuthTokens) => new AdminAuthGuard(tokens),
        inject: [ADMIN_AUTH_TOKENS],
      },
    ],
  })(ApiModule)

  const app = await NestFactory.create(ApiModule, { logger: false })
  if (allowedOrigin) {
    app.enableCors({ origin: allowedOrigin, methods: ['GET', 'POST'] })
  }
  await app.init()
  return app
}
