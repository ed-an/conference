import assert from 'node:assert/strict'
import { test } from 'vitest'
import { loadApiConfig } from '../api/config.ts'

const validEnvironment = {
  DATABASE_URL: 'postgresql://conference:conference@localhost:5432/conference',
  ADMIN_TOKEN: 'admin-token-with-16-characters',
  NON_ADMIN_TOKEN: 'viewer-token-with-16-characters',
  ALLOWED_ORIGIN: 'http://localhost:5173',
  PORT: '3001',
}

test('accepts a complete and valid API configuration', () => {
  const config = loadApiConfig(validEnvironment)

  assert.equal(config.port, 3001)
  assert.equal(config.allowedOrigin, 'http://localhost:5173')
})

test.each([
  ['database URL', { DATABASE_URL: 'not-a-database-url' }],
  ['allowed origin', { ALLOWED_ORIGIN: 'ftp://localhost/path' }],
  ['admin token', { ADMIN_TOKEN: 'short' }],
  ['distinct tokens', { NON_ADMIN_TOKEN: validEnvironment.ADMIN_TOKEN }],
  ['port', { PORT: '70000' }],
])('rejects an invalid %s', (_name, override) => {
  assert.throws(
    () => loadApiConfig({ ...validEnvironment, ...override }),
    /Configuração inválida/,
  )
})
