import { useState, type FormEvent } from 'react'
import { listEventRegistrations, type AdminRegistration } from './adminApi'
import { currentEvent } from '../data/events'

interface Props { listRegistrations?: (token: string) => Promise<AdminRegistration[]> }
const formatDate = (value: string) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value))

export function AdminRegistrationsPage({ listRegistrations = listEventRegistrations }: Props) {
  const [registrations, setRegistrations] = useState<AdminRegistration[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setLoading(true); setMessage('')
    try {
      setRegistrations(await listRegistrations(String(new FormData(form).get('token') ?? '')))
      form.reset()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível carregar as inscrições.')
    } finally { setLoading(false) }
  }

  return <section className="admin-page" aria-labelledby="admin-title">
    <p className="eyebrow">Área restrita</p><h1 id="admin-title">Inscrições do evento</h1>
    {registrations === null ? <form className="admin-access" onSubmit={authenticate}>
      <div className="form-field"><label htmlFor="admin-token">Token de acesso</label><input id="admin-token" name="token" type="password" required autoComplete="off" /></div>
      <button className="primary-action" disabled={loading}>{loading ? 'Verificando…' : 'Acessar inscrições'}</button>
      {message && <p role="alert" className="form-message form-message--error">{message}</p>}
    </form> : registrations.length === 0 ? <p role="status">Ainda não há inscrições para este evento.</p> :
      <div className="admin-table-wrapper"><table><caption>Inscrições confirmadas · {currentEvent.name} {new Date(currentEvent.startDate).getFullYear()}</caption>
        <thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Inscrição</th><th>Consentimento</th></tr></thead>
        <tbody>{registrations.map((item) => <tr key={`${item.eventId}-${item.contact.email}`}><td>{item.contact.name}</td><td>{item.contact.email}</td><td>{item.contact.phone}</td><td>{formatDate(item.createdAt)}</td><td>{formatDate(item.consent.consentedAt)} · aviso {item.consent.privacyNoticeVersion}</td></tr>)}</tbody>
      </table></div>}
  </section>
}
