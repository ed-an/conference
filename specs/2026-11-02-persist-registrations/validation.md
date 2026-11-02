# Validação da Fase 09 — Persistir inscrições

## Validação automatizada

- Executar todos os comandos de teste configurados para frontend e backend e confirmar que passam.
- Executar `npm run test:integration` com `TEST_DATABASE_URL` apontando para um banco PostgreSQL exclusivo de testes.
- Executar `npm run lint` com sucesso em todos os pacotes aplicáveis.
- Executar `npm run build` com sucesso em todos os pacotes aplicáveis.
- Aplicar as migrações Prisma em um banco de teste limpo e confirmar que o esquema é criado sem intervenção manual.
- Verificar por testes que:
  - uma inscrição válida cria ou reutiliza a pessoa e associa corretamente o evento;
  - nome, e-mail, telefone, evento e consentimento inválidos são rejeitados pelo servidor;
  - e-mails equivalentes após normalização não geram duas inscrições no mesmo evento;
  - requisições simultâneas não contornam a restrição de duplicidade;
  - a mesma pessoa pode se inscrever em eventos diferentes;
  - o instante e a versão do consentimento são persistidos;
  - falhas não deixam pessoas ou inscrições parcialmente gravadas;
  - endpoints administrativos rejeitam acesso não autenticado ou não autorizado;
  - a listagem administrativa retorna somente os campos definidos;
  - logs e respostas não contêm telefone, e-mail, credenciais ou detalhes internos.
- Verificar por testes de interface os estados de envio, sucesso, validação, duplicidade, falha recuperável, acesso negado e lista vazia.

## Validação manual

1. Enviar uma inscrição válida e confirmar uma única mensagem de sucesso, sem pagamento ou criação de conta.
2. Tentar enviar sem consentimento e com nome, e-mail ou telefone inválidos; confirmar que cada mensagem explica como corrigir o campo.
3. Repetir a inscrição com variações de maiúsculas e espaços no e-mail; confirmar a mensagem de duplicidade sem exposição de outros dados.
4. Simular indisponibilidade da API; confirmar que a mensagem é útil, os dados permanecem no formulário e um novo envio é possível.
5. Acionar o envio rapidamente mais de uma vez; confirmar que não são criadas inscrições repetidas.
6. Navegar pelo formulário somente com teclado e confirmar ordem, foco visível e anúncio acessível das mensagens.
7. Verificar o formulário a partir de 320 px e em larguras de tablet e desktop, sem sobreposição ou rolagem horizontal.
8. Acessar a área administrativa sem sessão, com usuário sem permissão e com administrador autorizado; confirmar os três resultados esperados.
9. Consultar um evento sem inscrições e outro com inscrições; confirmar estados claros e apenas os dados necessários.
10. Inspecionar logs do frontend, da API e do banco durante fluxos de sucesso e erro; confirmar que nenhum dado pessoal ou segredo aparece.

## Verificação de tom

- Todo texto visível está em português do Brasil e usa linguagem simples, acolhedora e profissional.
- Mensagens de erro explicam a próxima ação sem códigos, stack traces ou jargão técnico.
- A confirmação não promete ingresso, vaga paga ou qualquer benefício fora do escopo.
- O texto de consentimento explica de forma clara a finalidade do tratamento dos dados e referencia a versão vigente do aviso de privacidade.

## Definição de pronto

- O formulário persiste inscrições válidas com validação no servidor, consentimento registrado e proteção contra duplicidades.
- A consulta administrativa exige autenticação e autorização e revela somente os dados necessários.
- Dados pessoais não aparecem em logs, URLs ou mensagens de erro.
- Testes e gates de qualidade passam, e as verificações manuais de acessibilidade, responsividade e segurança foram concluídas.
- A documentação identifica a política de retenção como decisão obrigatória antes da produção.
- Pagamentos, contas de participantes e demais itens fora do escopo não foram introduzidos.
