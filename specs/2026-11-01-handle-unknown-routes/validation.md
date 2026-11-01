# Validação — Fase 07: Tratar rotas desconhecidas

## Validação automatizada

Executar os gates existentes:

```sh
npm test
npm run lint
npm run build
```

Os testes da fase devem comprovar:

- renderização da página 404 para mais de uma URL desconhecida, incluindo um caminho aninhado;
- presença de um título principal que informa que a página não foi encontrada;
- presença de orientação curta e de uma ação explícita para voltar ao início;
- destino `/` obtido do contrato central de rotas e navegação interna com React Router;
- preservação da renderização de todas as rotas conhecidas;
- ausência da rota curinga em `appRoutes`, na navegação principal e nos links úteis;
- ausência de novas dependências no `package.json`.

## Validação manual

### Correspondência e recuperação

1. Iniciar o servidor de desenvolvimento e abrir diretamente uma URL inexistente, como `/pagina-inexistente`.
2. Confirmar que o shell e a página 404 aparecem, sem tela vazia e sem redirecionamento.
3. Confirmar que `/pagina-inexistente` permanece visível na barra de endereço.
4. Repetir com um caminho aninhado, como `/pagina/inexistente`, e com caracteres válidos de URL.
5. Acionar “Voltar ao início” e confirmar que a aplicação navega para `/` sem recarregar o documento inteiro.
6. Usar o botão voltar do navegador e confirmar que a URL desconhecida e a página 404 reaparecem de forma coerente.
7. Abrir e atualizar cada rota conhecida para confirmar que nenhuma delas é interceptada pelo fallback.
8. Repetir os passos essenciais na pré-visualização local do build; a configuração de fallback do host de produção permanece fora desta fase.

### Acessibilidade e navegação

1. Confirmar que a página contém um único `h1` descritivo dentro do único landmark `main` do shell.
2. Usar o link de salto e verificar que o foco alcança o conteúdo principal da página 404.
3. Percorrer cabeçalho, ação principal e rodapé usando somente `Tab`, `Shift+Tab` e `Enter`.
4. Confirmar que a ação possui foco visível e pode ser identificada sem depender apenas de cor.
5. Verificar que cabeçalho, menu móvel e links do rodapé continuam funcionais na página 404.
6. Confirmar ordem de foco lógica e ausência de armadilhas de teclado.

### Responsividade e resiliência

1. Verificar a página a 320 px, em largura de tablet e em desktop amplo.
2. Confirmar que título, orientação e ação não se sobrepõem, não são cortados e não geram rolagem horizontal indesejada.
3. Testar textos ampliados no navegador e confirmar que a ação permanece visível e utilizável.
4. Confirmar que a experiência continua completa sem imagens, mídia opcional ou dados remotos.

## Verificação de tom

- Todo o conteúdo visível está em português brasileiro.
- A mensagem é amigável, clara e direta, sem culpar o visitante.
- O texto explica o problema em linguagem comum; “404” funciona apenas como informação complementar.
- A orientação e a ação são curtas, inequívocas e não prometem conteúdo inexistente.
- A página segue o visual atual sem decoração que concorra com a recuperação da navegação.

## Definição de pronto

- Todo caminho desconhecido renderiza uma página 404 útil dentro do shell compartilhado.
- A URL desconhecida permanece inalterada até que o visitante escolha navegar.
- A página apresenta mensagem, orientação e uma única ação principal para retornar ao início.
- A ação navega para `/` pelo React Router, sem recarga completa do documento.
- Rotas conhecidas, menus, rodapé, link de salto, histórico e navegação por teclado continuam funcionando.
- O layout é legível e utilizável desde 320 px até telas amplas, sem overflow horizontal.
- Nenhuma nova dependência ou configuração de hospedagem foi adicionada.
- `npm test`, `npm run lint` e `npm run build` passam sem erros.
- A revisão manual não encontra links quebrados, conteúdo ambíguo ou regressões de acessibilidade e responsividade.
- A branch está pronta para revisão e integração como uma entrega independente.

