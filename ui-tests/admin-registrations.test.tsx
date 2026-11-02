import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { AdminRegistrationsPage } from '../src/admin/AdminRegistrationsPage.tsx'

describe('AdminRegistrationsPage', () => {
  afterEach(cleanup)

  test('lists registrations after administrative authorization', async () => {
    const listEvents = vi.fn().mockResolvedValue([
      { id: '10000000-0000-4000-8000-000000000001', name: 'React Conference', year: 2026 },
      { id: '10000000-0000-4000-8000-000000000002', name: 'React Conference', year: 2027 },
    ])
    const listRegistrations = vi.fn().mockResolvedValue([{
      event: { id: '10000000-0000-4000-8000-000000000001', name: 'React Conference', year: 2026 },
      contact: {
        name: 'Ana Souza', email: 'ana@example.com', phone: '+55 11 99999-0000',
      },
      consent: {
        consentedAt: '2026-11-02T12:00:00.000Z', privacyNoticeVersion: '2026-11-02',
      },
      createdAt: '2026-11-02T12:00:00.000Z',
    }])
    const user = userEvent.setup()
    render(<AdminRegistrationsPage listEvents={listEvents} listRegistrations={listRegistrations} />)

    await user.type(screen.getByLabelText('Token de acesso'), 'secret-token')
    await user.click(screen.getByRole('button', { name: 'Acessar inscrições' }))

    expect(await screen.findByText('Ana Souza')).toBeTruthy()
    expect(screen.getByText('ana@example.com')).toBeTruthy()
    expect(screen.getByText(/Inscrições confirmadas.*React Conference 2026/, { selector: 'caption' })).toBeTruthy()
    expect(listRegistrations).toHaveBeenCalledWith('10000000-0000-4000-8000-000000000001', 'secret-token')

    await user.selectOptions(screen.getByLabelText('Evento'), '10000000-0000-4000-8000-000000000002')
    expect(listRegistrations).toHaveBeenLastCalledWith('10000000-0000-4000-8000-000000000002', 'secret-token')
  })

  test('shows access denied without exposing technical details', async () => {
    const listEvents = vi.fn().mockRejectedValue(new Error('Acesso administrativo não autorizado.'))
    const listRegistrations = vi.fn().mockRejectedValue(new Error('Acesso administrativo não autorizado.'))
    const user = userEvent.setup()
    render(<AdminRegistrationsPage listEvents={listEvents} listRegistrations={listRegistrations} />)

    await user.type(screen.getByLabelText('Token de acesso'), 'wrong-token')
    await user.click(screen.getByRole('button', { name: 'Acessar inscrições' }))

    expect((await screen.findByRole('alert')).textContent).toContain('Acesso administrativo não autorizado.')
  })

  test('shows an empty state for an event without registrations', async () => {
    const listEvents = vi.fn().mockResolvedValue([
      { id: '10000000-0000-4000-8000-000000000001', name: 'React Conference', year: 2026 },
    ])
    const listRegistrations = vi.fn().mockResolvedValue([])
    const user = userEvent.setup()
    render(<AdminRegistrationsPage listEvents={listEvents} listRegistrations={listRegistrations} />)
    await user.type(screen.getByLabelText('Token de acesso'), 'secret-token')
    await user.click(screen.getByRole('button', { name: 'Acessar inscrições' }))

    expect((await screen.findByRole('status')).textContent).toContain('Ainda não há inscrições')
  })
})
