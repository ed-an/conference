import { Link } from 'react-router-dom'
import { homeRoute } from './routes'

export function NotFoundPage() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <p className="eyebrow">Erro 404</p>
      <h1 id="not-found-title">Página não encontrada</h1>
      <p>
        O endereço pode estar incorreto ou a página que você procura não existe.
      </p>
      <Link className="primary-action" to={homeRoute.path}>
        Voltar ao início
      </Link>
    </section>
  )
}
