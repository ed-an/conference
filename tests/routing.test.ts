import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test, { after } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

import {
  appRoutes,
  homeRoute,
  primaryNavigationRoutes,
  utilityNavigationRoutes,
} from '../src/routing/routes.ts'

const vite = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } })
after(() => vite.close())

const { AppRoutes } = await vite.ssrLoadModule('/src/routing/AppRoutes.tsx') as {
  AppRoutes: typeof import('../src/routing/AppRoutes.tsx').AppRoutes
}

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
  dependencies: Record<string, string>
}

function renderRoute(path: string) {
  return renderToStaticMarkup(
    createElement(MemoryRouter, { initialEntries: [path] }, createElement(AppRoutes)),
  )
}

test('defines each agreed route exactly once', () => {
  const paths = appRoutes.map(({ path }) => path)

  assert.deepEqual(paths, [
    '/',
    '/location',
    '/hotels',
    '/food',
    '/code-of-conduct',
    '/speakers',
    '/schedule',
  ])
  assert.equal(new Set(paths).size, paths.length)
  assert.equal(homeRoute.path, '/')
})

test('separates primary and utility navigation without losing known destinations', () => {
  assert.deepEqual(primaryNavigationRoutes.map(({ id }) => id), ['home', 'speakers', 'schedule'])
  assert.deepEqual(utilityNavigationRoutes.map(({ id }) => id), [
    'location',
    'hotels',
    'food',
    'codeOfConduct',
    'speakers',
    'schedule',
  ])
})

test('renders the page associated with every known route', () => {
  const expectedPages = [
    ['/', 'Ideias que movem a web.'],
    ['/location', 'Localização'],
    ['/hotels', 'Hospedagem'],
    ['/food', 'Alimentação'],
    ['/code-of-conduct', 'Código de conduta'],
    ['/speakers', 'Palestrantes'],
    ['/schedule', 'Programação'],
  ] as const

  for (const [path, title] of expectedPages) {
    const page = renderRoute(path)
    assert.match(page, new RegExp(`<h1[^>]*>${title}<\\/h1>`))
    if (path !== '/') assert.match(page, /ser[aã]o? publicad|será apresentad/)
  }
})

test('does not render a page for an unknown route before Phase 07', () => {
  const originalWarn = console.warn
  console.warn = () => undefined
  try {
    assert.equal(renderRoute('/unknown'), '')
  } finally {
    console.warn = originalWarn
  }
})

test('adds React Router as the only dependency beyond the React foundation', () => {
  assert.deepEqual(Object.keys(packageJson.dependencies).sort(), [
    'react',
    'react-dom',
    'react-router-dom',
  ])
})
