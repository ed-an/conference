export interface ApiConfig {
  databaseUrl: string
  adminToken: string
  nonAdminToken?: string
  allowedOrigin: string
  port: number
}

type Environment = Record<string, string | undefined>

function parseUrl(value: string | undefined, protocols: readonly string[], field: string): URL {
  try {
    if (!value) throw new Error()
    const url = new URL(value)
    if (!protocols.includes(url.protocol)) throw new Error()
    return url
  } catch {
    throw new Error(`Configuração inválida: ${field}.`)
  }
}

function parseToken(value: string | undefined, field: string): string {
  if (!value || value.length < 16) {
    throw new Error(`Configuração inválida: ${field} deve ter pelo menos 16 caracteres.`)
  }
  return value
}

export function loadApiConfig(environment: Environment): ApiConfig {
  const databaseUrl = parseUrl(environment.DATABASE_URL, ['postgresql:', 'postgres:'], 'DATABASE_URL').toString()
  const originUrl = parseUrl(environment.ALLOWED_ORIGIN, ['http:', 'https:'], 'ALLOWED_ORIGIN')
  if (originUrl.origin !== environment.ALLOWED_ORIGIN) {
    throw new Error('Configuração inválida: ALLOWED_ORIGIN deve conter somente a origem.')
  }
  const adminToken = parseToken(environment.ADMIN_TOKEN, 'ADMIN_TOKEN')
  const nonAdminToken = environment.NON_ADMIN_TOKEN
    ? parseToken(environment.NON_ADMIN_TOKEN, 'NON_ADMIN_TOKEN')
    : undefined
  if (nonAdminToken === adminToken) {
    throw new Error('Configuração inválida: os tokens administrativos devem ser diferentes.')
  }
  const port = Number(environment.PORT ?? 3001)
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('Configuração inválida: PORT deve estar entre 1 e 65535.')
  }
  return {
    databaseUrl,
    adminToken,
    nonAdminToken,
    allowedOrigin: originUrl.origin,
    port,
  }
}
