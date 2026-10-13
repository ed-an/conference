# Plano — Phase 05: Add the application shell

## 1. Estrutura semântica compartilhada

1.1. Mapear o ponto de composição atual da aplicação e preservar os padrões existentes.

1.2. Criar o componente de shell com cabeçalho, único conteúdo principal e rodapé.

1.3. Adicionar um link de salto acessível para o conteúdo principal.

1.4. Garantir que o shell aceite conteúdo de página sem acoplar-se às seções futuras.

## 2. Cabeçalho e navegação desktop

2.1. Exibir o nome do evento como marca e ligação para `#inicio`.

2.2. Criar a navegação principal com “Início”, “Palestrantes” e “Programação”.

2.3. Conectar os itens às âncoras provisórias e definir contratos estáveis para futura integração com o router.

2.4. Implementar a indicação acessível da seção ativa, incluindo `aria-current="location"` e um sinal que não dependa apenas de cor.

## 3. Navegação móvel acessível

3.1. Criar o botão hambúrguer com nome acessível, estado expandido e relação explícita com o menu.

3.2. Implementar abertura e fechamento por ponteiro e teclado usando React e APIs nativas.

3.3. Fechar o menu após a ativação de um item e garantir uma ordem de foco previsível.

3.4. Confirmar que o conteúdo oculto não permanece indevidamente disponível à navegação por teclado ou tecnologia assistiva.

## 4. Rodapé e conteúdo utilitário

4.1. Criar o rodapé semântico com nome do evento e copyright.

4.2. Organizar os links úteis em uma lista com rótulos claros.

4.3. Evitar links fictícios; representar destinos ainda não disponíveis de forma honesta até suas fases correspondentes.

## 5. Layout e acabamento visual

5.1. Aplicar fundo branco, texto azul-escuro e destaques roxos por meio dos tokens existentes.

5.2. Construir o layout responsivo em grid, com espaços amplos e tipografia destacada.

5.3. Definir a transição entre navegação desktop e móvel sem quebra entre 320 px e telas amplas.

5.4. Preservar contraste AA, foco visível e preferências de movimento reduzido.

## 6. Integração e verificação

6.1. Integrar o shell ao ponto de entrada atual sem implementar roteamento ou conteúdo das fases posteriores.

6.2. Adicionar ou atualizar testes de comportamento para landmarks, links, estado ativo e menu móvel, usando apenas a infraestrutura aprovada para esta fase.

6.3. Executar testes, lint e build e corrigir qualquer regressão.

6.4. Realizar a validação manual responsiva, por teclado e com tecnologia assistiva conforme `validation.md`.
