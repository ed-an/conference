import type { Speaker } from '../models/speaker.ts'
import { speakerIds } from './ids.ts'
import { slug, url } from './values.ts'

export const speakers = [
  {
    id: speakerIds.ana,
    slug: slug('ana-lima'),
    name: 'Ana Lima',
    description: 'Especialista em arquitetura frontend sustentável.',
    bio: 'Engenheira de software focada em aplicações React que permanecem simples mesmo quando equipes e produtos crescem.',
    jobTitle: 'Staff Frontend Engineer',
    company: 'Nuvem Clara',
    avatarUrl: url('https://conference.example.com/images/speakers/ana-lima.png'),
    socialLinks: [
      { platform: 'github', url: url('https://github.example.com/reactconf-ana') },
      { platform: 'linkedin', url: url('https://linkedin.example.com/reactconf-ana') },
    ],
  },
  {
    id: speakerIds.bruno,
    slug: slug('bruno-tavares'),
    name: 'Bruno Tavares',
    description: 'Educador e pesquisador de acessibilidade digital.',
    bio: 'Ajuda equipes a transformar requisitos de acessibilidade em decisões cotidianas de produto e engenharia.',
    jobTitle: 'Accessibility Lead',
    company: 'Produto Aberto',
    socialLinks: [
      { platform: 'website', url: url('https://bruno.example.com') },
    ],
  },
  {
    id: speakerIds.camila,
    slug: slug('camila-rocha'),
    name: 'Camila Rocha',
    description: 'Engenheira dedicada à qualidade de produtos web.',
    bio: 'Trabalha com estratégias de testes que aumentam a confiança sem acoplar a suíte aos detalhes de implementação.',
    jobTitle: 'Quality Engineer',
    company: 'Horizonte Web',
    avatarUrl: url('https://conference.example.com/images/speakers/camila-rocha.png'),
  },
  {
    id: speakerIds.diego,
    slug: slug('diego-martins'),
    name: 'Diego Martins',
    description: 'Especialista em desempenho de aplicações React.',
    bio: 'Investiga gargalos reais de carregamento e interação para construir experiências rápidas em diferentes dispositivos.',
    jobTitle: 'Performance Engineer',
    company: 'Rápido Labs',
    socialLinks: [
      { platform: 'mastodon', url: url('https://social.example.com/@diego') },
    ],
  },
  {
    id: speakerIds.elisa,
    slug: slug('elisa-monteiro'),
    name: 'Elisa Monteiro',
    description: 'Designer de sistemas e engenheira frontend.',
    bio: 'Conecta design e código para criar interfaces consistentes, inclusivas e fáceis de evoluir.',
    company: 'Forma Digital',
    avatarUrl: url('https://conference.example.com/images/speakers/elisa-monteiro.png'),
  },
  {
    id: speakerIds.felipe,
    slug: slug('felipe-nunes'),
    name: 'Felipe Nunes',
    description: 'Arquiteto de software interessado no futuro do React.',
    bio: 'Explora renderização híbrida, componentes de servidor e limites claros entre aplicação e infraestrutura.',
    jobTitle: 'Principal Engineer',
    socialLinks: [
      { platform: 'bluesky', url: url('https://bluesky.example.com/felipe') },
    ],
  },
] satisfies readonly Speaker[]
