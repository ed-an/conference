import { useEffect, useRef, useState, type ReactNode } from 'react'
import { events } from '../data'
import { navigationItems, type NavigationId } from './navigation'

type AppShellProps = { children: ReactNode }
const event = events[0]

function initialSection(): NavigationId {
  const hash = window.location.hash.slice(1)
  return navigationItems.some((item) => item.id === hash) ? (hash as NavigationId) : 'inicio'
}

export function AppShell({ children }: AppShellProps) {
  const [activeSection, setActiveSection] = useState<NavigationId>(initialSection)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visibleSection) setActiveSection(visibleSection.target.id as NavigationId)
      },
      { rootMargin: '-20% 0px -60%', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const selectSection = (id: NavigationId) => {
    setActiveSection(id)
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="#inicio" onClick={() => selectSection('inicio')}>
            <span className="brand__mark" aria-hidden="true">R</span>
            <span>{event.name}</span>
          </a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-button__lines" aria-hidden="true"><span /><span /><span /></span>
          </button>
          <nav id="primary-navigation" className="primary-navigation" aria-label="Navegação principal" data-open={menuOpen}>
            <ul>
              {navigationItems.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => selectSection(id)}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="conteudo-principal" tabIndex={-1}>{children}</main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <a className="brand brand--footer" href="#inicio" onClick={() => selectSection('inicio')}>
              <span className="brand__mark" aria-hidden="true">R</span>
              <span>{event.name}</span>
            </a>
            <p>Conectando pessoas que constroem a web.</p>
          </div>
          <nav aria-label="Links úteis">
            <p className="footer-title">Links úteis</p>
            <ul>
              {navigationItems.map(({ id, label }) => (
                <li key={id}><a href={`#${id}`} onClick={() => selectSection(id)}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <p className="copyright">© 2026 {event.name}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
