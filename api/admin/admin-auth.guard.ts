import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'

export interface AdminAuthTokens {
  admin: string
  nonAdmin?: string
}

export const ADMIN_AUTH_TOKENS = Symbol('ADMIN_AUTH_TOKENS')

export class AdminAuthGuard implements CanActivate {
  private readonly tokens: AdminAuthTokens

  constructor(tokens: AdminAuthTokens) {
    this.tokens = tokens
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      headers: { authorization?: string }
    }>()
    const authorization = request.headers.authorization
    if (!authorization || (authorization !== `Bearer ${this.tokens.admin}` && authorization !== `Bearer ${this.tokens.nonAdmin}`)) {
      throw new UnauthorizedException({
        status: 'unauthorized',
        message: 'Acesso administrativo não autorizado.',
      })
    }
    if (authorization !== `Bearer ${this.tokens.admin}`) {
      throw new ForbiddenException({
        status: 'forbidden',
        message: 'Seu acesso não permite consultar inscrições.',
      })
    }
    return true
  }
}

Inject(ADMIN_AUTH_TOKENS)(AdminAuthGuard, undefined, 0)
Injectable()(AdminAuthGuard)
