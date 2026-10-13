# Validação — Phase 05: Add the application shell

## Validação automatizada

Executar os gates existentes:

```sh
npm test
npm run lint
npm run build
```

Os testes da funcionalidade devem comprovar, no nível mais próximo do comportamento do usuário que a infraestrutura atual permitir:

- existência de um cabeçalho, uma navegação principal nomeada, exatamente um `main` e um rodapé;
- presença do link de salto e destino válido no conteúdo principal;
- rótulos em pt-BR e destinos `#inicio`, `#palestrantes` e `#programacao`;
- controle móvel com nome acessível, `aria-expanded` sincronizado e associação ao menu;
- abertura e fechamento do menu móvel, inclusive após a ativação de um item;
- indicação da seção ativa com `aria-current="location"`;
- ausência de novas dependências no manifesto do projeto.

## Validação manual

### Responsividade

1. Verificar o shell em larguras de 320 px, tablet e desktop amplo.
2. Confirmar que marca, controles e links não se sobrepõem nem causam rolagem horizontal.
3. Confirmar navegação horizontal no desktop e menu hambúrguer funcional no mobile.
4. Redimensionar a janela com o menu aberto e verificar que o estado permanece coerente.

### Teclado e acessibilidade

1. Navegar por toda a interface usando apenas `Tab`, `Shift+Tab`, `Enter`, `Space` e, quando aplicável, `Escape`.
2. Confirmar que o link de salto aparece ao receber foco e move o foco/contexto para `main`.
3. Verificar ordem de foco lógica, foco sempre visível e ausência de armadilhas de teclado.
4. Confirmar que o menu fechado não oferece seus links móveis ocultos à tabulação.
5. Inspecionar landmarks, nomes acessíveis, hierarquia de títulos e atributos ARIA com as ferramentas do navegador.
6. Conferir contraste de texto, controles, foco e estado ativo segundo WCAG 2.2 AA.
7. Ativar preferência de movimento reduzido e confirmar que nenhuma transição essencial depende de animação.

### Comportamento e conteúdo

1. Ativar cada item da navegação e confirmar que a seção correspondente recebe a URL fragmentada correta.
2. Confirmar que a indicação ativa é perceptível sem depender apenas da cor.
3. Verificar que os links úteis do rodapé têm rótulos claros e não apontam para destinos fictícios.
4. Confirmar que cabeçalho, conteúdo principal e rodapé continuam compreensíveis sem imagens.

## Verificação de tom e fidelidade visual

- Todo conteúdo visível está em português brasileiro.
- Os rótulos são curtos, modernos e profissionais.
- A composição segue fundo branco, textos azul-escuro e destaques roxos por meio dos tokens existentes.
- O layout preserva simplicidade, espaços amplos, tipografia destacada e organização em grid.
- Elementos decorativos não competem com as informações essenciais nem com a navegação.

## Definição de pronto

- Todos os itens incluídos em `requirements.md` estão implementados e os itens fora de escopo não foram antecipados.
- Não foram adicionadas dependências nem uma solução de roteamento.
- Os testes relevantes e os comandos `npm test`, `npm run lint` e `npm run build` passam.
- O shell funciona a partir de 320 px e nas versões evergreen definidas em `tech-stack.md`.
- A navegação é operável por teclado e atende aos critérios aplicáveis de WCAG 2.2 AA.
- A revisão manual não encontra links enganosos, overflow horizontal, foco perdido ou conteúdo móvel oculto ainda focável.
- A branch está pronta para revisão e integração sem depender de trabalho de fases posteriores.
