import { useState, type FormEvent } from 'react'
import { currentEvent } from '../data/events'
import { registerAttendee, type RegistrationConfirmation, type RegistrationRequest } from './registrationApi'

interface RegistrationFormProps {
  register?: (input: RegistrationRequest) => Promise<RegistrationConfirmation>
}

export function RegistrationForm({ register = registerAttendee }: RegistrationFormProps) {
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const phone = String(data.get('phone') ?? '')
    if (phone.replace(/\D/g, '').length < 10) {
      setState('error')
      setMessage('Informe um telefone com DDD para continuar.')
      return
    }
    setState('submitting')
    setMessage('')
    try {
      const confirmation = await register({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        phone,
        eventId: currentEvent.id,
        privacyNoticeVersion: '2026-11-02',
        consent: true,
      })
      setState('success')
      setMessage(confirmation.message)
      form.reset()
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Não foi possível enviar sua inscrição. Tente novamente.')
    }
  }

  return (
    <form className="registration__form" onSubmit={submit}>
      <div className="form-field">
        <label htmlFor="registration-name">Nome</label>
        <input id="registration-name" name="name" required autoComplete="name" minLength={2} />
      </div>
      <div className="form-field">
        <label htmlFor="registration-email">E-mail</label>
        <input type="email" id="registration-email" name="email" required autoComplete="email" />
      </div>
      <div className="form-field">
        <label htmlFor="registration-phone">Telefone</label>
        <input type="tel" id="registration-phone" name="phone" required autoComplete="tel" minLength={10} pattern="[+0-9 ()-]{10,}" />
      </div>
      <details className="privacy-notice" id="registration-privacy-notice">
        <summary>Aviso de privacidade — versão 2026-11-02</summary>
        <p>Nome, e-mail e telefone serão usados somente para administrar sua participação neste evento. O acesso é restrito à organização, e os dados não serão usados para pagamentos ou marketing. Você poderá solicitar informações, correção ou exclusão à organização. O prazo de retenção será publicado antes da abertura das inscrições em produção.</p>
      </details>
      <div className="consent-field">
        <input id="registration-consent" name="consent" type="checkbox" required aria-describedby="registration-privacy-notice" />
        <label htmlFor="registration-consent">Li e concordo com o aviso de privacidade, versão 2026-11-02.</label>
      </div>
      <button className="primary-action" type="submit" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Enviando…' : 'Enviar inscrição'}
      </button>
      {message && <p className={`form-message form-message--${state}`} role={state === 'error' ? 'alert' : 'status'}>{message}</p>}
    </form>
  )
}
