# Validação — Phase 06: Add routing

## Validação automatizada

Executar os gates existentes:

```sh
npm test
npm run lint
npm run build
```

Os testes da fase devem comprovar:

- existência exata e unicidade dos caminhos `/`, `/location`, `/hotels`, `/food`, `/code-of-conduct`, `/speakers` e `/schedule`;
- centralização dos caminhos e metadados consumidos pelo router e pela navegação;
- separação explícita entre itens da navegação principal e links úteis;
- associação de cada rota conhecida à página ou placeholder correspondente;
- uso de links do React Router para navegação interna, sem as antigas âncoras de seção;
- estado ativo com `aria-current="page"` e correspondência exata da rota inicial;
- preservação do fechamento do menu móvel após a seleção de um destino;
- ausência de rota curinga ou página de “não encontrado” nesta fase;
- inclusão de `react-router-dom` como única dependência nova.

## Validação manual

### Rotas e links diretos

1. Iniciar o servidor de desenvolvimento e abrir diretamente cada caminho conhecido em uma nova aba.
2. Atualizar o navegador em cada caminho e confirmar que a página correspondente permanece visível.
3. Repetir a verificação com a pré-visualização local do build.
4. Navegar entre todas as páginas pelos links internos e confirmar que o documento não sofre recarga completa.
5. Usar os botões voltar e avançar do navegador e confirmar que URL, conteúdo e estado ativo permanecem sincronizados.
6. Confirmar apenas que uma URL desconhecida não recebeu tratamento antecipado; a experiência de 404 será validada na Phase 07.

### Navegação e acessibilidade

1. Confirmar que a marca e “Início” levam a `/`, “Palestrantes” a `/speakers` e “Programação” a `/schedule`.
2. Confirmar que cada rota adicional pode ser alcançada pelos links úteis do shell.
3. Verificar que somente o link da página atual apresenta o sinal visual ativo e `aria-current="page"`.
4. Verificar que o estado ativo continua perceptível sem depender apenas de cor.
5. Percorrer marca, menu e links usando somente `Tab`, `Shift+Tab`, `Enter`, `Space` e `Escape` quando aplicável.
6. Confirmar que o menu móvel fecha após a seleção, mantém `aria-expanded` correto e não cria armadilhas de foco.
7. Acionar o link de salto em cada página e confirmar que ele alcança o único `main`.
8. Inspecionar landmarks e hierarquia de títulos: cada página tem exatamente um título principal descritivo dentro do shell.

### Responsividade e resiliência

1. Verificar todas as rotas a 320 px, em largura de tablet e em desktop amplo.
2. Confirmar ausência de sobreposição, corte de rótulos e rolagem horizontal indesejada.
3. Redimensionar com o menu aberto e confirmar que o estado permanece coerente.
4. Confirmar que todas as páginas permanecem compreensíveis sem imagens ou mídia opcional.

## Verificação de tom

- Caminhos de URL estão em inglês e usam kebab-case quando possuem mais de uma palavra.
- Rótulos e conteúdo visível estão em português brasileiro.
- Cada placeholder é curto, claro e honesto, sem prometer uma data nem fingir conteúdo disponível.
- A cópia preserva o tom moderno, profissional e direto estabelecido pelo site.

## Definição de pronto

- Todos os itens incluídos em `requirements.md` foram implementados e os itens fora de escopo não foram antecipados.
- Todas as sete rotas conhecidas abrem diretamente, atualizam e navegam corretamente nos ambientes locais previstos.
- Router, shell e navegação consomem uma fonte central e tipada de caminhos.
- O link ativo é visualmente claro, expõe `aria-current="page"` e acompanha voltar/avançar do navegador.
- Menu móvel, link de salto, landmarks, foco visível e navegação por teclado continuam funcionais.
- `react-router-dom` é a única dependência nova.
- `npm test`, `npm run lint` e `npm run build` passam sem erros.
- A revisão manual não encontra recargas completas, links quebrados, conteúdo enganoso, overflow horizontal ou regressões de acessibilidade.
- A branch está pronta para revisão e integração sem depender da Phase 07 ou das implementações finais das páginas.
