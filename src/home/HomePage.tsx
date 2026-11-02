import { currentEvent } from '../data/events'
import { RegistrationForm } from '../registration/RegistrationForm'

const eventDate = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: currentEvent.timeZone,
}).format(new Date(currentEvent.startDate))

export function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__content">
          <p className="eyebrow">Uma experiência para quem move a web</p>
          <h1 id="home-title">{currentEvent.name}</h1>
          <p className="hero__description">{currentEvent.description}</p>
          <dl className="hero__details" aria-label="Informações do evento">
            <div>
              <dt>Data</dt>
              <dd>{eventDate}</dd>
            </div>
            <div>
              <dt>Local</dt>
              <dd>{currentEvent.venueName} · {currentEvent.city}</dd>
            </div>
          </dl>
          <a className="primary-action" href="#inscricao">Inscrever</a>
        </div>
      </section>

      <section id="inscricao" className="registration" aria-labelledby="registration-title">
        <div className="registration__intro">
          <p className="eyebrow">Comece sua inscrição</p>
          <h2 id="registration-title">Inscreva-se para viver essa experiência</h2>
          <p>Preencha seus dados para confirmar seu interesse em participar.</p>
        </div>
        <RegistrationForm />
      </section>
    </>
  )
}
