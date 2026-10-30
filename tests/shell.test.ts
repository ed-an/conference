import assert from 'node:assert/strict'
import test, { after } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

import { menuOpenReducer } from '../src/layout/menuState.ts'
import { primaryNavigationRoutes, utilityNavigationRoutes } from '../src/routing/routes.ts'

const vite = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } })
after(() => vite.close())

const { AppShell } = await vite.ssrLoadModule('/src/layout/AppShell.tsx') as {
  AppShell: typeof import('../src/layout/AppShell.tsx').AppShell
}

function renderShell(path = '/') {
  return renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: [path] },
      createElement(AppShell, null, createElement('h1', null, 'Conteúdo da página')),
    ),
  )
}

test('defines the agreed primary route navigation in pt-BR', () => {
  assert.deepEqual(primaryNavigationRoutes.map(({ path, label }) => ({ path, label })), [
    { path: '/', label: 'Início' },
    { path: '/speakers', label: 'Palestrantes' },
    { path: '/schedule', label: 'Programação' },
  ])
  assert.deepEqual(utilityNavigationRoutes.map(({ path }) => path), [
    '/location',
    '/hotels',
    '/food',
    '/code-of-conduct',
    '/speakers',
    '/schedule',
  ])
})

test('provides semantic landmarks and a working skip-link target', () => {
  const shell = renderShell()

  assert.match(shell, /href="#conteudo-principal"/)
  assert.match(shell, /<header class="site-header">/)
  assert.match(shell, /<main id="conteudo-principal" tabindex="-1">/)
  assert.match(shell, /<footer class="site-footer">/)
  assert.match(shell, /aria-label="Navegação principal"/)
  assert.match(shell, /<h1>Conteúdo da página<\/h1>/)
})

test('exposes accessible state for mobile and active navigation', () => {
  const homeShell = renderShell()
  const speakersShell = renderShell('/speakers')

  assert.match(homeShell, /aria-expanded="false"/)
  assert.match(homeShell, /aria-controls="primary-navigation"/)
  assert.match(homeShell, /<a[^>]*aria-current="page"[^>]*href="\/"/)
  assert.match(speakersShell, /<a[^>]*aria-current="page"[^>]*href="\/speakers"/)
  assert.doesNotMatch(speakersShell, /<a[^>]*aria-current="page"[^>]*href="\/"/)
})

test('closes the mobile menu after navigation or Escape', () => {
  assert.equal(menuOpenReducer(false, 'toggle'), true)
  assert.equal(menuOpenReducer(true, 'navigate'), false)
  assert.equal(menuOpenReducer(true, 'escape'), false)
})

test('renders router destinations instead of the previous section fragments', () => {
  const shell = renderShell('/schedule')

  for (const route of [...primaryNavigationRoutes, ...utilityNavigationRoutes]) {
    assert.match(shell, new RegExp(`href="${route.path}"`))
  }
  assert.doesNotMatch(shell, /href="#(?:inicio|palestrantes|programacao)"/)
})
