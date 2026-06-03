/* Pedidos — lista com filtros + detalhe em drawer */
function OrdersScreen() {
  const [tab, setTab] = useStateC('all');
  const [open, setOpen] = useStateC(null);
  const tabs = [['all', 'Todos'], ['pending', 'Aguardando'], ['paid', 'Pagos'], ['packing', 'Separação'], ['shipped', 'Enviados'], ['returned', 'Devoluções']];
  let rows = AD.orders;
  if (tab !== 'all') rows = rows.filter(o => o.status === tab);

  return (
    <>
      <PageHead title="Pedidos" subtitle="342 pedidos no período">
        <Btn variant="outline" icon="download">Exportar planilha</Btn>
        <Btn variant="dark" icon="plus">Pedido manual</Btn>
      </PageHead>

      <div className="ad-tabs">
        {tabs.map(([k, l]) => <div key={k} className="ad-tab" data-on={tab === k} onClick={() => setTab(k)}>{l}</div>)}
      </div>

      <div className="ad-toolbar">
        <button className="ad-chip"><AdIcon name="calendar" size={15} /> Período: 14 dias</button>
        <button className="ad-chip"><AdIcon name="credit-card" size={15} /> Pagamento</button>
        <button className="ad-chip"><AdIcon name="filter" size={15} /> Canal</button>
        <div className="ad-toolbar-spacer" />
        <span className="ad-micro ad-muted">{rows.length} resultado(s)</span>
      </div>

      <div className="ad-tablewrap">
        <table className="ad-table">
          <thead>
            <tr>
              <th style={{ width: 34 }}><Check on={false} /></th>
              <th>Pedido</th><th>Cliente</th><th>Data</th><th>Pgto</th>
              <th>NF-e</th><th>Status</th><th className="ad-tr-num">Total</th><th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(o => {
              const st = AD.orderStatus[o.status];
              const nf = AD.nfStatusPill[o.nf];
              return (
                <tr key={o.id} data-click="true" onClick={() => setOpen(o)}>
                  <td onClick={e => e.stopPropagation()}><Check on={false} /></td>
                  <td className="ad-td-strong ad-num">{o.id}</td>
                  <td><div style={{ fontWeight: 600, color: 'var(--ad-ink)' }}>{o.customer}</div><div className="ad-cell-sub">{o.channel}</div></td>
                  <td className="ad-num ad-small">{o.date}</td>
                  <td className="ad-small">{o.pay}</td>
                  <td><Pill kind={nf[1]} nodot>{nf[0]}</Pill></td>
                  <td><Pill kind={st.pill}>{st.label}</Pill></td>
                  <td className="ad-tr-num ad-td-strong">{AD.fmt0(o.total)}</td>
                  <td onClick={e => e.stopPropagation()}><button className="ad-iconbtn" style={{ width: 30, height: 30 }}><AdIcon name="dots" size={16} /></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pager total={342} page={1} />
      </div>

      {open && <OrderDrawer o={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function OrderDrawer({ o, onClose }) {
  const st = AD.orderStatus[o.status];
  return (
    <Drawer title={<span className="ad-num">Pedido {o.id}</span>} onClose={onClose} width={620}
      foot={<><Btn variant="outline" icon="mail">E-mail ao cliente</Btn><Btn variant="primary" icon="truck">Gerar etiqueta</Btn></>}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <Pill kind={st.pill}>{st.label}</Pill>
        <span className="ad-micro ad-muted ad-num">{o.date}</span>
      </div>

      {/* status updater */}
      <div className="ad-card ad-card-pad" style={{ marginBottom: 16 }}>
        <div className="ad-eyebrow" style={{ marginBottom: 10 }}>Atualizar status</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['pending', 'paid', 'packing', 'shipped', 'delivered', 'canceled'].map(s => (
            <button key={s} className="ad-chip" data-on={s === o.status}>{AD.orderStatus[s].label}</button>
          ))}
        </div>
      </div>

      {/* customer + address */}
      <div className="ad-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 16 }}>
        <div className="ad-card ad-card-pad">
          <div className="ad-eyebrow" style={{ marginBottom: 8 }}>Cliente</div>
          <div style={{ fontWeight: 700 }}>{o.customer}</div>
          <div className="ad-small ad-sec">{o.email}</div>
          <div className="ad-small ad-sec">CPF ***.456.789-**</div>
        </div>
        <div className="ad-card ad-card-pad">
          <div className="ad-eyebrow" style={{ marginBottom: 8 }}>Entrega</div>
          <div className="ad-small ad-sec" style={{ lineHeight: 1.6 }}>Rua das Acácias, 240 · Apto 52<br />Jardins · São Paulo / SP<br />01410-000 · SEDEX</div>
        </div>
      </div>

      {/* items */}
      <div className="ad-card" style={{ marginBottom: 16 }}>
        <div className="ad-card-head"><h3>Itens</h3></div>
        <div style={{ padding: '4px 0' }}>
          {AD.orderItems.map(it => (
            <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px' }}>
              <ProductThumb />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{it.name}</div>
                <div className="ad-cell-sub">{it.variant} · {it.id}</div>
              </div>
              <div className="ad-num ad-small ad-sec">{it.qty} ×</div>
              <div className="ad-num" style={{ fontWeight: 700, minWidth: 90, textAlign: 'right' }}>{AD.fmt(it.price)}</div>
            </div>
          ))}
          <div className="ad-divider" />
          <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Row k="Subtotal" v={AD.fmt(o.total)} />
            <Row k="Frete" v="Grátis" />
            <Row k="Pagamento" v={o.pay} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, paddingTop: 10, borderTop: '1px solid var(--ad-line)' }}>
              <b>Total</b><b className="ad-num" style={{ fontSize: 17 }}>{AD.fmt(o.total)}</b>
            </div>
          </div>
        </div>
      </div>

      {/* timeline */}
      <div className="ad-card ad-card-pad">
        <div className="ad-eyebrow" style={{ marginBottom: 14 }}>Histórico</div>
        <div className="ad-timeline">
          {AD.orderTimeline.map((t, i) => (
            <div key={i} className="ad-tl-item">
              <span className="ad-tl-dot" data-last={i === AD.orderTimeline.length - 1} />
              <div><div className="ad-small" style={{ fontWeight: 600, color: 'var(--ad-ink)' }}>{t.label}</div><div className="ad-micro ad-muted ad-num">{t.t} · {t.who}</div></div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}
function Row({ k, v }) {
  return <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="ad-small ad-sec">{k}</span><span className="ad-small ad-num" style={{ fontWeight: 600 }}>{v}</span></div>;
}
window.OrdersScreen = OrdersScreen;
