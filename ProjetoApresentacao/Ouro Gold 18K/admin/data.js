/* Ouro Gold 18K Admin — sample data. Attaches to window.AD. */
(function () {
  const fmt = (n) => 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n) => 'R$ ' + Number(n).toLocaleString('pt-BR');

  const products = [
    { id: 'OG-2841', name: 'Solitário Aurora', cat: 'Anéis', col: 'Aurora', material: 'Ouro 18K', gem: 'Diamante', price: 4290, promo: null, stock: 12, min: 4, status: 'active', skus: 6, sold: 41, glyph: 'anel' },
    { id: 'OG-1190', name: 'Colar Filo', cat: 'Colares', col: 'Essenciais', material: 'Ouro 18K', gem: null, price: 3290, promo: 2632, stock: 3, min: 6, status: 'active', skus: 3, sold: 33, glyph: 'colar' },
    { id: 'OG-3320', name: 'Brinco Maré', cat: 'Brincos', col: 'Essenciais', material: 'Ouro 18K', gem: 'Pérola', price: 1880, promo: null, stock: 24, min: 8, status: 'active', skus: 2, sold: 58, glyph: 'brinco' },
    { id: 'OG-5640', name: 'Anel Riviera', cat: 'Anéis', col: 'Para Sempre', material: 'Ouro 18K', gem: 'Diamante', price: 8740, promo: null, stock: 6, min: 3, status: 'active', skus: 8, sold: 19, glyph: 'anel' },
    { id: 'OG-2140', name: 'Pulseira Veneza', cat: 'Pulseiras', col: 'Essenciais', material: 'Ouro 18K', gem: null, price: 2140, promo: null, stock: 0, min: 5, status: 'inactive', skus: 1, sold: 27, glyph: 'pulseira' },
    { id: 'OG-3120', name: 'Pingente Gota', cat: 'Pingentes', col: 'Aurora', material: 'Ouro 18K', gem: 'Safira', price: 3120, promo: null, stock: 9, min: 4, status: 'active', skus: 1, sold: 12, glyph: 'pingente' },
    { id: 'OG-1490', name: 'Argola Lua', cat: 'Brincos', col: 'Essenciais', material: 'Ouro 18K', gem: null, price: 1490, promo: null, stock: 31, min: 10, status: 'active', skus: 2, sold: 44, glyph: 'brinco' },
    { id: 'OG-1960', name: 'Aliança Compromisso', cat: 'Alianças', col: 'Para Sempre', material: 'Ouro 18K', gem: null, price: 1960, promo: null, stock: 2, min: 8, status: 'active', skus: 12, sold: 73, glyph: 'aliança' },
    { id: 'OG-2780', name: 'Colar Ponto de Luz', cat: 'Colares', col: 'Essenciais', material: 'Ouro 18K', gem: 'Diamante', price: 2780, promo: null, stock: 15, min: 5, status: 'active', skus: 1, sold: 36, glyph: 'colar' },
    { id: 'OG-4380', name: 'Brinco Serena', cat: 'Brincos', col: 'Aurora', material: 'Ouro 18K', gem: 'Esmeralda', price: 4380, promo: null, stock: 4, min: 3, status: 'draft', skus: 1, sold: 8, glyph: 'brinco' },
  ];

  const orderStatus = {
    paid:      { label: 'Pago', pill: 'success' },
    packing:   { label: 'Em separação', pill: 'info' },
    shipped:   { label: 'Enviado', pill: 'gold' },
    delivered: { label: 'Entregue', pill: 'success' },
    pending:   { label: 'Aguardando pgto', pill: 'warn' },
    canceled:  { label: 'Cancelado', pill: 'error' },
    returned:  { label: 'Devolução', pill: 'neutral' },
  };

  const orders = [
    { id: 'OG-48213', customer: 'Helena Andrade', email: 'helena@email.com', date: '02/06/2026 14:22', items: 1, total: 4290, pay: 'PIX', status: 'packing', nf: 'authorized', channel: 'Site' },
    { id: 'OG-48212', customer: 'Marcos Vinícius', email: 'marcos.v@email.com', date: '02/06/2026 11:48', items: 2, total: 5170, pay: 'Cartão 7x', status: 'paid', nf: 'pending', channel: 'Site' },
    { id: 'OG-48210', customer: 'Beatriz Lemos', email: 'bia.lemos@email.com', date: '01/06/2026 19:05', items: 1, total: 1880, pay: 'PIX', status: 'shipped', nf: 'authorized', channel: 'Instagram' },
    { id: 'OG-48208', customer: 'Carla Siqueira', email: 'carla.s@email.com', date: '01/06/2026 16:30', items: 3, total: 9210, pay: 'Cartão 10x', status: 'delivered', nf: 'authorized', channel: 'Site' },
    { id: 'OG-48205', customer: 'Rafael Monteiro', email: 'rafa.m@email.com', date: '01/06/2026 09:12', items: 1, total: 8740, pay: 'Boleto', status: 'pending', nf: 'none', channel: 'Site' },
    { id: 'OG-48201', customer: 'Juliana Prado', email: 'ju.prado@email.com', date: '31/05/2026 21:40', items: 2, total: 3450, pay: 'PIX', status: 'paid', nf: 'pending', channel: 'WhatsApp' },
    { id: 'OG-48198', customer: 'Diego Almeida', email: 'diego.a@email.com', date: '31/05/2026 15:22', items: 1, total: 1960, pay: 'Cartão 3x', status: 'canceled', nf: 'canceled', channel: 'Site' },
    { id: 'OG-48195', customer: 'Patrícia Nunes', email: 'pati.nunes@email.com', date: '30/05/2026 18:01', items: 1, total: 2780, pay: 'PIX', status: 'delivered', nf: 'authorized', channel: 'Site' },
    { id: 'OG-48192', customer: 'Tatiane Rocha', email: 'tati.r@email.com', date: '30/05/2026 13:15', items: 4, total: 11240, pay: 'Cartão 10x', status: 'returned', nf: 'authorized', channel: 'Site' },
    { id: 'OG-48189', customer: 'Eduardo Lima', email: 'edu.lima@email.com', date: '29/05/2026 10:48', items: 1, total: 1490, pay: 'PIX', status: 'delivered', nf: 'authorized', channel: 'Instagram' },
  ];

  const orderItems = [
    { id: 'OG-2841', name: 'Solitário Aurora', variant: 'Aro 16 · Ouro amarelo', qty: 1, price: 4290 },
  ];
  const orderTimeline = [
    { t: '02/06 14:22', label: 'Pedido criado', who: 'Cliente' },
    { t: '02/06 14:23', label: 'Pagamento aprovado (PIX)', who: 'Sistema' },
    { t: '02/06 14:25', label: 'NF-e autorizada · 000.048.213', who: 'Sistema' },
    { t: '02/06 15:10', label: 'Em separação', who: 'Operador · Lucas' },
  ];

  const customers = [
    { id: 1, name: 'Helena Andrade', email: 'helena@email.com', cpf: '***.456.789-**', phone: '(11) 99999-0000', orders: 8, spent: 24890, since: 'mar 2024', tier: 'VIP', status: 'active' },
    { id: 2, name: 'Carla Siqueira', email: 'carla.s@email.com', cpf: '***.112.233-**', phone: '(21) 98888-1122', orders: 12, spent: 41200, since: 'jan 2023', tier: 'VIP', status: 'active' },
    { id: 3, name: 'Marcos Vinícius', email: 'marcos.v@email.com', cpf: '***.778.990-**', phone: '(11) 97777-3344', orders: 3, spent: 9870, since: 'set 2024', tier: 'Recorrente', status: 'active' },
    { id: 4, name: 'Beatriz Lemos', email: 'bia.lemos@email.com', cpf: '***.334.556-**', phone: '(31) 96666-5566', orders: 1, spent: 1880, since: 'mai 2026', tier: 'Novo', status: 'active' },
    { id: 5, name: 'Rafael Monteiro', email: 'rafa.m@email.com', cpf: '***.667.889-**', phone: '(41) 95555-7788', orders: 2, spent: 12300, since: 'fev 2025', tier: 'Recorrente', status: 'active' },
    { id: 6, name: 'Juliana Prado', email: 'ju.prado@email.com', cpf: '***.990.112-**', phone: '(11) 94444-9900', orders: 5, spent: 15640, since: 'out 2024', tier: 'Recorrente', status: 'active' },
    { id: 7, name: 'Diego Almeida', email: 'diego.a@email.com', cpf: '***.223.445-**', phone: '(51) 93333-2233', orders: 1, spent: 1960, since: 'abr 2026', tier: 'Novo', status: 'blocked' },
    { id: 8, name: 'Patrícia Nunes', email: 'pati.nunes@email.com', cpf: '***.556.778-**', phone: '(11) 92222-4455', orders: 6, spent: 18900, since: 'jul 2023', tier: 'VIP', status: 'active' },
  ];

  const invoices = [
    { nf: '000.048.213', order: 'OG-48213', customer: 'Helena Andrade', date: '02/06/2026', value: 4290, status: 'authorized' },
    { nf: '000.048.210', order: 'OG-48210', customer: 'Beatriz Lemos', date: '01/06/2026', value: 1880, status: 'authorized' },
    { nf: '000.048.208', order: 'OG-48208', customer: 'Carla Siqueira', date: '01/06/2026', value: 9210, status: 'authorized' },
    { nf: '—', order: 'OG-48212', customer: 'Marcos Vinícius', date: '02/06/2026', value: 5170, status: 'processing' },
    { nf: '—', order: 'OG-48205', customer: 'Rafael Monteiro', date: '01/06/2026', value: 8740, status: 'rejected' },
    { nf: '000.048.198', order: 'OG-48198', customer: 'Diego Almeida', date: '31/05/2026', value: 1960, status: 'canceled' },
    { nf: '000.048.195', order: 'OG-48195', customer: 'Patrícia Nunes', date: '30/05/2026', value: 2780, status: 'authorized' },
    { nf: '000.048.190R', order: 'OG-48192', customer: 'Tatiane Rocha', date: '01/06/2026', value: 11240, status: 'devolution' },
  ];
  const invStatus = {
    authorized: { label: 'Autorizada', pill: 'success' },
    processing: { label: 'Processando', pill: 'info' },
    rejected:   { label: 'Rejeitada', pill: 'error' },
    canceled:   { label: 'Cancelada', pill: 'neutral' },
    devolution: { label: 'Devolução', pill: 'gold' },
  };
  const nfStatusPill = { authorized: ['Autorizada','success'], pending: ['NF pendente','warn'], rejected: ['Rejeitada','error'], canceled: ['Cancelada','neutral'], none: ['Sem NF','neutral'] };

  const coupons = [
    { code: 'BEMVINDA10', type: '10%', desc: 'Primeira compra', uses: 248, limit: 1000, valid: 'até 31/12/2026', status: 'active' },
    { code: 'FRETEGRATIS', type: 'Frete', desc: 'Acima de R$ 500', uses: 1320, limit: '∞', valid: 'até 30/06/2026', status: 'active' },
    { code: 'MAES26', type: 'R$ 150', desc: 'Dia das Mães', uses: 412, limit: 500, valid: 'expirado', status: 'expired' },
    { code: 'VIP15', type: '15%', desc: 'Clientes VIP', uses: 64, limit: 200, valid: 'até 31/12/2026', status: 'active' },
    { code: 'PIX5', type: '5%', desc: 'Pagamento à vista', uses: 2890, limit: '∞', valid: 'permanente', status: 'active' },
  ];

  const movements = [
    { id: 1, product: 'Solitário Aurora', sku: 'OG-2841-A16', type: 'in', qty: 10, reason: 'Recebimento NF 8842', who: 'Lucas', date: '02/06 09:10', balance: 12 },
    { id: 2, product: 'Aliança Compromisso', sku: 'OG-1960-4mm', type: 'out', qty: 2, reason: 'Venda OG-48198', who: 'Sistema', date: '01/06 18:01', balance: 2 },
    { id: 3, product: 'Colar Filo', sku: 'OG-1190-45', type: 'out', qty: 1, reason: 'Quebra / avaria', who: 'Marina', date: '01/06 14:30', balance: 3 },
    { id: 4, product: 'Brinco Maré', sku: 'OG-3320-P', type: 'in', qty: 20, reason: 'Recebimento NF 8839', who: 'Lucas', date: '31/05 10:22', balance: 24 },
    { id: 5, product: 'Pulseira Veneza', sku: 'OG-2140-19', type: 'out', qty: 1, reason: 'Ajuste de inventário', who: 'Marina', date: '30/05 16:45', balance: 0 },
  ];

  const banners = [
    { id: 1, title: 'Coleção Aurora — Hero', pos: 'Home · Topo', period: '01/06 – 30/06', status: 'active', order: 1 },
    { id: 2, title: 'Para Sempre — Noivado', pos: 'Home · Faixa', period: '15/05 – 15/07', status: 'active', order: 2 },
    { id: 3, title: 'Frete grátis acima de R$ 800', pos: 'Barra de anúncio', period: 'permanente', status: 'active', order: 3 },
    { id: 4, title: 'Dia dos Namorados', pos: 'Home · Hero', period: '01/06 – 12/06', status: 'scheduled', order: 4 },
    { id: 5, title: 'Liquidação de inverno', pos: 'Home · Pop-up', period: 'finalizado', status: 'inactive', order: 5 },
  ];

  // KPI + chart series
  const kpis = {
    revenue: 184230, revenueTrend: +12.4,
    orders: 342, ordersTrend: +8.1,
    ticket: 539, ticketTrend: +3.9,
    conversion: 2.8, conversionTrend: -0.3,
  };
  // 14-day revenue (in thousands)
  const revSeries = [9.2, 10.1, 8.6, 11.4, 12.8, 10.2, 9.9, 13.1, 14.6, 12.2, 11.0, 13.8, 15.2, 16.1];
  const revLabels = ['20','21','22','23','24','25','26','27','28','29','30','31','01','02'];
  // category split for donut
  const catSplit = [
    { label: 'Anéis', value: 38, color: '#AE893F' },
    { label: 'Colares', value: 24, color: '#C9A24B' },
    { label: 'Brincos', value: 20, color: '#8C6C2C' },
    { label: 'Alianças', value: 12, color: '#D8C194' },
    { label: 'Outros', value: 6, color: '#BBAd8f' },
  ];
  const topProducts = [
    { name: 'Aliança Compromisso', sold: 73, revenue: 143080 },
    { name: 'Brinco Maré', sold: 58, revenue: 109040 },
    { name: 'Argola Lua', sold: 44, revenue: 65560 },
    { name: 'Solitário Aurora', sold: 41, revenue: 175890 },
    { name: 'Colar Ponto de Luz', sold: 36, revenue: 100080 },
  ];
  const payMix = [
    { label: 'PIX', value: 46, color: '#AE893F' },
    { label: 'Cartão de crédito', value: 41, color: '#8C6C2C' },
    { label: 'Boleto', value: 13, color: '#D8C194' },
  ];

  const auditLog = [
    { who: 'Helena (Admin)', action: 'Alterou preço de "Colar Filo" de R$ 3.290 para R$ 2.632', when: 'há 12 min', tag: 'Preço' },
    { who: 'Lucas (Estoque)', action: 'Entrada de 10un · Solitário Aurora', when: 'há 1 h', tag: 'Estoque' },
    { who: 'Sistema', action: 'NF-e 000.048.213 autorizada', when: 'há 1 h', tag: 'Fiscal' },
    { who: 'Marina (Operador)', action: 'Cancelou pedido OG-48198', when: 'há 3 h', tag: 'Pedido' },
  ];

  window.AD = {
    fmt, fmt0, products, orders, orderStatus, orderItems, orderTimeline,
    customers, invoices, invStatus, nfStatusPill, coupons, movements, banners,
    kpis, revSeries, revLabels, catSplit, topProducts, payMix, auditLog,
  };
})();
