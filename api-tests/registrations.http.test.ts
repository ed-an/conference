import assert from 'node:assert/strict'
import type { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { afterAll, beforeAll, describe, test } from 'vitest'
import { vi } from 'vitest'
import { createApi } from '../api/create-api.ts'
import { InMemoryRegistrationStore } from '../api/registrations/in-memory-registration.store.ts'
import type { RegistrationStore } from '../api/registrations/registration.store.ts'

let app: INestApplication
const validRegistration = {
  contact: {
    name: 'Ana Souza',
    email: 'ana@example.com',
    phone: '+55 11 99999-0000',
  },
  eventId: '11111111-1111-4111-8111-111111111111',
  consent: { accepted: true, privacyNoticeVersion: '2026-11-02' },
}

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
    .send(validRegistration)
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
  assert.equal(response.body.message, 'Informe seu nome com pelo menos 2 caracteres.')
})

test('POST /registrations rejects a privacy notice version that is not current', async () => {
  const response = await request(app.getHttpServer())
    .post('/registrations')
    .send({
      ...validRegistration,
      consent: { accepted: true, privacyNoticeVersion: '2025-01-01' },
    })
    .expect(400)

  assert.equal(response.body.status, 'invalid')
  assert.equal(response.body.message, 'O aviso de privacidade foi atualizado. Revise e aceite a versão atual.')
})

test.each([
  ['e-mail', { ...validRegistration, contact: { ...validRegistration.contact, email: 'inválido' } }, 'Informe um e-mail válido.'],
  ['telefone', { ...validRegistration, contact: { ...validRegistration.contact, phone: '123' } }, 'Informe um telefone com DDD para continuar.'],
  ['evento', { ...validRegistration, eventId: 'inválido' }, 'Selecione um evento válido.'],
  ['consentimento', { ...validRegistration, consent: { ...validRegistration.consent, accepted: false } }, 'Leia e aceite o aviso de privacidade para continuar.'],
])('POST /registrations explains how to correct an invalid %s', async (_field, payload, message) => {
  const response = await request(app.getHttpServer()).post('/registrations').send(payload).expect(400)
  assert.equal(response.body.message, message)
})

test('POST /registrations maps unexpected failures to a safe pt-BR response', async () => {
  const failingStore: RegistrationStore = {
    create: async () => { throw new Error('database password leaked') },
    listEvents: async () => { throw new Error('database password leaked') },
    listByEvent: async () => { throw new Error('database password leaked') },
  }
  const failingApp = await createApi(failingStore)
  const response = await request(failingApp.getHttpServer())
    .post('/registrations')
    .send(validRegistration)
    .expect(500)

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
    contact: {
      name: 'Bruno Lima',
      email: 'bruno@example.com',
      phone: '+55 11 98888-0000',
    },
    eventId: '22222222-2222-4222-8222-222222222222',
    consent: { accepted: true, privacyNoticeVersion: '2026-11-02' },
  }

  await request(app.getHttpServer()).post('/registrations').send(registration).expect(201)
  const response = await request(app.getHttpServer())
    .post('/registrations')
    .send({
      ...registration,
      contact: { ...registration.contact, email: '  BRUNO@EXAMPLE.COM ' },
    })
    .expect(409)

  assert.deepEqual(response.body, {
    status: 'duplicate',
    message: 'Já existe uma inscrição para este e-mail neste evento.',
  })
})

test('POST /registrations allows the same person in different events', async () => {
  const registration = {
    contact: { name: 'Daniela Luz', email: 'daniela@example.com', phone: '+55 11 96666-0000' },
    consent: { accepted: true, privacyNoticeVersion: '2026-11-02' },
  }
  await request(app.getHttpServer()).post('/registrations')
    .send({ ...registration, eventId: '11111111-1111-4111-8111-111111111111' }).expect(201)
  await request(app.getHttpServer()).post('/registrations')
    .send({ ...registration, eventId: '22222222-2222-4222-8222-222222222222' }).expect(201)
})

test('POST /registrations explains when an event is unavailable', async () => {
  const response = await request(app.getHttpServer()).post('/registrations')
    .send({ ...validRegistration, eventId: '33333333-3333-4333-8333-333333333333' })
    .expect(400)

  assert.equal(response.body.status, 'event-unavailable')
})

test('registration requests do not write personal data or secrets to console logs', async () => {
  const log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
  const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
  const registrationResponse = await request(app.getHttpServer()).post('/registrations').send({
    ...validRegistration,
    contact: { name: 'Pessoa Sigilosa', email: 'segredo@example.com', phone: '551188887777' },
  }).expect(201)
  await request(app.getHttpServer()).post('/registrations').send({
    ...validRegistration,
    contact: { name: 'Pessoa Sigilosa', email: 'email-invalido', phone: '551188887777' },
  }).expect(400)
  const adminResponse = await request(app.getHttpServer())
    .get('/admin/events')
    .set('authorization', 'Bearer test-admin-token')
    .expect(200)
  const output = [...log.mock.calls, ...warn.mock.calls, ...error.mock.calls].flat().join(' ')
  log.mockRestore(); warn.mockRestore(); error.mockRestore()

  assert.doesNotMatch(output, /Pessoa Sigilosa|segredo@example\.com|551188887777|test-admin-token/)
  assert.doesNotMatch(JSON.stringify(registrationResponse.body), /Pessoa Sigilosa|segredo@example\.com|551188887777|test-admin-token/)
  assert.doesNotMatch(JSON.stringify(adminResponse.body), /test-admin-token/)
})

describe('GET /admin/events/:eventId/registrations', () => {
  test('lists available events for an authorized administrator', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/events')
      .set('authorization', 'Bearer test-admin-token')
      .expect(200)

    assert.deepEqual(response.body, [
      {
        id: '11111111-1111-4111-8111-111111111111',
        name: 'Evento de teste',
        year: 2026,
      },
      {
        id: '22222222-2222-4222-8222-222222222222',
        name: 'Evento de teste',
        year: 2026,
      },
    ])
  })

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

    const ana = response.body.find((registration: { contact: { email: string } }) => registration.contact.email === 'ana@example.com')
    assert.ok(ana)
    assert.deepEqual(ana.event, {
      id: '11111111-1111-4111-8111-111111111111',
      name: 'Evento de teste',
      year: 2026,
    })
    assert.deepEqual(Object.keys(ana).sort(), [
      'consent',
      'contact',
      'createdAt',
      'event',
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
