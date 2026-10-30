import { useEffect, useReducer, useRef, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { events } from '../data'
import { homeRoute, primaryNavigationRoutes, utilityNavigationRoutes } from '../routing/routes'
import { menuOpenReducer } from './menuState'

type AppShellProps = { children: ReactNode }
const event = events[0]

export function AppShell({ children }: AppShellProps) {
  const [menuOpen, dispatchMenu] = useReducer(menuOpenReducer, false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') {
        dispatchMenu('escape')
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => dispatchMenu('navigate')

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="brand" to={homeRoute.path} onClick={closeMenu}>
            <span className="brand__mark" aria-hidden="true">R</span>
            <span>{event.name}</span>
          </Link>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
            onClick={() => dispatchMenu('toggle')}
          >
            <span className="menu-button__lines" aria-hidden="true"><span /><span /><span /></span>
          </button>
          <nav id="primary-navigation" className="primary-navigation" aria-label="Navegação principal" data-open={menuOpen}>
            <ul>
              {primaryNavigationRoutes.map(({ id, label, path }) => (
                <li key={id}>
                  <NavLink to={path} end={path === '/'} onClick={closeMenu}>{label}</NavLink>
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
            <Link className="brand brand--footer" to={homeRoute.path} onClick={closeMenu}>
              <span className="brand__mark" aria-hidden="true">R</span>
              <span>{event.name}</span>
            </Link>
            <p>Conectando pessoas que constroem a web.</p>
          </div>
          <nav aria-label="Links úteis">
            <p className="footer-title">Links úteis</p>
            <ul>
              {utilityNavigationRoutes.map(({ id, label, path }) => (
                <li key={id}><Link to={path} onClick={closeMenu}>{label}</Link></li>
              ))}
            </ul>
          </nav>
          <p className="copyright">© 2026 {event.name}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
