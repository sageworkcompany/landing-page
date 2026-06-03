# Ouro Gold 18K — Design System

Sistema de design para a **Ouro Gold 18K**, uma joalheria de e-commerce (em criação). A marca ainda não tinha identidade visual; este sistema estabelece a identidade do zero, com estética **minimalista, moderna e arejada**, inspirada em um meio-termo entre três referências brasileiras: o editorial contemporâneo da **Julio Okubo**, a elegância tradicional da **Monte Carlo** e o varejo premium da **Vivara**.

> **Escopo:** loja online de joias em ouro 18K, prata 925, banho de ouro e peças com gemas (diamante, pérola, etc.), incluindo coleções temáticas, presentes por ocasião e marcas parceiras. Os requisitos funcionais completos da vitrine estão resumidos em `requisitos-vitrine.md`.

---

## Índice (manifesto da pasta)

| Arquivo | O que contém |
|---|---|
| `README.md` | Este documento — contexto, fundamentos de conteúdo, visuais e iconografia |
| `colors_and_type.css` | **Fonte da verdade** de tokens: cores, tipografia, espaçamento, raios, sombras + classes utilitárias (`.og-*`) |
| `requisitos-vitrine.md` | Resumo dos requisitos funcionais do e-commerce |
| `assets/` | Logos (wordmark claro/escuro, monograma OG) |
| `preview/` | Cards do Design System (tipografia, cores, espaçamento, componentes, marca) |
| `ui_kits/website/` | UI kit do site: protótipo clicável de alta fidelidade (home, categoria, produto, carrinho/checkout, conta, coleção) |
| `SKILL.md` | Manifesto para uso como Agent Skill |

---

## Fundamentos de marca

- **Nome:** Ouro Gold 18K · **Wordmark:** `OURO GOLD` + linha fina + `FINE JEWELRY · 18K`
- **Posicionamento:** joalheria premium acessível — peças atemporais, certificadas, com serviço e curadoria.
- **Personalidade:** sofisticada, serena, confiável, contemporânea. Nada espalhafatoso.
- **O ouro 18K é o fio condutor** — usado como acento pontual (não como banho generalizado na interface).

---

## CONTENT FUNDAMENTALS (voz e copy)

- **Idioma:** Português do Brasil.
- **Pessoa:** fala com o cliente em **"você"**, de forma calorosa mas contida. A marca se refere a si como "a Ouro Gold" ou "nós", com parcimônia.
- **Tom:** elegante, claro e direto. Descreve a joia e o cuidado — evita superlativos vazios ("o melhor", "incrível"). Prefere concretude: material, peso, lapidação, ocasião.
- **Caixa:** títulos em serifa com caixa natural (Sentence case). **Eyebrows, navegação, botões e tags em CAIXA ALTA com tracking amplo** (0.16–0.22em). Nunca CAIXA ALTA em frases longas.
- **Números/preços:** formato BR — `R$ 4.290`, `até 7x sem juros`, `5% OFF à vista`. Numerais tabulares.
- **Emoji:** **não usar.** A elegância vem da tipografia e do espaço, não de emoji.
- **Microcopy:** curta e afirmativa. Ex.: "Adicionar ao carrinho", "Comprar agora", "Lista de desejos", "Frete grátis acima de R$ 800", "Garantia vitalícia", "Certificado de origem".
- **Exemplos de chamadas:**
  - Eyebrow: `NOVA COLEÇÃO` · `EDIÇÃO LIMITADA` · `FEITO À MÃO`
  - Título: *"Coleção Aurora"* · *"Joias que duram gerações"*
  - Apoio: "Peças atemporais em ouro 18K, lapidadas para acompanhar cada momento da sua história."

---

## VISUAL FOUNDATIONS

