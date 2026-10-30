export const appRoutes = [
  {
    id: 'home',
    path: '/',
    label: 'Início',
    primary: true,
    eyebrow: 'React Conference 2026',
    title: 'Ideias que movem a web.',
    description: 'Um ponto de encontro para pessoas que constroem o presente e o futuro do frontend.',
  },
  {
    id: 'location',
    path: '/location',
    label: 'Localização',
    primary: false,
    eyebrow: 'Planeje sua chegada',
    title: 'Localização',
    description: 'As informações sobre o local, acesso e transporte serão publicadas em breve.',
  },
  {
    id: 'hotels',
    path: '/hotels',
    label: 'Hospedagem',
    primary: false,
    eyebrow: 'Onde ficar',
    title: 'Hospedagem',
    description: 'As opções de hospedagem recomendadas serão publicadas em breve.',
  },
  {
    id: 'food',
    path: '/food',
    label: 'Alimentação',
    primary: false,
    eyebrow: 'Durante o evento',
    title: 'Alimentação',
    description: 'As opções de alimentação e informações sobre dietas serão publicadas em breve.',
  },
  {
    id: 'codeOfConduct',
    path: '/code-of-conduct',
    label: 'Código de conduta',
    primary: false,
    eyebrow: 'Um evento para todas as pessoas',
    title: 'Código de conduta',
    description: 'As orientações de convivência e os canais de apoio serão publicados em breve.',
  },
  {
    id: 'speakers',
    path: '/speakers',
    label: 'Palestrantes',
    primary: true,
    eyebrow: 'Pessoas e perspectivas',
    title: 'Palestrantes',
    description: 'A programação completa de palestrantes será apresentada em breve.',
  },
  {
    id: 'schedule',
    path: '/schedule',
    label: 'Programação',
    primary: true,
    eyebrow: 'Um dia para compartilhar',
    title: 'Programação',
    description: 'Os horários e detalhes das sessões serão publicados em breve.',
  },
] as const

export type AppRoute = (typeof appRoutes)[number]
export type RouteId = AppRoute['id']

export const homeRoute = appRoutes[0]
export const primaryNavigationRoutes = appRoutes.filter((route) => route.primary)
export const utilityNavigationRoutes = appRoutes.filter((route) => route.id !== 'home')
