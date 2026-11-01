import assert from 'node:assert/strict'
import test, { after } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const vite = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } })
after(() => vite.close())

const { HomePage } = await vite.ssrLoadModule('/src/home/HomePage.tsx') as {
  HomePage: typeof import('../src/home/HomePage.tsx').HomePage
}

function renderHome() {
  return renderToStaticMarkup(createElement(HomePage))
}

function inputWithId(page: string, id: string) {
  const input = page.match(new RegExp(`<input[^>]*id="${id}"[^>]*>`))?.[0]
  assert.ok(input, `expected an input with id ${id}`)
  return input
}

test('presents the essential React Conference information and registration action', () => {
  const page = renderHome()

  assert.match(page, /<h1[^>]*>React Conference 2026<\/h1>/)
  assert.match(page, /frontend.*React/i)
  assert.match(page, /12 de dezembro de 2026/)
  assert.match(page, /S[aã]o Paulo/)
  assert.match(page, /Expo Center/)
  assert.match(page, /<a[^>]*href="#inscricao"[^>]*>Inscrever<\/a>/)
})

test('offers an accessible registration form without claiming an unsupported submission', () => {
  const page = renderHome()

  assert.match(page, /<section[^>]*id="inscricao"[^>]*>/)
  assert.match(page, /<label[^>]*for="registration-name"[^>]*>Nome<\/label>/)
  assert.match(page, /<label[^>]*for="registration-email"[^>]*>E-mail<\/label>/)
  assert.match(page, /<label[^>]*for="registration-phone"[^>]*>Telefone<\/label>/)

  const nameInput = inputWithId(page, 'registration-name')
  assert.match(nameInput, /name="name"/)
  assert.match(nameInput, /required/)
  assert.match(nameInput, /autoComplete="name"/)

  const emailInput = inputWithId(page, 'registration-email')
  assert.match(emailInput, /type="email"/)
  assert.match(emailInput, /name="email"/)
  assert.match(emailInput, /required/)
  assert.match(emailInput, /autoComplete="email"/)

  const phoneInput = inputWithId(page, 'registration-phone')
  assert.match(phoneInput, /type="tel"/)
  assert.match(phoneInput, /name="phone"/)
  assert.match(phoneInput, /required/)
  assert.match(phoneInput, /autoComplete="tel"/)

  assert.match(page, /<button[^>]*type="submit"[^>]*>Enviar inscrição<\/button>/)
  assert.match(page, /envio.*ainda não está disponível/i)
  assert.doesNotMatch(page, /inscrição (?:concluída|confirmada|realizada)/i)
})

