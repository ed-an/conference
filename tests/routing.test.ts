import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  appRoutes,
  homeRoute,
  primaryNavigationRoutes,
  utilityNavigationRoutes,
} from '../src/routing/routes.ts'

const appRoutesSource = readFileSync(new URL('../src/routing/AppRoutes.tsx', import.meta.url), 'utf8')
const mainSource = readFileSync(new URL('../src/main.tsx', import.meta.url), 'utf8')
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
  dependencies: Record<string, string>
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

test('renders known routes inside BrowserRouter without anticipating a wildcard route', () => {
  assert.match(mainSource, /<BrowserRouter>/)
  assert.match(appRoutesSource, /appRoutes\.map/)
  assert.match(appRoutesSource, /path=\{route\.path\}/)
  assert.match(appRoutesSource, /<PlaceholderPage route=\{route\}/)
  assert.doesNotMatch(appRoutesSource, /path=["'{]*\*/)
})

test('adds React Router as the only dependency beyond the React foundation', () => {
  assert.deepEqual(Object.keys(packageJson.dependencies).sort(), [
    'react',
    'react-dom',
    'react-router-dom',
  ])
})
