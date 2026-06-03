# Ouro Gold 18K — Design System do Painel Administrativo

Sistema de design do **back-office** da Ouro Gold 18K. É a **contraparte funcional** do design system da vitrine (`/README.md`): mesma marca, mesma alma (tinta espresso, acento ouro 18K), mas adaptada para uma **ferramenta densa e orientada a dados** — gestão de catálogo, pedidos, estoque, fiscal, clientes, financeiro e conteúdo.

> **Relação com a vitrine:** a vitrine é editorial, arejada e serifada (vender emoção). O admin é **sans, denso e eficiente** (operar com clareza). Os dois compartilham a paleta de marca e o ouro como acento, então parecem da mesma casa.

---

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `admin.css` | **Fonte da verdade** de tokens: cores (tema **claro + escuro**), tipografia, espaçamento, raios, sombras, base |
| `admin-components.css` | Componentes: shell (sidebar/topbar), botões, tabelas, status pills, stat cards, forms, tabs, chips, drawer, modal, paginação |
| `admin-screens.css` | Estilos específicos de tela (login, timeline, settings, alerts, media uploader) |
| `Icon.jsx` | Icon set em linha (`AdIcon`) |
| `charts.jsx` | Gráficos no estilo da marca (linha/área, donut, barras) — SVG puro, theme-aware |
| `components.jsx` | Shell + átomos React compartilhados |
| `data.js` | Dados de exemplo (pedidos, produtos, clientes, NF-e, estoque, KPIs…) |
| `*.jsx` (telas) | Login, Dashboard, Orders, Products, Inventory, Promotions, Customers, Invoices, Storefront, Finance, Settings |
| `index.html` | Protótipo navegável completo |

---

## CONTENT FUNDAMENTALS (voz no admin)

- **Idioma:** Português do Brasil. **Tom:** direto, claro, operacional — sem floreio. O admin informa e confirma; não vende.
- **Microcopy de ação:** verbos no infinitivo — "Emitir NF-e", "Gerar etiqueta", "Adicionar crédito", "Exportar planilha".
- **Rótulos:** curtos e concretos. Cabeçalhos de tabela em CAIXA ALTA com tracking leve. Eyebrows para seções internas.
- **Números são protagonistas:** sempre tabulares (`.ad-num`), formato BR (`R$ 184.230`, `2,8%`, `+12,4%`). IDs em mono-espaço visual (ex.: `OG-48213`).
- **Status é cor + texto** (nunca só cor): use as *status pills* com rótulo. Evite vermelho/verde como única informação.
- **Sem emoji.** Ícones de linha fina (`AdIcon`) comunicam ação/estado.

---

## VISUAL FOUNDATIONS

**Estrutura.** Sidebar fixa **espresso** (sempre escura, nos dois temas) com navegação agrupada (Operação · Catálogo · Loja) → topbar (breadcrumb, busca global, tema, notificações, avatar) → área de trabalho clara. Largura de conteúdo até 1500px.

**Temas.** **Claro e escuro**, alternáveis (persistido em `localStorage`, atributo `data-theme` no `<html>`). Ambos são quentes — o claro usa canvas champanhe e cards brancos; o escuro usa marrons profundos (nunca cinza-azulado frio). O ouro clareia no escuro (`#C9A24B`) para manter contraste.

**Cor.** Superfícies neutras quentes carregam a informação; o **ouro é acento** (KPIs, item de menu ativo, foco, gráficos, links de ação) — nunca preenchimento de fundo. Semânticas dessaturadas e com tinte de fundo: `success` (sage), `warn` (âmbar), `error` (terracota), `info` (azul-acinzentado), além de `gold` e `neutral` para status.

**Tipografia.** **Mulish** (sans) em 100% da UI — densidade e legibilidade. Pesos 400–800. Numéricos tabulares para alinhar colunas. A serifa Cormorant aparece **só** no wordmark do login (toque de marca). Sem serif em dados.

**Densidade.** Confortável: linha de tabela ~46px, inputs 40px, botões 38px, respiro de seção 20–28px. Suficiente para escanear muitos registros sem cansar.

**Cantos & sombras.** Raios suaves (5–12px) — mais amigáveis que a vitrine angular, porque é uso prolongado. Sombras quentes e contidas; a **hairline** (`--ad-line`) é o separador padrão. Elevação só em drawer/modal/menu.

**Componentes-chave.** Stat card (KPI com ícone + tendência), tabela de dados (cabeçalho em surface-2, hover de linha, células numéricas à direita), status pill (ponto + rótulo), drawer lateral (detalhe de pedido/produto/cliente), modal (cupom), tabs, chips de filtro, segmented control, switch, toggle, paginação, timeline (histórico).

**Gráficos.** Desenhados no estilo da marca (ouro + tons espresso), SVG puro e theme-aware: linha/área para receita, donut para distribuição, barras para rankings. Sem bibliotecas externas.

**Movimento.** Discreto e **sempre seguro para captura/impressão**: entradas animam apenas `transform` (nunca a partir de `opacity:0` com `forwards`, que sumiria em abas inativas). Drawer desliza no eixo X; modal faz leve *scale*. Tudo respeita `prefers-reduced-motion`.

**Estados.** Foco com anel ouro de 3px (`--ad-ring`). Linha ativa de menu com barra dourada à esquerda. Hover de linha em surface-2. Pressionado com `translateY(1px)`.

---

## ICONOGRAPHY

- Set próprio em **`Icon.jsx`** (`AdIcon`), geometria estilo Lucide, **traço 1.75**, só linha, herdando `currentColor`. Tamanho base 18px (16–22 conforme contexto).
- Cobre o vocabulário de back-office: dashboard, sacola, gema, caixa, etiqueta, usuários, nota fiscal, layout, engrenagem, gráfico, carteira, caminhão, escudo, alertas, etc.
- **Sem emoji, sem ícones coloridos/3D.** O monograma **OG** (serifa) marca o login e a sidebar.

---

## Como usar

1. Linke os três CSS: `admin.css` → `admin-components.css` → `admin-screens.css`.
2. Use os tokens `var(--ad-*)` e as classes `.ad-*`. Para temas, defina `data-theme="light|dark"` no `<html>`.
3. Para novas telas, **copie e bifurque** uma tela existente em `admin/` — todas reutilizam o shell (`Sidebar`, `Topbar`), os átomos (`Btn`, `Pill`, `Stat`, `Field`, `Drawer`, `Modal`, `PageHead`, `Pager`) e o icon set.
4. Dados reais entram no lugar de `data.js`.

> Para compartilhar com a equipe, defina o tipo do arquivo como **Design System** no menu *Share*.
