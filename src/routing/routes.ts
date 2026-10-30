export const appRoutes = [
  {
    id: 'home',
    path: '/',
    label: 'Início',
    primary: true,
  },
  {
    id: 'location',
    path: '/location',
    label: 'Localização',
    primary: false,
  },
  {
    id: 'hotels',
    path: '/hotels',
    label: 'Hospedagem',
    primary: false,
  },
  {
    id: 'food',
    path: '/food',
    label: 'Alimentação',
    primary: false,
  },
  {
    id: 'codeOfConduct',
    path: '/code-of-conduct',
    label: 'Código de conduta',
    primary: false,
  },
  {
    id: 'speakers',
    path: '/speakers',
    label: 'Palestrantes',
    primary: true,
  },
  {
    id: 'schedule',
    path: '/schedule',
    label: 'Programação',
    primary: true,
  },
] as const

export type AppRoute = (typeof appRoutes)[number]
export type RouteId = AppRoute['id']

export const homeRoute = appRoutes[0]
export const primaryNavigationRoutes = appRoutes.filter((route) => route.primary)
export const utilityNavigationRoutes = appRoutes.filter((route) => route.id !== 'home')
