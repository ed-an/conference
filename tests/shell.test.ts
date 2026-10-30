import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { primaryNavigationRoutes, utilityNavigationRoutes } from '../src/routing/routes.ts'

const shell = readFileSync(new URL('../src/layout/AppShell.tsx', import.meta.url), 'utf8')

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
  assert.match(shell, /href="#conteudo-principal"/)
  assert.match(shell, /<header className="site-header">/)
  assert.match(shell, /<main id="conteudo-principal" tabIndex=\{-1\}>/)
  assert.match(shell, /<footer className="site-footer">/)
  assert.match(shell, /aria-label="Navegação principal"/)
})

test('exposes accessible state for mobile and active navigation', () => {
  assert.match(shell, /aria-expanded=\{menuOpen\}/)
  assert.match(shell, /aria-controls="primary-navigation"/)
  assert.match(shell, /<NavLink to=\{path\} end=\{path === '\/'\}/)
  assert.match(shell, /onClick=\{closeMenu\}/)
  assert.match(shell, /keyboardEvent\.key === 'Escape'/)
})

test('uses router links instead of the previous section fragments', () => {
  assert.match(shell, /<Link className="brand"/)
  assert.match(shell, /primaryNavigationRoutes\.map/)
  assert.match(shell, /utilityNavigationRoutes\.map/)
  assert.doesNotMatch(shell, /href=\{?`?#/)
})
