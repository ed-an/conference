# Plano — Phase 06: Add routing

## 1. Dependência e contrato de rotas

1.1. Instalar `react-router-dom` com npm e registrar a resolução no `package-lock.json`.

1.2. Criar uma definição central e tipada para os caminhos conhecidos, seus rótulos em pt-BR e seu uso na navegação.

1.3. Representar `/`, `/location`, `/hotels`, `/food`, `/code-of-conduct`, `/speakers` e `/schedule` sem duplicar strings entre os consumidores.

1.4. Separar os destinos da navegação principal dos links úteis sem criar uma segunda fonte de verdade.

## 2. Composição do router

2.1. Adicionar o provider do React Router no ponto de entrada apropriado da aplicação.

2.2. Definir uma rota para cada caminho conhecido e compô-las dentro do shell compartilhado.

2.3. Garantir que o shell permaneça persistente entre páginas e contenha exatamente um landmark `main`.

2.4. Não definir rota curinga, redirecionamento ou página de erro nesta fase.

## 3. Páginas e placeholders

3.1. Converter o conteúdo inicial existente em conteúdo da rota `/`, removendo sua dependência das antigas âncoras de seção.

3.2. Criar páginas placeholder por conceito para localização, hospedagem, alimentação, código de conduta, palestrantes e programação.

3.3. Fornecer a cada placeholder um título principal único e texto curto em pt-BR que descreva honestamente o conteúdo futuro.

3.4. Reutilizar o acabamento visual e os tokens existentes, sem simular dados ou funcionalidades ainda não entregues.

## 4. Integração da navegação

4.1. Substituir os links internos baseados em fragmentos por componentes de link do router.

4.2. Ligar a marca e “Início” a `/`, “Palestrantes” a `/speakers` e “Programação” a `/schedule`.

4.3. Expor as demais rotas conhecidas nos links úteis do shell conforme o contrato central.

4.4. Aplicar estado ativo visual e `aria-current="page"` por correspondência da URL, inclusive garantindo que `/` não fique ativo por correspondência parcial em outras páginas.

4.5. Preservar o fechamento do menu móvel após a navegação e os comportamentos existentes de teclado e `Escape`.

4.6. Manter o link de salto apontando para o conteúdo principal e verificar foco visível após cada navegação.

## 5. Testes automatizados

5.1. Atualizar os testes do shell para o novo contrato de links e estado ativo.

5.2. Adicionar testes que assegurem a lista exata de caminhos, a unicidade dos caminhos e a separação entre navegação principal e links úteis.

5.3. Verificar que todas as rotas conhecidas estão associadas ao conteúdo ou placeholder correto e que nenhuma rota curinga foi antecipada.

5.4. Confirmar que `react-router-dom` é a única dependência nova e que os testes permanecem executáveis pela infraestrutura existente.

## 6. Verificação e acabamento

6.1. Executar `npm test`, `npm run lint` e `npm run build`, corrigindo regressões.

6.2. Abrir diretamente e atualizar cada rota no servidor de desenvolvimento e na pré-visualização local.

6.3. Percorrer todos os links com ponteiro e teclado em larguras mobile, tablet e desktop.

6.4. Confirmar que rótulos, placeholders, estado ativo, landmarks e foco atendem a `requirements.md` e `validation.md`.
