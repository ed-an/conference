import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { RegistrationForm } from '../src/registration/RegistrationForm.tsx'

describe('RegistrationForm', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })
  test('submits valid data with explicit consent and shows confirmation', async () => {
    const register = vi.fn().mockResolvedValue({
      status: 'confirmed',
      message: 'Inscrição realizada com sucesso.',
    })
    const user = userEvent.setup()
    render(<RegistrationForm register={register} />)

    await user.type(screen.getByLabelText('Nome'), 'Ana Souza')
    await user.type(screen.getByLabelText('E-mail'), 'ana@example.com')
    await user.type(screen.getByLabelText('Telefone'), '+55 11 99999-0000')
    await user.click(screen.getByRole('checkbox', { name: /concordo/i }))
    await user.click(screen.getByRole('button', { name: 'Enviar inscrição' }))

    expect((await screen.findByRole('status')).textContent).toContain('Inscrição realizada com sucesso.')
    expect(register).toHaveBeenCalledWith(expect.objectContaining({
      contact: expect.objectContaining({
        name: 'Ana Souza',
        email: 'ana@example.com',
      }),
      consent: expect.objectContaining({ accepted: true }),
    }))
  })

  test('keeps entered data when the API reports a duplicate', async () => {
    const register = vi.fn().mockRejectedValue(new Error(
      'Já existe uma inscrição para este e-mail neste evento.',
    ))
    const user = userEvent.setup()
    render(<RegistrationForm register={register} />)

    await user.type(screen.getByLabelText('Nome'), 'Ana Souza')
    await user.type(screen.getByLabelText('E-mail'), 'ana@example.com')
    await user.type(screen.getByLabelText('Telefone'), '+55 11 99999-0000')
    await user.click(screen.getByRole('checkbox', { name: /concordo/i }))
    await user.click(screen.getByRole('button', { name: 'Enviar inscrição' }))

    expect((await screen.findByRole('alert')).textContent).toContain('Já existe uma inscrição')
    expect((screen.getByLabelText('E-mail') as HTMLInputElement).value).toBe('ana@example.com')
  })

  test('validates the phone before calling the API and identifies the privacy notice version', async () => {
    const register = vi.fn()
    const user = userEvent.setup()
    render(<RegistrationForm register={register} />)
    await user.type(screen.getByLabelText('Nome'), 'Ana Souza')
    await user.type(screen.getByLabelText('E-mail'), 'ana@example.com')
    await user.type(screen.getByLabelText('Telefone'), '123')
    await user.click(screen.getByRole('checkbox', { name: /versão 2026-11-02/i }))
    await user.click(screen.getByRole('button', { name: 'Enviar inscrição' }))

    expect(register).not.toHaveBeenCalled()
  })

  test('explains network unavailability in pt-BR and preserves entered data', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Failed to fetch')))
    const user = userEvent.setup()
    render(<RegistrationForm />)
    await user.click(screen.getByText('Aviso de privacidade — versão 2026-11-02'))
    expect(screen.getByText(/usados somente para administrar sua participação/i)).toBeTruthy()
    await user.type(screen.getByLabelText('Nome'), 'Ana Souza')
    await user.type(screen.getByLabelText('E-mail'), 'ana@example.com')
    await user.type(screen.getByLabelText('Telefone'), '+55 11 99999-0000')
    await user.click(screen.getByRole('checkbox', { name: /li e concordo/i }))
    await user.click(screen.getByRole('button', { name: 'Enviar inscrição' }))

    expect((await screen.findByRole('alert')).textContent).toContain('Não foi possível enviar sua inscrição. Tente novamente.')
    expect((screen.getByLabelText('E-mail') as HTMLInputElement).value).toBe('ana@example.com')
  })
})
