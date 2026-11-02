import assert from 'node:assert/strict'
import { PrismaClient } from '@prisma/client'
import type { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { afterAll, beforeAll, test } from 'vitest'
import { createApi } from '../api/create-api.ts'
import { PrismaRegistrationStore } from '../api/registrations/prisma-registration.store.ts'

const databaseUrl = process.env.TEST_DATABASE_URL
if (!databaseUrl) {
  throw new Error('TEST_DATABASE_URL é obrigatória para os testes PostgreSQL.')
}
let prisma: PrismaClient
let app: INestApplication

beforeAll(async () => {
  prisma = new PrismaClient({ datasourceUrl: databaseUrl })
  await prisma.registration.deleteMany()
  await prisma.person.deleteMany()
  app = await createApi(new PrismaRegistrationStore(prisma))
})

afterAll(async () => {
  await app.close()
  await prisma.$disconnect()
})

test('PostgreSQL prevents concurrent duplicate registrations atomically', async () => {
  const registration = {
    contact: {
      name: 'Carla Mendes', email: 'carla@example.com', phone: '+55 11 97777-0000',
    },
    eventId: '10000000-0000-4000-8000-000000000001',
    consent: { accepted: true, privacyNoticeVersion: '2026-11-02' },
  }
  const responses = await Promise.all([
    request(app.getHttpServer()).post('/registrations').send(registration),
    request(app.getHttpServer()).post('/registrations').send(registration),
  ])

  assert.deepEqual(responses.map(({ status }) => status).sort(), [201, 409])

  const events = await request(app.getHttpServer()).get('/admin/events')
    .set('authorization', 'Bearer test-admin-token').expect(200)
  assert.deepEqual(events.body, [{
    id: '10000000-0000-4000-8000-000000000001',
    name: 'React Conference',
    year: 2026,
  }])

  const registrations = await request(app.getHttpServer())
    .get('/admin/events/10000000-0000-4000-8000-000000000001/registrations')
    .set('authorization', 'Bearer test-admin-token').expect(200)
  assert.equal(registrations.body[0].event.name, 'React Conference')
})

test('an unavailable event leaves no partial person or registration', async () => {
  const email = 'rollback@example.com'
  await request(app.getHttpServer()).post('/registrations').send({
    contact: { name: 'Rollback Teste', email, phone: '+55 11 95555-0000' },
    eventId: '33333333-3333-4333-8333-333333333333',
    consent: { accepted: true, privacyNoticeVersion: '2026-11-02' },
  }).expect(400)

  assert.equal(await prisma.person.count({ where: { email } }), 0)
  assert.equal(await prisma.registration.count(), 1)
})
