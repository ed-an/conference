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

  test('explains how to correct name, e-mail and consent in pt-BR', async () => {
    const register = vi.fn()
    const user = userEvent.setup()
    render(<RegistrationForm register={register} />)
    await user.type(screen.getByLabelText('Nome'), 'A')
    await user.type(screen.getByLabelText('E-mail'), 'email-invalido')
    await user.type(screen.getByLabelText('Telefone'), '+55 11 99999-0000')
    await user.click(screen.getByRole('button', { name: 'Enviar inscrição' }))

    expect(screen.getByText('Informe seu nome com pelo menos 2 caracteres.')).toBeTruthy()
    expect(screen.getByText('Informe um e-mail válido.')).toBeTruthy()
    expect(screen.getByText('Leia e aceite o aviso de privacidade para continuar.')).toBeTruthy()
    expect(register).not.toHaveBeenCalled()
  })

  test('prevents repeated submissions while a request is in progress', async () => {
    let resolveRegistration!: (value: { status: 'confirmed'; message: string }) => void
    const register = vi.fn().mockReturnValue(new Promise((resolve) => {
      resolveRegistration = resolve
    }))
    const user = userEvent.setup()
    render(<RegistrationForm register={register} />)
    await user.type(screen.getByLabelText('Nome'), 'Ana Souza')
    await user.type(screen.getByLabelText('E-mail'), 'ana@example.com')
    await user.type(screen.getByLabelText('Telefone'), '+55 11 99999-0000')
    await user.click(screen.getByRole('checkbox', { name: /concordo/i }))
    const submit = screen.getByRole('button', { name: 'Enviar inscrição' })
    await Promise.all([user.click(submit), user.click(submit)])

    expect(register).toHaveBeenCalledTimes(1)
    resolveRegistration({ status: 'confirmed', message: 'Inscrição realizada com sucesso.' })
    expect((await screen.findByRole('status')).textContent).toContain('Inscrição realizada')
  })

  test('explains network unavailability in pt-BR and preserves entered data', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
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
    const output = [...log.mock.calls, ...warn.mock.calls, ...error.mock.calls].flat().join(' ')
    log.mockRestore(); warn.mockRestore(); error.mockRestore()
    expect(output).not.toMatch(/Ana Souza|ana@example\.com|99999-0000|Failed to fetch/)
  })
})
