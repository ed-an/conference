import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const tokenFile = new URL('../src/styles/tokens.css', import.meta.url)
const css = readFileSync(tokenFile, 'utf8')
const tokenMatches = [...css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)]
const tokenEntries = tokenMatches.map((match) => [match[1], match[2].trim()] as const)
const tokens = new Map(tokenEntries)

const requiredTokens = [
  '--color-surface',
  '--color-surface-container-low',
  '--color-surface-container',
  '--color-surface-container-high',
  '--color-on-surface',
  '--color-on-surface-variant',
  '--color-primary',
  '--color-on-primary',
  '--color-primary-container',
  '--color-on-primary-container',
  '--color-secondary',
  '--color-on-secondary',
  '--color-outline',
  '--color-outline-variant',
  '--color-error',
  '--color-on-error',
  '--color-focus',
  '--font-family-sans',
  '--type-display-large-size',
  '--type-headline-large-size',
  '--type-title-large-size',
  '--type-body-medium-size',
  '--type-label-large-size',
  '--space-1',
  '--space-2',
  '--space-4',
  '--space-8',
  '--space-16',
  '--space-24',
  '--layout-content-max',
  '--layout-page-gutter',
  '--layout-copy-max',
  '--radius-extra-small',
  '--radius-small',
  '--radius-medium',
  '--radius-large',
  '--radius-extra-large',
  '--radius-full',
  '--border-width-default',
  '--border-width-emphasis',
  '--shadow-low',
  '--shadow-medium',
  '--shadow-high',
  '--focus-ring-width',
  '--focus-ring-offset',
  '--state-hover-opacity',
  '--state-focus-opacity',
  '--state-pressed-opacity',
  '--state-disabled-opacity',
  '--motion-duration-short',
  '--motion-duration-medium',
  '--motion-easing-standard',
] as const

function resolveToken(name: string): string {
  const value = tokens.get(name)
  assert.ok(value, `Missing token ${name}`)
  const reference = value.match(/^var\((--[a-z0-9-]+)\)$/)?.[1]
  return reference ? resolveToken(reference) : value
}

function channelToLinear(channel: number): number {
  const normalized = channel / 255
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string): number {
  const match = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  assert.ok(match, `Expected six-digit hex color, received ${hex}`)
  const [, red, green, blue] = match
  return (
    0.2126 * channelToLinear(Number.parseInt(red, 16)) +
    0.7152 * channelToLinear(Number.parseInt(green, 16)) +
    0.0722 * channelToLinear(Number.parseInt(blue, 16))
  )
}

function contrast(foreground: string, background: string): number {
  const lighter = Math.max(luminance(foreground), luminance(background))
  const darker = Math.min(luminance(foreground), luminance(background))
  return (lighter + 0.05) / (darker + 0.05)
}

test('defines every required design token exactly once', () => {
  for (const name of requiredTokens) {
    assert.equal(
      tokenEntries.filter(([tokenName]) => tokenName === name).length,
      1,
      `${name} must be defined exactly once`,
    )
  }
})

test('keeps the token source component agnostic', () => {
  const selectors = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .match(/[^{}]+(?=\s*\{)/g)
    ?.map((selector) => selector.trim())
  assert.deepEqual(selectors, [':root'])
})

test('uses the canonical light surface and purple primary', () => {
  assert.equal((css.match(/#ffffff/gi) ?? []).length, 4)
  assert.equal((css.match(/#6842d8/gi) ?? []).length, 1)
})

test('meets WCAG contrast targets for semantic color pairs', () => {
  const textPairs = [
    ['--color-on-surface', '--color-surface'],
    ['--color-on-surface-variant', '--color-surface'],
    ['--color-on-surface-variant', '--color-surface-container'],
    ['--color-on-primary', '--color-primary'],
    ['--color-on-primary-container', '--color-primary-container'],
    ['--color-on-secondary', '--color-secondary'],
    ['--color-on-error', '--color-error'],
  ] as const

  for (const [foreground, background] of textPairs) {
    assert.ok(
      contrast(resolveToken(foreground), resolveToken(background)) >= 4.5,
      `${foreground} on ${background} must reach 4.5:1`,
    )
  }

  const nonTextPairs = [
    ['--color-outline', '--color-surface'],
    ['--color-focus', '--color-surface'],
    ['--color-focus', '--color-surface-container-high'],
  ] as const

  for (const [foreground, background] of nonTextPairs) {
    assert.ok(
      contrast(resolveToken(foreground), resolveToken(background)) >= 3,
      `${foreground} on ${background} must reach 3:1`,
    )
  }
})
