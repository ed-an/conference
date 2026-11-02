import assert from 'node:assert/strict'
import { PrismaClient } from '@prisma/client'
import type { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { afterAll, beforeAll, test } from 'vitest'
import { createApi } from '../api/create-api.ts'
import { PrismaRegistrationStore } from '../api/registrations/prisma-registration.store.ts'

const databaseUrl = process.env.TEST_DATABASE_URL
const integrationTest = databaseUrl ? test : test.skip
let prisma: PrismaClient
let app: INestApplication

beforeAll(async () => {
  if (!databaseUrl) return
  prisma = new PrismaClient({ datasourceUrl: databaseUrl })
  await prisma.registration.deleteMany()
  await prisma.person.deleteMany()
  app = await createApi(new PrismaRegistrationStore(prisma))
})

afterAll(async () => {
  if (!databaseUrl) return
  await app.close()
  await prisma.$disconnect()
})

integrationTest('PostgreSQL prevents concurrent duplicate registrations atomically', async () => {
  const registration = {
    name: 'Carla Mendes', email: 'carla@example.com', phone: '+55 11 97777-0000',
    eventId: '10000000-0000-4000-8000-000000000001',
    privacyNoticeVersion: '2026-11-02', consent: true,
  }
  const responses = await Promise.all([
    request(app.getHttpServer()).post('/registrations').send(registration),
    request(app.getHttpServer()).post('/registrations').send(registration),
  ])

  assert.deepEqual(responses.map(({ status }) => status).sort(), [201, 409])
})
