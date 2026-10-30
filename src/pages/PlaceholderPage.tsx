import type { AppRoute } from '../routing/routes'

type PlaceholderPageProps = {
  route: AppRoute
}

export function PlaceholderPage({ route }: PlaceholderPageProps) {
  const titleId = `${route.id}-title`

  return (
    <section className="route-placeholder" aria-labelledby={titleId}>
      <p className="eyebrow">{route.eyebrow}</p>
      <h1 id={titleId}>{route.title}</h1>
      <p>{route.description}</p>
    </section>
  )
}
