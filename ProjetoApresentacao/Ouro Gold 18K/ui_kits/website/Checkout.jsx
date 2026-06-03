/* Checkout — identificação, entrega, pagamento + confirmação */
function CheckoutScreen() {
  const { nav, cart, clearCart } = useShop();
  const [step, setStep] = useState(1);
  const [pay, setPay] = useState('pix');
  const [done, setDone] = useState(false);

  const subtotal = cart.reduce((s, l) => s + l.p.price * l.qty, 0) || 4290;
  const frete = subtotal >= 800 ? 0 : 29.9;
  const total = subtotal + frete;

  if (done) {
    return (
      <main className="k-pagepad k-empty">
        <div className="k-confirm-badge"><Icon name="check" size={30} stroke={2} /></div>
        <Eyebrow style={{ marginBottom: 10 }}>Pedido #OG-48213 confirmado</Eyebrow>
        <h1 className="og-h2">Obrigada pela sua compra</h1>
        <p className="og-body" style={{ margin:'10px auto 26px', maxWidth: 460 }}>
          Enviamos a confirmação para o seu e-mail. Você pode acompanhar o status do pedido na sua conta a qualquer momento.
        </p>
        <div className="k-confirm-cta">
          <Button variant="primary" onClick={() => { clearCart(); nav('account'); }}>Acompanhar pedido</Button>
          <Button variant="outline" onClick={() => { clearCart(); nav('home'); }}>Voltar à loja</Button>
        </div>
      </main>
    );
  }

  const steps = [['1','Identificação'],['2','Entrega'],['3','Pagamento']];
  const Field = ({ label, ph, w }) => (
    <div style={{ gridColumn: w === 2 ? 'span 2' : 'auto' }}>
      <label className="og-label">{label}</label><input className="og-input" placeholder={ph} />
    </div>
  );

  return (
    <main className="k-pagepad">
      <div className="k-checkout-head">
        <span className="k-logo-wm" style={{ fontSize: 24 }}>OURO GOLD</span>
        <span className="k-sum-secure" style={{ margin: 0 }}><Icon name="lock" size={14} />Ambiente seguro</span>
      </div>

      <div className="k-steps">
        {steps.map(([n, t], i) => (
          <React.Fragment key={n}>
            <button className="k-step" data-on={step >= i+1} onClick={() => setStep(i+1)}>
              <span className="k-step-num">{step > i+1 ? <Icon name="check" size={14} stroke={2.2} /> : n}</span>{t}
            </button>
            {i < 2 && <span className="k-step-line" data-on={step > i+1} />}
          </React.Fragment>
        ))}
      </div>

      <div className="k-checkout-layout">
        <section className="k-checkout-main">
          {step === 1 && (
            <div className="k-form-card">
              <h3 className="og-h4">Identificação</h3>
              <div className="k-form-grid">
                <Field label="Nome completo" ph="Como no documento" w={2} />
                <Field label="E-mail" ph="voce@email.com" />
                <Field label="CPF" ph="000.000.000-00" />
                <Field label="Telefone" ph="(11) 90000-0000" />
                <Field label="Data de nascimento" ph="DD/MM/AAAA" />
              </div>
              <Button variant="primary" block style={{ marginTop: 20 }} onClick={() => setStep(2)}>Continuar para entrega</Button>
            </div>
          )}
          {step === 2 && (
            <div className="k-form-card">
              <h3 className="og-h4">Endereço de entrega</h3>
              <div className="k-form-grid">
                <Field label="CEP" ph="00000-000" />
                <Field label="Número" ph="000" />
                <Field label="Endereço" ph="Rua, avenida…" w={2} />
                <Field label="Complemento" ph="Apto, bloco" />
                <Field label="Bairro" ph="Bairro" />
                <Field label="Cidade" ph="Cidade" />
                <Field label="Estado" ph="UF" />
              </div>
              <div className="k-ship-opts">
                <label className="k-radio" data-on><input type="radio" name="ship" defaultChecked /><span className="k-radio-dot" /><div><strong>SEDEX</strong><span>3–5 dias úteis</span></div><b>{frete===0?'Grátis':OG.fmt(frete)}</b></label>
                <label className="k-radio"><input type="radio" name="ship" /><span className="k-radio-dot" /><div><strong>Retirar na loja</strong><span>Av. Paulista, 1000 · hoje</span></div><b>Grátis</b></label>
              </div>
              <Button variant="primary" block style={{ marginTop: 20 }} onClick={() => setStep(3)}>Ir para pagamento</Button>
            </div>
          )}
          {step === 3 && (
            <div className="k-form-card">
              <h3 className="og-h4">Pagamento</h3>
              <div className="k-pay-tabs">
                {[['pix','PIX · 5% OFF'],['card','Cartão de crédito'],['boleto','Boleto']].map(([k,l]) => (
                  <button key={k} className="k-pay-tab" data-on={pay===k} onClick={() => setPay(k)}>{l}</button>
                ))}
              </div>
              {pay === 'pix' && <div className="k-pay-body"><p className="og-body">Pague com PIX e ganhe <strong style={{color:'var(--gold-deep)'}}>5% de desconto</strong>. O código será gerado na confirmação e a aprovação é imediata.</p></div>}
              {pay === 'card' && (
                <div className="k-pay-body k-form-grid">
                  <Field label="Número do cartão" ph="0000 0000 0000 0000" w={2} />
                  <Field label="Validade" ph="MM/AA" />
                  <Field label="CVV" ph="000" />
                  <Field label="Nome no cartão" ph="Como impresso" w={2} />
                  <div style={{ gridColumn:'span 2' }}><label className="og-label">Parcelamento</label>
                    <div className="k-select"><span>7x de {OG.fmt(Math.round(total/7))} sem juros</span><Icon name="chevron-down" size={16} /></div></div>
                </div>
              )}
              {pay === 'boleto' && <div className="k-pay-body"><p className="og-body">O boleto será gerado na confirmação, com vencimento em 3 dias úteis. A compra é processada após a compensação.</p></div>}
              <Button variant="gold" block size="lg" style={{ marginTop: 20 }} onClick={() => setDone(true)}>
                Finalizar pedido · {OG.fmt(pay==='pix'?Math.round(total*0.95):total)}
              </Button>
              <div className="k-sum-secure"><Icon name="shield-check" size={14} />Seus dados são protegidos (PCI-DSS)</div>
            </div>
          )}
        </section>

        <aside className="k-summary k-checkout-sum">
          <h3 className="og-h4">Seu pedido</h3>
          {(cart.length ? cart : [{ p: OG.byId('aurora'), qty: 1 }]).map((l, i) => (
            <div key={i} className="k-mini-line">
              <div className="k-mini-img"><PhotoSlot label="" ratio="1 / 1" /></div>
              <div className="k-mini-info"><strong>{l.p.name}</strong><span>Qtd {l.qty}</span></div>
              <span className="og-price">{OG.fmt(l.p.price * l.qty)}</span>
            </div>
          ))}
          <div className="k-rule" />
          <div className="k-sum-line"><span>Subtotal</span><span>{OG.fmt(subtotal)}</span></div>
          <div className="k-sum-line"><span>Frete</span><span>{frete===0?'Grátis':OG.fmt(frete)}</span></div>
          {pay==='pix' && <div className="k-sum-line"><span>Desconto PIX</span><span style={{color:'var(--success)'}}>− {OG.fmt(Math.round(total*0.05))}</span></div>}
          <div className="k-rule" />
          <div className="k-sum-total"><span>Total</span><span className="og-price" style={{ fontSize: 22 }}>{OG.fmt(pay==='pix'?Math.round(total*0.95):total)}</span></div>
        </aside>
      </div>
    </main>
  );
}
window.CheckoutScreen = CheckoutScreen;
