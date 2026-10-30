type ComingSoonPageProps = {
  eyebrow: string
  title: string
  description: string
  titleId: string
}

export function ComingSoonPage({ eyebrow, title, description, titleId }: ComingSoonPageProps) {
  return (
    <section className="route-placeholder" aria-labelledby={titleId}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 id={titleId}>{title}</h1>
      <p>{description}</p>
    </section>
  )
}
