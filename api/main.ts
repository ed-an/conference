import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import { createApi } from './create-api.ts'
import { PrismaRegistrationStore } from './registrations/prisma-registration.store.ts'

const databaseUrl = process.env.DATABASE_URL
const adminToken = process.env.ADMIN_TOKEN
const nonAdminToken = process.env.NON_ADMIN_TOKEN
const allowedOrigin = process.env.ALLOWED_ORIGIN

if (!databaseUrl || !adminToken || !allowedOrigin) {
  throw new Error('DATABASE_URL, ADMIN_TOKEN e ALLOWED_ORIGIN são obrigatórios.')
}

const prisma = new PrismaClient({ datasourceUrl: databaseUrl })
const app = await createApi(new PrismaRegistrationStore(prisma), { admin: adminToken, nonAdmin: nonAdminToken })
app.enableCors({ origin: allowedOrigin, methods: ['GET', 'POST'] })
await app.listen(Number(process.env.PORT ?? 3001))
