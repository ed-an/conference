import { homeRoute } from '../routing/routes'

export function HomePage() {
  return (
    <section className="intro-section" aria-labelledby="home-title">
      <p className="eyebrow">{homeRoute.eyebrow}</p>
      <h1 id="home-title">{homeRoute.title}</h1>
      <p>{homeRoute.description}</p>
    </section>
  )
}
