import assert from 'node:assert/strict'
import type { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { afterAll, beforeAll, describe, test } from 'vitest'
import { createApi } from '../api/create-api.ts'
import { InMemoryRegistrationStore } from '../api/registrations/in-memory-registration.store.ts'
import type { RegistrationStore } from '../api/registrations/registration.store.ts'

let app: INestApplication

beforeAll(async () => {
  app = await createApi(
    new InMemoryRegistrationStore(),
    undefined,
    'http://localhost:5173',
  )
})

test('OPTIONS /registrations allows the configured frontend origin', async () => {
  const response = await request(app.getHttpServer())
    .options('/registrations')
    .set('origin', 'http://localhost:5173')
    .set('access-control-request-method', 'POST')
    .set('access-control-request-headers', 'content-type')
    .expect(204)

  assert.equal(response.headers['access-control-allow-origin'], 'http://localhost:5173')
})

afterAll(async () => {
  await app.close()
})

test('POST /registrations confirms a valid registration', async () => {
  const response = await request(app.getHttpServer())
    .post('/registrations')
    .send({
      name: 'Ana Souza',
      email: 'ana@example.com',
      phone: '+55 11 99999-0000',
      eventId: '11111111-1111-4111-8111-111111111111',
      privacyNoticeVersion: '2026-11-02',
      consent: true,
    })
    .expect(201)

  assert.deepEqual(response.body, {
    status: 'confirmed',
    message: 'Inscrição realizada com sucesso.',
  })
})

test('POST /registrations rejects invalid data and missing consent', async () => {
  const response = await request(app.getHttpServer())
    .post('/registrations')
    .send({ name: '', email: 'não-é-email', phone: '123', consent: false })
    .expect(400)

  assert.equal(response.body.status, 'invalid')
  assert.match(response.body.message, /revise os dados/i)
})

test('POST /registrations maps unexpected failures to a safe pt-BR response', async () => {
  const failingStore: RegistrationStore = {
    create: async () => { throw new Error('database password leaked') },
    listByEvent: async () => { throw new Error('database password leaked') },
  }
  const failingApp = await createApi(failingStore)
  const response = await request(failingApp.getHttpServer()).post('/registrations').send({
    name: 'Ana Souza', email: 'ana@example.com', phone: '+55 11 99999-0000',
    eventId: '11111111-1111-4111-8111-111111111111',
    privacyNoticeVersion: '2026-11-02', consent: true,
  }).expect(500)

  assert.equal(response.body.message, 'Não foi possível concluir sua inscrição. Tente novamente.')
  assert.doesNotMatch(JSON.stringify(response.body), /password|database/i)

  const adminResponse = await request(failingApp.getHttpServer())
    .get('/admin/events/11111111-1111-4111-8111-111111111111/registrations')
    .set('authorization', 'Bearer test-admin-token')
    .expect(500)
  assert.equal(adminResponse.body.message, 'Não foi possível carregar as inscrições. Tente novamente.')
  assert.doesNotMatch(JSON.stringify(adminResponse.body), /password|database/i)
  await failingApp.close()
})

test('POST /registrations detects normalized duplicate e-mails in the same event', async () => {
  const registration = {
    name: 'Bruno Lima',
    email: 'bruno@example.com',
    phone: '+55 11 98888-0000',
    eventId: '22222222-2222-4222-8222-222222222222',
    privacyNoticeVersion: '2026-11-02',
    consent: true,
  }

  await request(app.getHttpServer()).post('/registrations').send(registration).expect(201)
  const response = await request(app.getHttpServer())
    .post('/registrations')
    .send({ ...registration, email: '  BRUNO@EXAMPLE.COM ' })
    .expect(409)

  assert.deepEqual(response.body, {
    status: 'duplicate',
    message: 'Já existe uma inscrição para este e-mail neste evento.',
  })
})

describe('GET /admin/events/:eventId/registrations', () => {
  test('denies requests without administrative authorization', async () => {
    await request(app.getHttpServer())
      .get('/admin/events/11111111-1111-4111-8111-111111111111/registrations')
      .expect(401)
  })

  test('lists only the necessary registration fields for an authorized administrator', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/events/11111111-1111-4111-8111-111111111111/registrations')
      .set('authorization', 'Bearer test-admin-token')
      .expect(200)

    assert.equal(response.body.length, 1)
    assert.deepEqual(Object.keys(response.body[0]).sort(), [
      'consentedAt',
      'createdAt',
      'email',
      'eventId',
      'name',
      'phone',
      'privacyNoticeVersion',
    ])
  })

  test('denies an authenticated user without administrative permission', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/events/11111111-1111-4111-8111-111111111111/registrations')
      .set('authorization', 'Bearer test-viewer-token')
      .expect(403)

    assert.equal(response.body.status, 'forbidden')
  })
})
