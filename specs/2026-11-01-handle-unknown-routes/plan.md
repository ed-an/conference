# Plano — Fase 07: Tratar rotas desconhecidas

## 1. Página de rota desconhecida

1.1. Criar um componente de página dedicado ao estado “não encontrado”, organizado pelo conceito de roteamento ou erro de navegação conforme os padrões atuais do projeto.

1.2. Adicionar um identificador 404 secundário, um `h1` claro e uma orientação curta em português brasileiro.

1.3. Adicionar uma única ação principal “Voltar ao início”, usando `Link` e o caminho inicial exportado pelo contrato central de rotas.

1.4. Garantir que a página não leia, repita ou altere a URL desconhecida.

## 2. Integração do fallback ao router

2.1. Registrar uma rota curinga em `AppRoutes` depois do mapeamento das rotas conhecidas.

2.2. Associar a rota curinga à página de “não encontrado” sem incluí-la em `appRoutes`, na navegação principal ou nos links úteis.

2.3. Confirmar que caminhos conhecidos continuam usando a tabela tipada existente e que a correspondência curinga não os intercepta.

2.4. Preservar a URL desconhecida, o histórico do navegador e o shell compartilhado, sem redirecionamento automático.

## 3. Apresentação responsiva e acessível

3.1. Reutilizar os tokens de cor, tipografia, espaçamento, raio e foco existentes.

3.2. Integrar o conteúdo ao padrão visual das páginas atuais, mantendo leitura confortável e ação principal evidente.

3.3. Verificar hierarquia semântica, contraste, foco visível e acionamento por teclado sem adicionar ARIA desnecessária.

3.4. Garantir uma composição estável desde 320 px até telas amplas e respeitar preferências de movimento existentes.

## 4. Testes automatizados

4.1. Substituir a expectativa temporária de resposta vazia para rota desconhecida por uma asserção da página 404.

4.2. Verificar que URLs desconhecidas distintas renderizam o título, a orientação e a ação de retorno.

4.3. Verificar que a ação aponta para a rota inicial centralizada e usa navegação interna.

4.4. Assegurar que a rota curinga não aparece entre os caminhos conhecidos nem nos conjuntos de navegação.

4.5. Preservar a cobertura que comprova a renderização correta de todas as rotas conhecidas.

## 5. Verificação e acabamento

5.1. Executar `npm test`, `npm run lint` e `npm run build`, corrigindo qualquer regressão.

5.2. Abrir diretamente URLs desconhecidas simples e aninhadas no servidor de desenvolvimento e na pré-visualização local.

5.3. Confirmar manualmente a preservação da URL e o retorno a `/` sem recarga completa do documento.

5.4. Revisar cópia, navegação por teclado, foco, landmarks e layout em larguras mobile, tablet e desktop.

5.5. Conferir que nenhuma dependência, funcionalidade adicional ou configuração de hospedagem foi antecipada.

