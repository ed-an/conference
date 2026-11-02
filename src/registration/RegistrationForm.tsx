import { useRef, useState, type FormEvent } from 'react'
import { currentEvent } from '../data/events'
import { registerAttendee, type RegistrationConfirmation, type RegistrationRequest } from './registrationApi'
import {
  isEventId,
  normalizeEmail,
} from '../../shared/registration-domain'
import { currentPrivacyNotice } from '../../content/privacy-notice'

interface RegistrationFormProps {
  register?: (input: RegistrationRequest) => Promise<RegistrationConfirmation>
}

type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'consent', string>>

export function RegistrationForm({ register = registerAttendee }: RegistrationFormProps) {
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '')
    const errors: FieldErrors = {}
    if (name.length < 2) errors.name = 'Informe seu nome com pelo menos 2 caracteres.'
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Informe um e-mail válido.'
    if (phone.replace(/\D/g, '').length < 10) errors.phone = 'Informe um telefone com DDD para continuar.'
    if (data.get('consent') !== 'on') errors.consent = 'Leia e aceite o aviso de privacidade para continuar.'
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setState('error')
      setMessage('Revise os campos destacados para continuar.')
      return
    }
    if (!isEventId(currentEvent.id)) {
      setState('error')
      setMessage('Este evento não está disponível para inscrição.')
      return
    }
    submitting.current = true
    setState('submitting')
    setMessage('')
    try {
      const confirmation = await register({
        contact: {
          name,
          email: normalizeEmail(email),
          phone,
        },
        eventId: currentEvent.id,
        consent: {
          accepted: true,
          privacyNoticeVersion: currentPrivacyNotice.version,
        },
      })
      setState('success')
      setMessage(confirmation.message)
      form.reset()
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Não foi possível enviar sua inscrição. Tente novamente.')
    } finally {
      submitting.current = false
    }
  }

  return (
    <form className="registration__form" onSubmit={submit} noValidate>
      <div className="form-field">
        <label htmlFor="registration-name">Nome</label>
        <input id="registration-name" name="name" required autoComplete="name" minLength={2} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'registration-name-error' : undefined} />
        {fieldErrors.name && <p id="registration-name-error" className="field-error">{fieldErrors.name}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="registration-email">E-mail</label>
        <input type="email" id="registration-email" name="email" required autoComplete="email" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? 'registration-email-error' : undefined} />
        {fieldErrors.email && <p id="registration-email-error" className="field-error">{fieldErrors.email}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="registration-phone">Telefone</label>
        <input type="tel" id="registration-phone" name="phone" required autoComplete="tel" minLength={10} pattern="[+0-9 ()-]{10,}" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? 'registration-phone-error' : undefined} />
        {fieldErrors.phone && <p id="registration-phone-error" className="field-error">{fieldErrors.phone}</p>}
      </div>
      <details className="privacy-notice" id="registration-privacy-notice">
        <summary>{currentPrivacyNotice.title} — versão {currentPrivacyNotice.version}</summary>
        <p>{currentPrivacyNotice.text}</p>
      </details>
      <div className="consent-field">
        <input id="registration-consent" name="consent" type="checkbox" required aria-invalid={Boolean(fieldErrors.consent)} aria-describedby={`registration-privacy-notice${fieldErrors.consent ? ' registration-consent-error' : ''}`} />
        <label htmlFor="registration-consent">Li e concordo com o aviso de privacidade, versão {currentPrivacyNotice.version}.</label>
        {fieldErrors.consent && <p id="registration-consent-error" className="field-error">{fieldErrors.consent}</p>}
      </div>
      <button className="primary-action" type="submit" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Enviando…' : 'Enviar inscrição'}
      </button>
      {message && <p className={`form-message form-message--${state}`} role={state === 'error' ? 'alert' : 'status'}>{message}</p>}
    </form>
  )
}
