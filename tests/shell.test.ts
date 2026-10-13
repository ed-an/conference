import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { navigationItems } from '../src/layout/navigation.ts'

const shell = readFileSync(new URL('../src/layout/AppShell.tsx', import.meta.url), 'utf8')

test('defines the agreed anchor navigation in pt-BR', () => {
  assert.deepEqual(navigationItems, [
    { id: 'inicio', label: 'Início' },
    { id: 'palestrantes', label: 'Palestrantes' },
    { id: 'programacao', label: 'Programação' },
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
  assert.match(shell, /aria-current=\{activeSection === id \? 'location' : undefined\}/)
  assert.match(shell, /keyboardEvent\.key === 'Escape'/)
})
