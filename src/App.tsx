import './App.css'
import { AppShell } from './layout/AppShell'

function App() {
  return (
    <AppShell>
      <section className="intro-section" id="inicio" aria-labelledby="inicio-title">
        <p className="eyebrow">React Conference 2026</p>
        <h1 id="inicio-title">Ideias que movem a web.</h1>
        <p>Um ponto de encontro para pessoas que constroem o presente e o futuro do frontend.</p>
      </section>

      <section className="placeholder-section" id="palestrantes" aria-labelledby="palestrantes-title">
        <p className="section-number" aria-hidden="true">01</p>
        <div>
          <p className="eyebrow">Pessoas e perspectivas</p>
          <h2 id="palestrantes-title">Palestrantes</h2>
          <p>A programação completa de palestrantes será apresentada em breve.</p>
        </div>
      </section>

      <section className="placeholder-section" id="programacao" aria-labelledby="programacao-title">
        <p className="section-number" aria-hidden="true">02</p>
        <div>
          <p className="eyebrow">Um dia para compartilhar</p>
          <h2 id="programacao-title">Programação</h2>
          <p>Os horários e detalhes das sessões serão publicados em breve.</p>
        </div>
      </section>
    </AppShell>
  )
}

export default App
