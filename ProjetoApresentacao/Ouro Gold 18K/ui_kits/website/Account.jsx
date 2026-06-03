/* Área do cliente — pedidos, dados, favoritos */
function AccountScreen() {
  const { nav, wishlist, openProduct } = useShop();
  const [tab, setTab] = useState('pedidos');

  const orders = [
    { id: 'OG-48213', date: '28 mai 2026', status: 'A caminho', step: 2, total: 4290, items: [OG.byId('aurora')] },
    { id: 'OG-47120', date: '12 abr 2026', status: 'Entregue', step: 3, total: 4512, items: [OG.byId('mare'), OG.byId('filo')] },
    { id: 'OG-45988', date: '03 mar 2026', status: 'Entregue', step: 3, total: 1960, items: [OG.byId('compromisso')] },
  ];
  const statusColor = { 'A caminho': 'var(--info)', 'Entregue': 'var(--success)', 'Processando': 'var(--gold-deep)' };
  const tabs = [['pedidos','Meus pedidos','package'],['favoritos','Lista de desejos','heart'],['dados','Meus dados','user'],['enderecos','Endereços','map-pin'],['cashback','Cashback','gem']];

  const faved = OG.products.filter(p => wishlist.includes(p.id));

  return (
    <main className="k-pagepad">
      <header className="k-cat-head"><Eyebrow>Minha conta</Eyebrow><h1 className="og-h1">Olá, Helena</h1></header>
      <div className="k-account">
        <aside className="k-acct-nav">
          {tabs.map(([k, t, ic]) => (
            <button key={k} className="k-acct-link" data-on={tab===k} onClick={() => setTab(k)}>
              <Icon name={ic} size={18} />{t}
            </button>
          ))}
          <button className="k-acct-link k-acct-out"><Icon name="arrow-left" size={18} />Sair</button>
        </aside>

        <section className="k-acct-main">
          {tab === 'pedidos' && (
            <div className="k-orders">
              <h2 className="og-h3" style={{ marginBottom: 20 }}>Meus pedidos</h2>
              {orders.map(o => (
                <div key={o.id} className="k-order">
                  <div className="k-order-head">
                    <div>
                      <div className="og-caption" style={{ color:'var(--taupe)' }}>Pedido {o.id} · {o.date}</div>
                      <span className="k-order-status" style={{ color: statusColor[o.status] }}>● {o.status}</span>
                    </div>
                    <span className="og-price">{OG.fmt(o.total)}</span>
                  </div>

                  {/* status track */}
                  <div className="k-track">
                    {['Confirmado','Em produção','Enviado','Entregue'].map((s, i) => (
                      <div key={s} className="k-track-step" data-on={i <= o.step}>
                        <span className="k-track-dot">{i <= o.step && <Icon name="check" size={11} stroke={2.4} />}</span>
                        <span className="k-track-lbl">{s}</span>
                      </div>
                    ))}
                  </div>

                  <div className="k-order-items">
                    {o.items.map(it => (
                      <div key={it.id} className="k-order-item" onClick={() => openProduct(it)}>
                        <div className="k-order-img"><PhotoSlot label="" ratio="1 / 1" /></div>
                        <div><strong>{it.name}</strong><span className="og-caption">{it.material}{it.gem?` · ${it.gem}`:''}</span></div>
                      </div>
                    ))}
                  </div>
                  <div className="k-order-actions">
                    <Button variant="outline" size="sm" icon="truck">Rastrear entrega</Button>
                    <Button variant="ghost" size="sm">Nota fiscal</Button>
                    <Button variant="ghost" size="sm">Comprar de novo</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'favoritos' && (
            <div>
              <h2 className="og-h3" style={{ marginBottom: 20 }}>Lista de desejos</h2>
              {faved.length === 0
                ? <p className="og-body">Você ainda não favoritou nenhuma peça. Toque no <Icon name="heart" size={15} style={{display:'inline',verticalAlign:'-2px'}} /> nos produtos.</p>
                : <div className="k-grid-3">{faved.map(p => <ProductCard key={p.id} p={p} onOpen={openProduct} />)}</div>}
            </div>
          )}

          {tab === 'dados' && (
            <div className="k-form-card">
              <h2 className="og-h3" style={{ marginBottom: 18 }}>Meus dados</h2>
              <div className="k-form-grid">
                <div><label className="og-label">Nome</label><input className="og-input" defaultValue="Helena Andrade" /></div>
                <div><label className="og-label">CPF</label><input className="og-input" defaultValue="000.000.000-00" /></div>
                <div><label className="og-label">E-mail</label><input className="og-input" defaultValue="helena@email.com" /></div>
                <div><label className="og-label">Telefone</label><input className="og-input" defaultValue="(11) 99999-0000" /></div>
              </div>
              <Button variant="primary" style={{ marginTop: 18 }}>Salvar alterações</Button>
            </div>
          )}

          {tab === 'enderecos' && (
            <div>
              <h2 className="og-h3" style={{ marginBottom: 18 }}>Endereços</h2>
              <div className="k-addr-grid">
                <div className="k-addr" data-default>
                  <span className="og-tag og-tag--soft">Padrão</span>
                  <strong>Casa</strong>
                  <p>Rua das Acácias, 240 · Apto 52<br/>Jardins · São Paulo / SP<br/>01410-000</p>
                  <div className="k-addr-actions"><a>Editar</a><a>Remover</a></div>
                </div>
                <button className="k-addr k-addr-add"><Icon name="plus" size={20} />Adicionar endereço</button>
              </div>
            </div>
          )}

          {tab === 'cashback' && (
            <div className="k-form-card k-cashback">
              <Eyebrow>Programa de fidelidade</Eyebrow>
              <h2 className="og-display-2" style={{ fontSize: 48, margin:'6px 0 4px' }}>{OG.fmt(214)}</h2>
              <p className="og-body">disponível em cashback para usar na próxima compra.</p>
              <div className="k-rule" style={{ margin:'18px 0' }} />
              <div className="k-sum-line"><span>Acumulado em 2026</span><span className="og-price">{OG.fmt(642)}</span></div>
              <div className="k-sum-line"><span>Resgatado</span><span>− {OG.fmt(428)}</span></div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
window.AccountScreen = AccountScreen;
