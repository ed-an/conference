import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import { createApi } from './create-api.ts'
import { PrismaRegistrationStore } from './registrations/prisma-registration.store.ts'
import { loadApiConfig } from './config.ts'

const config = loadApiConfig(process.env)

const prisma = new PrismaClient({ datasourceUrl: config.databaseUrl })
const app = await createApi(
  new PrismaRegistrationStore(prisma),
  { admin: config.adminToken, nonAdmin: config.nonAdminToken },
  config.allowedOrigin,
)
await app.listen(config.port)
