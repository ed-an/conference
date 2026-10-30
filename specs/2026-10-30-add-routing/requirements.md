# Phase 06 — Add routing

## Objetivo

Transformar o site de página única em uma aplicação com roteamento no cliente, permitindo que visitantes acessem diretamente as áreas previstas do evento por URLs estáveis. Esta fase estabelece a infraestrutura e placeholders das páginas futuras sem antecipar seu conteúdo final nem o tratamento de rotas desconhecidas da Phase 07.

## Escopo

### Incluído

- Instalação de `react-router-dom` como única nova dependência.
- Configuração do router no ponto de composição da aplicação.
- Definição centralizada dos caminhos, rótulos e demais metadados de navegação.
- Rota inicial em `/` e rotas para todas as páginas públicas previstas no escopo inicial.
- Página placeholder acessível para cada conteúdo que será implementado em fases posteriores.
- Substituição das âncoras do shell por links do router, sem recarregar o documento.
- Indicação visual e programática da rota ativa na navegação principal.
- Fechamento do menu móvel quando um destino é selecionado.
- Suporte a abertura direta e atualização das rotas conhecidas no ambiente Vite.
- Testes do contrato de rotas e da integração da navegação.

### Rotas

| Caminho | Página | Estado nesta fase |
| --- | --- | --- |
| `/` | Início | Reutiliza o conteúdo inicial existente como conteúdo da rota. |
| `/location` | Localização | Placeholder até a Phase 10. |
| `/hotels` | Hospedagem | Placeholder até a Phase 11. |
| `/food` | Alimentação | Placeholder até a Phase 12. |
| `/code-of-conduct` | Código de conduta | Placeholder até a Phase 13. |
| `/speakers` | Palestrantes | Placeholder até as Phases 15–16. |
| `/schedule` | Programação | Placeholder até as Phases 17–19. |

Os caminhos são escritos em inglês; os rótulos e o conteúdo visível permanecem em português brasileiro.

### Fora do escopo

- Rota curinga, página de “não encontrado” ou redirecionamento de URLs desconhecidas; pertencem à Phase 07.
- Conteúdo definitivo, carregamento de dados ou interações específicas das páginas futuras.
- Parâmetros de rota, rotas aninhadas, rotas protegidas ou navegação programática de produto.
- Configuração de fallback em uma plataforma de hospedagem; será concluída na Phase 37.
- Alteração dos modelos ou dados locais existentes.
- Bibliotecas adicionais de estado, estilos ou testes.

## Requisitos de comportamento

| Área | Requisito |
| --- | --- |
| Contrato de rotas | Caminhos e metadados compartilhados devem ter uma única fonte tipada, sem strings de URL duplicadas entre router e navegação. |
| Navegação | Marca, navegação principal e links úteis devem usar links do React Router para destinos internos. |
| Estado ativo | O destino correspondente à URL atual deve ser distinguível sem depender apenas de cor e expor `aria-current="page"`. |
| Menu móvel | A seleção de qualquer destino fecha o menu; o controle continua acessível por teclado e mantém `aria-expanded` sincronizado. |
| Página inicial | O conteúdo existente deixa de depender das âncoras `#inicio`, `#palestrantes` e `#programacao`; cada conceito passa a ter seu próprio destino. |
| Placeholders | Cada página futura tem um `h1` descritivo e uma mensagem curta e honesta de que o conteúdo será disponibilizado posteriormente. |
| Link direto | Abrir ou atualizar qualquer rota conhecida deve renderizar a página correspondente no servidor de desenvolvimento e na pré-visualização local. |
| Foco e landmarks | O shell mantém um único `main`, link de salto funcional, ordem de foco lógica e foco visível. |

## Decisões

1. **React Router:** usar `react-router-dom`, solução consolidada para React que cobre links diretos, correspondência de rotas e estado ativo sem implementar um router local.
2. **Caminhos centralizados:** manter um contrato tipado de rotas com caminho, rótulo e informação necessária à navegação. O router e o shell consomem esse mesmo contrato.
3. **Placeholders para o escopo inicial:** criar destinos para todas as páginas públicas já previstas, tornando a arquitetura navegável antes da entrega do conteúdo de cada fase.
4. **Navegação principal focada:** preservar na navegação principal os destinos já estabelecidos — Início, Palestrantes e Programação — agora ligados a `/`, `/speakers` e `/schedule`. As demais rotas podem ser alcançadas pelos links úteis do shell até a revisão de navegação da Phase 14.
5. **Estado ativo nativo do router:** usar a informação de correspondência da URL para fornecer estilo ativo e `aria-current="page"`, substituindo a observação de seções e `aria-current="location"` da fase anterior.
6. **Sem 404 nesta fase:** não adicionar rota curinga. O comportamento útil para caminhos desconhecidos será especificado e implementado integralmente na Phase 07.
7. **Fallback de implantação adiado:** validar links diretos no ambiente local; a configuração específica do host permanece na Phase 37, conforme o roadmap.

## Contexto de produto e arquitetura

- A missão exige que toda informação essencial seja alcançável e que o visitante saiba onde está; o estado ativo e os caminhos previsíveis servem diretamente a esses princípios.
- A solução deve continuar leve, simples e independentemente implantável.
- Componentes de layout e navegação permanecem separados dos conteúdos das páginas.
- As páginas devem ser organizadas por conceito de produto, seguindo `tech-stack.md`, e não em uma pasta genérica de componentes.
- Usar componentes funcionais, TypeScript estrito e CSS puro com os tokens existentes.
- Preservar semântica nativa, navegação por teclado, contraste e layout responsivo desde 320 px.
- Não introduzir abstrações para necessidades hipotéticas como permissões, layouts aninhados ou carregamento remoto.
