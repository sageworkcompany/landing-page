---
name: Ouro Gold 18K Design System
description: >-
  Sistema de design para a Ouro Gold 18K, uma joalheria de e-commerce. Estética
  minimalista, moderna e arejada — superfícies quentes (champagne/creme), tinta
  espresso e ouro 18K como acento. Use ao desenhar QUALQUER interface, peça de
  marca, e-mail ou material da Ouro Gold: vitrine, páginas de produto/categoria,
  carrinho, checkout, área do cliente, coleções editoriais. Para o BACK-OFFICE
  (painel administrativo: pedidos, produtos, estoque, NF-e, clientes, financeiro,
  CMS, configurações) use o sistema irmão em admin/ (tokens admin.css, tema
  claro+escuro). Fundação de tokens da vitrine em colors_and_type.css; UI kit React
  de alta fidelidade em ui_kits/website; painel admin em admin/.
---

# Ouro Gold 18K — Design System

## O que é
Identidade visual e UI kit de uma joalheria online premium-acessível. Inspiração:
meio-termo entre Julio Okubo (editorial), Monte Carlo (elegância) e Vivara (varejo
premium). Tudo em Português do Brasil.

## Como usar
1. **Leia primeiro** `README.md` — contém os fundamentos de conteúdo (voz/copy),
   fundamentos visuais (paleta, tipografia, imagery, layout, motion, estados) e
   iconografia. É a fonte da verdade conceitual.
2. **Tokens** vivem em `colors_and_type.css` — cores (`--paper`, `--champagne`,
   `--espresso`, `--gold`…), tipografia (`--font-display` Cormorant Garamond,
   `--font-sans` Mulish), espaçamento, raios, sombras, e classes utilitárias
   `.og-*` (botões, chips, tags, inputs, eyebrow, price). **Nunca invente tokens** —
   consulte os nomes reais aqui antes de usar `var(--*)`.
3. **Componentes / telas**: o UI kit completo está em `ui_kits/website/`. Para criar
   uma nova tela, copie e bifurque as existentes — elas já usam os tokens e os
   componentes compartilhados (`components.jsx`: Header, Footer, ProductCard, Button,
   PhotoSlot, etc.) e o set de ícones (`Icon.jsx`).
4. **Imagens**: a marca ainda não tem fotografia. Use os placeholders tonais
   (`PhotoSlot`) ou substitua por fotos reais (produto 4:5, hero 16:9, fundo neutro
   quente).

## Princípios inegociáveis
- **Minimalismo e respiro.** Whitespace generoso é parte da identidade.
- **Ouro com restrição.** O ouro 18K é acento (eyebrows, ícones, hover, filetes),
  nunca preenchimento generalizado. Sem gradientes/texturas decorativas.
- **Cantos contidos.** UI majoritariamente angular (2–4px); pill só em chips.
  Hairline de 1px (`--line`) separa, no lugar de sombra.
- **Tipografia faz o trabalho.** Serifa de display para títulos/nomes/preços de
  destaque; sans neutra para o resto. Eyebrows/labels/botões em CAIXA ALTA com
  tracking amplo.
- **Sem emoji.** Sem AI-slop (gradientes, cards com borda-accent à esquerda).
- **PT-BR**, "você", tom elegante e concreto. Preços no formato `R$ 4.290`.

## Arquivos
- `README.md` — guia completo (conteúdo + visual + iconografia)
- `colors_and_type.css` — tokens + classes `.og-*`
- `requisitos-vitrine.md` — requisitos funcionais do e-commerce
- `assets/` — logos (wordmark claro/escuro, monograma OG)
- `preview/` — cards do Design System (Type, Colors, Spacing, Components, Brand)
- `ui_kits/website/` — protótipo React de alta fidelidade (7 telas)

## Painel Administrativo (back-office) — sistema irmão em `admin/`
Mesma marca (espresso + ouro), adaptada para ferramenta densa e orientada a dados.
**Leia `admin/README.md`** antes de mexer no admin. Diferenças-chave da vitrine:
- **Tokens próprios** `var(--ad-*)` em `admin/admin.css` — **tema claro E escuro**
  (`data-theme` no `<html>`). Não misture tokens `--og-*` da vitrine com `--ad-*`.
- **Sans (Mulish) em tudo**, denso, numéricos tabulares; serifa só no login.
- **Componentes** em `admin/admin-components.css` (`.ad-*`): sidebar/topbar, tabelas,
  status pills, stat cards, drawer, modal, forms, tabs, gráficos.
- **11 telas** navegáveis em `admin/index.html` (login 2FA, dashboard, pedidos,
  produtos, estoque, promoções, clientes, NF-e, vitrine/CMS, financeiro, config).
- Para nova tela admin: copie/bifurque uma tela de `admin/` (reusa `Sidebar`,
  `Topbar`, `Btn`, `Pill`, `Stat`, `Drawer`, `AdIcon`).
- `requisitos-painel-administrativo.md` — requisitos funcionais do back-office.
