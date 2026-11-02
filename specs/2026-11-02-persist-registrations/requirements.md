# Fase 09 — Persistir inscrições

## Escopo

Conectar o formulário de inscrição existente a um backend que valide e armazene inscrições com segurança. A entrega inclui uma visualização administrativa protegida e limitada à consulta das inscrições.

### Dados

| Entidade | Campos principais | Regras |
| --- | --- | --- |
| Pessoa | `id`, `nome`, `email`, `telefone` | Nome, e-mail e telefone são obrigatórios; o e-mail deve ser normalizado antes da comparação. |
| Evento | `id`, `nome`, `ano` | Nome e ano são obrigatórios; o evento deve existir e estar disponível para inscrição. |
| Inscrição | `id`, `pessoaId`, `eventoId`, `consentimentoEm`, `versaoDoAviso`, `criadaEm` | Relaciona uma pessoa a um evento e registra quando e sob qual aviso de privacidade o consentimento foi dado. |

A combinação de pessoa e evento deve ser única. Para esta fase, inscrições repetidas são identificadas pelo e-mail normalizado no mesmo evento, mesmo que nome ou telefone sejam informados de outra forma.

### Comportamento público

- Enviar nome, e-mail, telefone, evento e consentimento ao backend.
- Validar os dados no cliente para resposta imediata e novamente no servidor como fonte de verdade.
- Exigir consentimento explícito com o aviso de privacidade antes do envio; a opção não pode vir pré-selecionada.
- Exibir estado de envio, confirmação clara de sucesso e erros acionáveis em português do Brasil.
- Em caso de duplicidade, informar que já existe uma inscrição para aquele e-mail e evento sem revelar outros dados pessoais.
- Preservar os dados digitados quando um erro recuperável ocorrer e impedir envios repetidos enquanto uma requisição estiver em andamento.

### Comportamento administrativo

- Disponibilizar uma área administrativa autenticada e autorizada para consultar as inscrições por evento.
- Exibir somente os campos necessários: nome, e-mail, telefone, evento, data da inscrição e registro de consentimento.
- Negar acesso por padrão a usuários sem autorização.
- Não incluir criação de contas de participantes; a autenticação existe apenas para administradores.

### Fora do escopo

- Venda de ingressos, preços, estoque e pagamentos.
- Conta, login ou perfil para participantes.
- Edição e cancelamento de inscrições pelo participante.
- Disparos de e-mail, campanhas, exportação em massa e integrações de marketing.
- Definição definitiva do prazo de retenção dos dados; essa decisão deve ser tomada antes da entrada em produção.

## Decisões

- Manter React e TypeScript no frontend para o formulário e a área administrativa.
- Criar um backend NestJS com TypeScript para validação, cadastros, inscrições, autenticação e autorização administrativa.
- Usar Prisma como camada de acesso e migração do banco PostgreSQL.
- Modelar Pessoa, Evento e Inscrição separadamente para evitar duplicação de dados e representar a participação por evento.
- Aplicar uma restrição única no banco, além da verificação da aplicação, para impedir duplicidades mesmo sob requisições simultâneas.
- Tratar validação do servidor e restrições do banco como controles obrigatórios; a validação do navegador é apenas complementar.
- Guardar o instante e a versão do aviso aceito, mas nunca registrar o conteúdo dos campos pessoais em logs.
- Retornar respostas de erro que sejam úteis ao visitante sem expor detalhes internos, existência de outros cadastros ou informações sensíveis.
- A escolha explícita de NestJS, Prisma e PostgreSQL aprova as dependências necessárias para esta fase; qualquer dependência adicional exige aprovação.

## Contexto

Todo texto voltado ao usuário deve ser simples, acolhedor e profissional, em português do Brasil. Mensagens de erro devem dizer o que aconteceu e como corrigir, sem códigos ou termos técnicos.

A implementação deve coletar apenas os dados especificados, seguir os princípios da LGPD e manter dados pessoais fora de logs, telemetria, URLs e mensagens de erro. Segredos e credenciais devem vir de variáveis de ambiente e nunca ser versionados.

O frontend deve preservar React, TypeScript, Vite, React Router e CSS puro, bem como os padrões visuais, responsivos e de acessibilidade existentes. A API deve formar uma fronteira clara, sem acoplar componentes React diretamente ao Prisma ou ao PostgreSQL.

O prazo de retenção e o processo de exclusão continuam em aberto. A aplicação pode ser desenvolvida e validada localmente, mas não deve ser considerada pronta para produção até essa política ser definida e refletida no aviso de privacidade e na operação administrativa.
