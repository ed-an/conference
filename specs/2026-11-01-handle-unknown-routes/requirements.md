# Fase 07 — Tratar rotas desconhecidas

## Objetivo

Oferecer uma saída clara e útil quando um visitante acessar uma URL que não corresponde a nenhuma página conhecida. A experiência deve preservar a URL digitada, explicar o ocorrido em português brasileiro e permitir o retorno à página inicial sem sair do fluxo da aplicação.

## Escopo

### Incluído

- Uma rota curinga do React Router, avaliada somente quando nenhuma rota conhecida corresponder à URL atual.
- Uma página de “não encontrado” renderizada dentro do shell compartilhado da aplicação.
- Mensagem curta informando que a página solicitada não foi encontrada.
- Orientação amigável para o visitante continuar a navegação.
- Botão ou link de ação claramente identificado para retornar à página inicial.
- Preservação da URL desconhecida na barra do navegador, sem redirecionamento automático.
- Estilos responsivos que reutilizam os tokens e padrões visuais existentes.
- Cobertura automatizada para o comportamento da rota curinga e para a ação de retorno.

### Conteúdo visível

| Elemento | Requisito |
| --- | --- |
| Identificador | Pode apresentar “Erro 404” como informação secundária e compreensível. |
| Título | Deve comunicar claramente que a página não foi encontrada. |
| Orientação | Deve explicar, em uma frase curta, que o endereço pode estar incorreto ou que a página pode não existir. |
| Ação principal | Deve levar à rota `/` usando navegação interna do React Router e ter rótulo explícito, como “Voltar ao início”. |

O texto final pode ser refinado durante a implementação, desde que permaneça curto, amigável, claro e coerente com esses requisitos.

### Fora do escopo

- Redirecionar automaticamente o visitante para `/` ou substituir a URL desconhecida.
- Exibir a URL inválida como parte da mensagem da página.
- Campo de busca, sugestões dinâmicas, histórico, telemetria ou registro de erros.
- Lista adicional de páginas ou ações além do retorno à página inicial.
- Alterações no conteúdo, nos modelos ou nos dados locais existentes.
- Configuração de fallback específica do ambiente de produção; ela pertence à Fase 37.
- Novas dependências de aplicação, teste ou estilo.
- Páginas de erro para falhas de rede, carregamento de conteúdo ou exceções de execução.

## Requisitos de comportamento

| Área | Requisito |
| --- | --- |
| Correspondência | Todas as rotas conhecidas continuam renderizando suas páginas atuais; apenas URLs sem correspondência exibem a página 404. |
| URL | A URL desconhecida permanece visível enquanto a página 404 está aberta. |
| Shell | Cabeçalho, navegação, landmark `main`, link de salto e rodapé permanecem disponíveis. |
| Hierarquia | A página possui um único `h1` claro dentro do conteúdo principal. |
| Retorno | A ação principal usa o React Router para navegar até `/`, sem recarregar todo o documento. |
| Acessibilidade | A ação é alcançável e acionável por teclado, possui foco visível e não depende somente de cor para ser reconhecida. |
| Responsividade | Conteúdo e ação funcionam sem corte ou rolagem horizontal desde 320 px até telas amplas. |
| Resiliência | A página não depende de mídia, dados remotos ou JavaScript adicional além da infraestrutura atual de roteamento. |

## Decisões

1. **Página minimalista:** incluir somente a mensagem, a orientação e a ação de retorno solicitadas, evitando navegação paralela ou conteúdo especulativo.
2. **Integração ao shell:** renderizar a página 404 no mesmo layout das demais rotas para manter navegação, contexto visual e acesso aos destinos existentes.
3. **Rota curinga ao final:** declarar uma correspondência curinga depois das rotas conhecidas, sem acrescentá-la ao contrato de destinos navegáveis ou aos menus.
4. **URL preservada:** não redirecionar automaticamente. Isso mantém o contexto do erro, permite correção manual e evita esconder links quebrados.
5. **Retorno com `Link`:** usar a rota inicial centralizada e um link do React Router para preservar a navegação no cliente.
6. **Sem novas dependências:** React Router, TypeScript e CSS existentes atendem integralmente à necessidade.

## Contexto de produto e arquitetura

- A missão prioriza informação clara, navegação consistente, acessibilidade e resiliência; a página 404 deve ser uma recuperação simples, não um destino de conteúdo.
- A cópia deve usar português brasileiro, com tom amigável e claro, sem humor que dificulte a compreensão.
- O visual deve seguir o shell, os tokens e o acabamento das páginas atuais, com complexidade decorativa mínima.
- A página deve ficar organizada por conceito de produto, separada da infraestrutura que compõe as rotas.
- Usar HTML semântico antes de ARIA, componentes funcionais, TypeScript estrito e CSS puro.
- O contrato tipado de rotas conhecidas continua sendo a fonte de verdade para destinos navegáveis; a rota curinga é comportamento de fallback e não um item de navegação.

