import { useState, type ChangeEvent, type FormEvent } from 'react'
import { listAvailableEvents, listEventRegistrations, type AdminRegistration } from './adminApi'
import type { EventId, EventSummary } from '../../shared/registration-domain'

interface Props {
  listEvents?: (token: string) => Promise<EventSummary[]>
  listRegistrations?: (eventId: EventId, token: string) => Promise<AdminRegistration[]>
}
const formatDate = (value: string) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value))

export function AdminRegistrationsPage({
  listEvents = listAvailableEvents,
  listRegistrations = listEventRegistrations,
}: Props) {
  const [registrations, setRegistrations] = useState<AdminRegistration[] | null>(null)
  const [events, setEvents] = useState<EventSummary[]>([])
  const [selectedEventId, setSelectedEventId] = useState<EventId | null>(null)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const submittedToken = String(new FormData(form).get('token') ?? '')
    setLoading(true); setMessage('')
    try {
      const availableEvents = await listEvents(submittedToken)
      setEvents(availableEvents)
      setToken(submittedToken)
      const firstEvent = availableEvents[0]
      if (firstEvent) {
        setSelectedEventId(firstEvent.id)
        setRegistrations(await listRegistrations(firstEvent.id, submittedToken))
      } else {
        setRegistrations([])
      }
      form.reset()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível carregar as inscrições.')
    } finally { setLoading(false) }
  }

  async function selectEvent(event: ChangeEvent<HTMLSelectElement>) {
    const eventId = event.target.value as EventId
    setSelectedEventId(eventId)
    setLoading(true); setMessage('')
    try {
      setRegistrations(await listRegistrations(eventId, token))
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível carregar as inscrições.')
    } finally { setLoading(false) }
  }

  const selectedEvent = events.find(({ id }) => id === selectedEventId)

  return <section className="admin-page" aria-labelledby="admin-title">
    <p className="eyebrow">Área restrita</p><h1 id="admin-title">Inscrições do evento</h1>
    {registrations === null ? <form className="admin-access" onSubmit={authenticate}>
      <div className="form-field"><label htmlFor="admin-token">Token de acesso</label><input id="admin-token" name="token" type="password" required autoComplete="off" /></div>
      <button className="primary-action" disabled={loading}>{loading ? 'Verificando…' : 'Acessar inscrições'}</button>
      {message && <p role="alert" className="form-message form-message--error">{message}</p>}
    </form> : <>
      {events.length > 0 && <div className="form-field admin-event-selector"><label htmlFor="admin-event">Evento</label><select id="admin-event" value={selectedEventId ?? ''} onChange={selectEvent} disabled={loading}>{events.map((event) => <option key={event.id} value={event.id}>{event.name} {event.year}</option>)}</select></div>}
      {message && <p role="alert" className="form-message form-message--error">{message}</p>}
      {registrations.length === 0 ? <p role="status">Ainda não há inscrições para este evento.</p> :
      <div className="admin-table-wrapper"><table><caption>Inscrições confirmadas · {selectedEvent?.name} {selectedEvent?.year}</caption>
        <thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Inscrição</th><th>Consentimento</th></tr></thead>
        <tbody>{registrations.map((item) => <tr key={`${item.event.id}-${item.contact.email}`}><td>{item.contact.name}</td><td>{item.contact.email}</td><td>{item.contact.phone}</td><td>{formatDate(item.createdAt)}</td><td>{formatDate(item.consent.consentedAt)} · aviso {item.consent.privacyNoticeVersion}</td></tr>)}</tbody>
      </table></div>}</>}
  </section>
}
