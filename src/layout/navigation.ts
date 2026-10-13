export const navigationItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'palestrantes', label: 'Palestrantes' },
  { id: 'programacao', label: 'Programação' },
] as const

export type NavigationId = (typeof navigationItems)[number]['id']
