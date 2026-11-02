import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { AdminRegistrationsPage } from '../src/admin/AdminRegistrationsPage.tsx'

describe('AdminRegistrationsPage', () => {
  afterEach(cleanup)

  test('lists registrations after administrative authorization', async () => {
    const listRegistrations = vi.fn().mockResolvedValue([{
      name: 'Ana Souza',
      email: 'ana@example.com',
      phone: '+55 11 99999-0000',
      eventId: '10000000-0000-4000-8000-000000000001',
      consentedAt: '2026-11-02T12:00:00.000Z',
      privacyNoticeVersion: '2026-11-02',
      createdAt: '2026-11-02T12:00:00.000Z',
    }])
    const user = userEvent.setup()
    render(<AdminRegistrationsPage listRegistrations={listRegistrations} />)

    await user.type(screen.getByLabelText('Token de acesso'), 'secret-token')
    await user.click(screen.getByRole('button', { name: 'Acessar inscrições' }))

    expect(await screen.findByText('Ana Souza')).toBeTruthy()
    expect(screen.getByText('ana@example.com')).toBeTruthy()
    expect(screen.getByText(/React Conference 2026/)).toBeTruthy()
    expect(listRegistrations).toHaveBeenCalledWith('secret-token')
  })

  test('shows access denied without exposing technical details', async () => {
    const listRegistrations = vi.fn().mockRejectedValue(new Error('Acesso administrativo não autorizado.'))
    const user = userEvent.setup()
    render(<AdminRegistrationsPage listRegistrations={listRegistrations} />)

    await user.type(screen.getByLabelText('Token de acesso'), 'wrong-token')
    await user.click(screen.getByRole('button', { name: 'Acessar inscrições' }))

    expect((await screen.findByRole('alert')).textContent).toContain('Acesso administrativo não autorizado.')
  })
})
