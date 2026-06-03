/* Carrinho de compras */
function CartScreen() {
  const { nav, cart, setQty, removeFromCart, openProduct } = useShop();
  const [cep, setCep] = useState('');
  const [freight, setFreight] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(false);

  const subtotal = cart.reduce((s, l) => s + l.p.price * l.qty, 0);
  const frete = freight ? (subtotal >= 800 ? 0 : 29.9) : 0;
  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + frete - discount;

  if (cart.length === 0) {
    return (
      <main className="k-pagepad k-empty">
        <Icon name="bag" size={40} stroke={1} style={{ color:'var(--line-strong)', margin:'0 auto 18px' }} />
        <h1 className="og-h2">Sua sacola está vazia</h1>
        <p className="og-body" style={{ margin:'10px 0 24px' }}>Explore nossas coleções e encontre a peça perfeita.</p>
        <Button variant="primary" onClick={() => nav('home')}>Continuar comprando</Button>
      </main>
    );
  }

  return (
    <main className="k-pagepad">
      <header className="k-cat-head"><Eyebrow>Sua sacola</Eyebrow><h1 className="og-h1">Carrinho</h1></header>
      <div className="k-cart-layout">
        <section className="k-cart-items">
          {cart.map((l, i) => (
            <div key={l.p.id + i} className="k-line">
              <div className="k-line-img" onClick={() => openProduct(l.p)}><PhotoSlot label={l.p.glyph} ratio="1 / 1" /></div>
              <div className="k-line-main">
                <div className="k-line-top">
                  <div>
                    <div className="og-caption" style={{ color:'var(--taupe)' }}>{l.p.material}{l.p.gem ? ` · ${l.p.gem}` : ''}</div>
                    <h3 className="k-line-name" onClick={() => openProduct(l.p)}>{l.p.name}</h3>
                    <div className="og-caption">Aro {l.size || '16'} · Gravação: não</div>
                  </div>
                  <button className="k-line-del" onClick={() => removeFromCart(i)} aria-label="Remover"><Icon name="trash" size={17} /></button>
                </div>
                <div className="k-line-bottom">
                  <QtyStepper value={l.qty} onChange={(v) => setQty(i, v)} />
                  <span className="og-price">{OG.fmt(l.p.price * l.qty)}</span>
                </div>
              </div>
            </div>
          ))}
          <button className="k-continue" onClick={() => nav('home')}><Icon name="arrow-left" size={16} />Continuar comprando</button>
        </section>

        <aside className="k-summary">
          <h3 className="og-h4">Resumo do pedido</h3>

          <div className="k-sum-block">
            <label className="og-label">Calcular frete</label>
            <div className="k-cep-row">
              <input className="og-input" placeholder="00000-000" value={cep} onChange={e => setCep(e.target.value)} />
              <Button variant="outline" size="sm" onClick={() => setFreight(true)}>OK</Button>
            </div>
            {freight && <p className="og-caption" style={{ marginTop: 8, color: frete===0 ? 'var(--success)' : 'var(--mocha)' }}>
              {frete === 0 ? '✓ Frete grátis (acima de R$ 800)' : 'SEDEX · R$ 29,90 · 3–5 dias úteis'}</p>}
          </div>

          <div className="k-sum-block">
            <label className="og-label">Cupom de desconto</label>
            <div className="k-cep-row">
              <input className="og-input" placeholder="BEMVINDA10" value={coupon} onChange={e => setCoupon(e.target.value)} />
              <Button variant="outline" size="sm" onClick={() => setApplied(true)}>Aplicar</Button>
            </div>
            {applied && <p className="og-caption" style={{ marginTop: 8, color:'var(--success)' }}>✓ Cupom aplicado — 10% OFF</p>}
          </div>

          <div className="k-rule" />
          <div className="k-sum-line"><span>Subtotal</span><span className="og-price">{OG.fmt(subtotal)}</span></div>
          {applied && <div className="k-sum-line"><span>Desconto</span><span style={{ color:'var(--success)' }}>− {OG.fmt(discount)}</span></div>}
          <div className="k-sum-line"><span>Frete</span><span>{freight ? (frete===0 ? 'Grátis' : OG.fmt(frete)) : 'Calcular acima'}</span></div>
          <div className="k-rule" />
          <div className="k-sum-total"><span>Total</span><span className="og-price" style={{ fontSize: 24 }}>{OG.fmt(total)}</span></div>
          <p className="og-caption" style={{ textAlign:'right', marginBottom: 16 }}>ou {OG.fmt(Math.round(total*0.95))} à vista no PIX</p>

          <Button variant="gold" block size="lg" onClick={() => nav('checkout')}>Finalizar compra</Button>
          <div className="k-sum-secure"><Icon name="lock" size={14} />Pagamento 100% seguro</div>
        </aside>
      </div>
    </main>
  );
}
window.CartScreen = CartScreen;