**Paleta.** Superfícies quentes e claras — `--paper` (#FCFAF6) como base, `--champagne` (#F4EEE3) para bandas de seção, `--sand` (#E9DFCF) para hovers/preenchimentos. Texto em `--espresso` (#2A231C, quase-preto quente), secundário `--mocha`, muted `--taupe`. **Ouro** (`--gold` #AE893F) é o único acento de cor, usado com restrição: eyebrows, ícones, detalhes, hover de botão, filetes. Cores semânticas são dessaturadas para não brigar com a paleta (sage, terracota, teal-acinzentado). Há um `--gold-foil` (gradiente) reservado para usos muito pontuais (selos, lacre), **não** para fundos de UI.

**Tipografia.** Duas famílias. **Cormorant Garamond** (serifa de alto contraste, elegante) para display, títulos, nomes de peças e preços em destaque — usada em pesos 400–600, com itálico para ênfase editorial. **Mulish** (sans humanista neutra) para todo o restante: navegação, corpo, botões, labels, preços de UI. Eyebrows/labels em Mulish 600, caixa alta, tracking 0.16–0.22em.

**Backgrounds.** Predominam superfícies sólidas e claras. Bandas alternam `paper` e `champagne`; seções de destaque podem usar fundo `espresso` (escuro) com texto creme e acentos em ouro claro. **Sem gradientes decorativos**, sem texturas pesadas. O respiro (whitespace generoso) é parte da identidade.

**Imagery.** Fotografia de produto sobre fundo neutro quente, luz suave, com bastante ar — peça centralizada, sombras leves. Editorial/lifestyle em tons quentes e naturais (sem filtros frios). Proporção padrão de produto **4:5 (retrato)**; heros em **16:9 / full-bleed**. Como a marca ainda não tem fotos, o UI kit usa **`<image-slot>`** (placeholders elegantes onde o usuário arrasta a foto real, que persiste) e blocos tonais em champagne com glifo serifado.

**Layout.** Grid centralizado, largura máx. `--maxw` 1280px; texto editorial em `--maxw-narrow` 760px. Composição assimétrica e arejada; alinhamentos firmes; muito espaço em branco. Seções respiram com `--sp-9` (96px) de padding vertical.

**Cantos (radii).** Contenção: a UI é majoritariamente **angular**. `--r-sm` (2px) em botões e inputs, `--r-md` (4px) em cards, `--r-pill` apenas em chips/filtros. Imagens de produto sem arredondamento (retangulares).

**Sombras.** Suaves, quentes e raras. `--shadow-sm/md/lg` com baixa opacidade em tom espresso. Elevação é exceção (menus, modais, hover de card) — o padrão é a hairline (`--line`).

**Bordas.** Hairline de 1px em `--line` (#E4DACB) é o recurso de separação primário, no lugar de sombra. `--line-strong` para ênfase. Filetes em ouro (`.og-rule--gold`, 48px) marcam aberturas de seção.

**Animação.** Discreta e elegante. Transições de `--dur` (280ms) com `--ease-out`. Fades e leves *rises* (8–16px). Hover de card: imagem com leve zoom (scale 1.03) e/ou troca para segunda foto. **Sem bounces, sem loops decorativos.** Respeita `prefers-reduced-motion`.

**Estados.**
- *Hover* — botão primário escurece para `--gold-deep`; links ganham borda inferior em ouro; cards elevam sutilmente / imagem dá zoom leve; chips ganham borda escura.
- *Active/press* — `translateY(1px)`, sem mudança de cor abrupta.
- *Focus* — anel de 3px `rgba(174,137,63,.14)` + borda em ouro (acessível, visível).
- *Selecionado* — chip/filtro em `espresso` sólido com texto creme.

**Transparência & blur.** Uso mínimo. Header pode ganhar fundo `paper` semi-translúcido com leve blur ao rolar; overlays de modal usam véu espresso a ~40%.

---

## ICONOGRAPHY

- A marca é **nova e não possui um set de ícones próprio.** Adotamos **Lucide** (linha, traço fino) via CDN, com `stroke-width: 1.5` para combinar com a leveza da tipografia. *(Substituição sinalizada — se você tiver um set preferido, troco.)*
- Estilo: **somente linha**, traço fino e uniforme, cantos levemente arredondados; tamanho base 20–22px na UI, 18px inline. Cor: herdam `currentColor` (geralmente `--espresso` ou `--mocha`); acento ouro só em ícones ativos/decorativos.
- Ícones-chave do e-commerce: busca, conta/usuário, sacola, coração (lista de desejos), filtro, chevrons, caminhão (frete), escudo (garantia), pin (lojas), whatsapp/chat.
- **Sem emoji.** Sem ícones em cor cheia/3D. Símbolos unicode (♡ para favorito) só como fallback leve quando um ícone vetor não estiver disponível.
- Logos e o monograma OG estão em `assets/` (SVG, com a fonte embutida).

---

## Como usar

1. Linke a fundação em qualquer arquivo: `<link rel="stylesheet" href="colors_and_type.css">` (ou caminho relativo).
2. Use os tokens via `var(--*)` e as classes `.og-*` (botões, chips, tags, inputs, eyebrow, price…).
3. Para protótipos/mocks, copie os assets necessários e os componentes do `ui_kits/website/`.
4. Imagens reais: use `<image-slot>` (starter) ou substitua os placeholders tonais.

> **Lembrete:** para compartilhar com a equipe, defina o tipo do arquivo como **Design System** no menu *Share*.
