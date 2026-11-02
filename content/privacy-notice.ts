import {
  toPrivacyNoticeVersion,
  type PrivacyNoticeVersion,
} from '../shared/registration-domain.ts'

export const currentPrivacyNotice = {
  version: toPrivacyNoticeVersion('2026-11-02'),
  title: 'Aviso de privacidade',
  text: 'Nome, e-mail e telefone serão usados somente para administrar sua participação neste evento. O acesso é restrito à organização, e os dados não serão usados para pagamentos ou marketing. Você poderá solicitar informações, correção ou exclusão à organização. O prazo de retenção será publicado antes da abertura das inscrições em produção.',
} as const

export function isCurrentPrivacyNoticeVersion(value: unknown): value is PrivacyNoticeVersion {
  return value === currentPrivacyNotice.version
}
