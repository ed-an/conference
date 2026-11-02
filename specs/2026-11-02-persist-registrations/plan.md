# Plano da Fase 09 — Persistir inscrições

## 1. Estrutura do backend e configuração

1. Criar a aplicação NestJS em uma fronteira clara em relação ao frontend Vite existente.
2. Configurar variáveis de ambiente validadas para conexão com o banco, autenticação e origens permitidas.
3. Definir respostas de erro consistentes e configurar logs que excluam dados pessoais e segredos.
4. Documentar os comandos locais necessários sem versionar credenciais.

## 2. Modelo de dados e migrações

1. Configurar Prisma e PostgreSQL.
2. Modelar Pessoa, Evento e Inscrição com relações, timestamps e registro versionado de consentimento.
3. Adicionar índices e restrições para impedir uma inscrição duplicada por e-mail normalizado e evento.
4. Criar e verificar a migração inicial e uma forma segura de disponibilizar o evento atual para inscrição.

## 3. API pública de inscrição

1. Criar contratos tipados para a entrada e a resposta da inscrição.
2. Implementar normalização e validação no servidor para nome, e-mail, telefone, evento e consentimento.
3. Persistir pessoa e inscrição de forma atômica, tratando concorrência e duplicidades de maneira previsível.
4. Mapear sucesso, dados inválidos, duplicidade, evento indisponível e falha inesperada para respostas seguras.
5. Restringir origens, métodos e carga útil conforme o necessário para o frontend público.

## 4. Formulário público

1. Criar uma pequena camada de cliente da API, separada dos componentes React.
2. Conectar o formulário existente ao endpoint de inscrição e incluir o consentimento explícito.
3. Implementar estados de envio, sucesso, validação, duplicidade e indisponibilidade sem perder dados em erros recuperáveis.
4. Garantir rótulos, foco, anúncio de mensagens e navegação por teclado acessíveis.

## 5. Consulta administrativa protegida

1. Implementar autenticação e autorização exclusivas para administradores, com negação por padrão.
2. Criar endpoint protegido para listar inscrições por evento, retornando somente os campos necessários.
3. Criar a rota e a interface administrativa com estados de carregamento, vazio, erro e acesso negado.
4. Evitar que respostas, logs ou a interface exponham dados além do necessário.

## 6. Testes e verificação

1. Testar validação, normalização, consentimento, persistência atômica e proteção contra duplicidades, incluindo requisições concorrentes.
2. Testar autorização administrativa e confirmar que usuários não autorizados não acessam inscrições.
3. Testar os estados visíveis do formulário e do painel administrativo pelo comportamento do usuário.
4. Executar testes, lint, build e as verificações manuais de `validation.md`.
5. Registrar a política de retenção como bloqueio explícito para produção, sem bloquear a conclusão técnica da fase em ambiente local.
