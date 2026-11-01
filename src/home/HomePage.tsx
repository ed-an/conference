import { events } from '../data/events'

const event = events[0]

const eventDate = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: event.timeZone,
}).format(new Date(event.startDate))

export function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__content">
          <p className="eyebrow">Uma experiência para quem move a web</p>
          <h1 id="home-title">{event.name}</h1>
          <p className="hero__description">{event.description}</p>
          <dl className="hero__details" aria-label="Informações do evento">
            <div>
              <dt>Data</dt>
              <dd>{eventDate}</dd>
            </div>
            <div>
              <dt>Local</dt>
              <dd>{event.venueName} · {event.city}</dd>
            </div>
          </dl>
          <a className="primary-action" href="#inscricao">Inscrever</a>
        </div>
      </section>

      <section id="inscricao" className="registration" aria-labelledby="registration-title">
        <div className="registration__intro">
          <p className="eyebrow">Garanta seu lugar</p>
          <h2 id="registration-title">Inscreva-se para viver essa experiência</h2>
          <p>Preencha seus dados para se preparar. O envio da inscrição ainda não está disponível.</p>
        </div>
        <form className="registration__form" onSubmit={(event) => event.preventDefault()}>
          <div className="form-field">
            <label htmlFor="registration-name">Nome</label>
            <input id="registration-name" name="name" required autoComplete="name" />
          </div>
          <div className="form-field">
            <label htmlFor="registration-email">E-mail</label>
            <input type="email" id="registration-email" name="email" required autoComplete="email" />
          </div>
          <div className="form-field">
            <label htmlFor="registration-phone">Telefone</label>
            <input type="tel" id="registration-phone" name="phone" required autoComplete="tel" />
          </div>
          <button className="primary-action" type="submit">Enviar inscrição</button>
        </form>
      </section>
    </>
  )
}
