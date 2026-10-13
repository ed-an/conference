# Phase 05 — Add the application shell

## Objetivo

Criar o shell compartilhado do site da conferência, dando aos visitantes uma estrutura consistente para reconhecer o evento, navegar pelas seções principais e encontrar informações úteis. Esta fase deve permanecer independente do roteamento, previsto para a Phase 06.

## Escopo

### Incluído

- Cabeçalho compartilhado com o nome ou logo textual do evento à esquerda.
- Navegação principal à direita no desktop, com os itens “Início”, “Palestrantes” e “Programação”.
- Âncoras provisórias que apontam para seções da página atual.
- Indicação visual e programática da seção ativa.
- Menu hambúrguer acessível em telas menores.
- Elemento `main` identificável e focável como destino de um link de salto para o conteúdo.
- Rodapé compartilhado com nome do evento, copyright e links úteis.
- Layout responsivo desde 320 px até telas desktop amplas.
- Aparência baseada nos tokens existentes: fundo branco, texto azul-escuro e destaques roxos.
- Conteúdo e rótulos em português brasileiro.

### Fora do escopo

- Instalação ou configuração de biblioteca de roteamento.
- Rotas, páginas independentes, navegação entre documentos ou suporte a URLs diretas.
- Conteúdo final das seções de início, palestrantes e programação.
- Novos tokens de design, salvo um ajuste estritamente necessário e documentado.
- Dependências adicionais.
- Autenticação, venda de ingressos ou recursos personalizados.

## Estrutura e comportamento

| Elemento | Requisito |
| --- | --- |
| Link de salto | Primeiro controle focável; permanece visualmente oculto até receber foco e leva ao conteúdo principal. |
| Cabeçalho | Usa um landmark semântico e mantém marca e navegação claramente distinguíveis. |
| Marca | Exibe o nome do evento e aponta para a seção inicial. Uma imagem futura deve ter alternativa textual adequada. |
| Navegação | Usa `nav` com nome acessível e links para `#inicio`, `#palestrantes` e `#programacao`. |
| Seção ativa | Possui diferenciação que não depende apenas de cor e expõe `aria-current` quando aplicável. |
| Menu móvel | Controle do tipo botão, operável por teclado, com nome acessível, `aria-expanded` e associação ao painel controlado. |
| Conteúdo principal | Há exatamente um `main`, com `id` estável para o link de salto e espaço para o conteúdo das fases seguintes. |
| Rodapé | Exibe nome do evento, copyright e uma lista semântica de links úteis; links ainda indisponíveis não devem fingir destinos funcionais. |

## Decisões

1. **Âncoras provisórias:** a navegação usará fragmentos da página nesta fase. Isso entrega navegação funcional sem antecipar a escolha de router da Phase 06.
2. **Menu móvel local:** o comportamento será implementado com React, TypeScript e APIs nativas, sem biblioteca adicional. O menu fecha de forma previsível após a ativação de um link e mantém estado e atributos ARIA sincronizados.
3. **Estado ativo:** a seção atual será indicada com os tokens existentes, sinal visual além da cor e `aria-current="location"`. A estratégia de atualização deve ser pequena, resiliente e compatível com navegação por âncora.
4. **Componentização por conceito:** cabeçalho, navegação e rodapé ficam separados do conteúdo específico da página, seguindo a fronteira arquitetural descrita em `tech-stack.md`.
5. **Sem novos tokens por padrão:** cores, tipografia, espaçamento, raios e foco vêm de `src/styles/tokens.css`; qualquer lacuna descoberta deve ser resolvida com a menor extensão coerente possível.

## Contexto de produto e design

- A hierarquia deve priorizar conteúdo essencial e navegação consistente, conforme `mission.md`.
- A referência visual pede simplicidade, espaços amplos, tipografia destacada e organização em grid.
- A linguagem visual usa fundo branco, texto azul-escuro e roxo como destaque, sempre respeitando contraste WCAG 2.2 AA.
- O texto é moderno, profissional, claro e conciso, em pt-BR.
- Devem ser preservados foco visível, ordem lógica de tabulação, landmarks semânticos e funcionamento somente por teclado.
- Animações não são necessárias; qualquer transição adicionada deve respeitar `prefers-reduced-motion`.
- O shell deve continuar útil se mídia opcional não carregar.

## Restrições técnicas

- React com componentes funcionais e hooks, TypeScript estrito e CSS puro.
- Reutilizar as convenções e os tokens já existentes no repositório.
- Não adicionar dependências.
- Suportar versões evergreen atuais de Chrome, Edge, Firefox e Safari.
- Manter esta fase pequena, implantável e preparada para a substituição das âncoras pelo roteamento na fase seguinte.
