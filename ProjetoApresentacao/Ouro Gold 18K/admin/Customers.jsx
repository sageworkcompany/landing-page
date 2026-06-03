/* Clientes — lista + perfil em drawer */
function CustomersScreen() {
  const [open, setOpen] = useStateC(null);
  const tierPill = { VIP: 'gold', Recorrente: 'info', Novo: 'neutral' };
  return (
    <>
      <PageHead title="Clientes" subtitle="2.481 clientes cadastrados">
        <Btn variant="outline" icon="download">Exportar (LGPD)</Btn>
        <Btn variant="dark" icon="filter">Segmentar</Btn>
      </PageHead>

      <div className="ad-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 'var(--ad-5)' }}>
        <Stat label="Clientes ativos" value="2.481" icon="users" trend={6.2} note="base total" />
        <Stat label="Clientes VIP" value="184" icon="star" note="acima de R$ 10 mil" />
        <Stat label="Novos (30d)" value="142" icon="user" trend={11.0} />
        <Stat label="Sem compra (90d)" value="318" icon="clock" note="reengajar" />
      </div>

      <div className="ad-toolbar">
        <div className="ad-top-search" style={{ width: 300, margin: 0 }}>
          <span className="ad-top-search-ic"><AdIcon name="search" size={16} /></span>
          <input placeholder="Nome, e-mail, CPF ou telefone…" style={{ width: '100%', height: 38, border: '1px solid var(--ad-line)', background: 'var(--ad-surface-2)', borderRadius: 'var(--ad-r-sm)', padding: '0 12px 0 38px', fontFamily: 'var(--ad-font)', fontSize: 13.5, color: 'var(--ad-ink)' }} />
        </div>
        <button className="ad-chip"><AdIcon name="star" size={15} /> Segmento</button>
        <div className="ad-toolbar-spacer" />
      </div>

      <div className="ad-tablewrap">
        <table className="ad-table">
          <thead><tr><th>Cliente</th><th>Contato</th><th>Cliente desde</th><th className="ad-tr-center">Pedidos</th><th className="ad-tr-num">Total gasto</th><th>Segmento</th><th>Status</th></tr></thead>
          <tbody>
            {AD.customers.map(c => (
              <tr key={c.id} data-click="true" onClick={() => setOpen(c)}>
                <td><div className="ad-cell-prod"><Avatar name={c.name} /><div><div style={{ fontWeight: 700, color: 'var(--ad-ink)' }}>{c.name}</div><div className="ad-cell-sub ad-num">{c.cpf}</div></div></div></td>
                <td><div className="ad-small">{c.email}</div><div className="ad-cell-sub ad-num">{c.phone}</div></td>
                <td className="ad-small ad-sec">{c.since}</td>
                <td className="ad-tr-center ad-num">{c.orders}</td>
                <td className="ad-tr-num ad-td-strong">{AD.fmt0(c.spent)}</td>
                <td><Pill kind={tierPill[c.tier]} nodot>{c.tier}</Pill></td>
                <td>{c.status === 'active' ? <Pill kind="success">Ativo</Pill> : <Pill kind="error">Bloqueado</Pill>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager total={2481} page={1} />
      </div>

      {open && <CustomerDrawer c={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function CustomerDrawer({ c, onClose }) {
  const tierPill = { VIP: 'gold', Recorrente: 'info', Novo: 'neutral' };
  return (
    <Drawer title="Perfil do cliente" onClose={onClose} width={600}
      foot={<><Btn variant="outline" icon="mail">Enviar e-mail</Btn><Btn variant="danger">Bloquear conta</Btn></>}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
        <Avatar name={c.name} size="lg" />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 19 }}>{c.name}</div>
          <div className="ad-small ad-sec">{c.email} · {c.phone}</div>
        </div>
        <Pill kind={tierPill[c.tier]} nodot>{c.tier}</Pill>
      </div>

      <div className="ad-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 20 }}>
        <MiniStat label="Pedidos" value={c.orders} />
        <MiniStat label="Total gasto" value={AD.fmt0(c.spent)} />
        <MiniStat label="Cashback" value="R$ 214" />
      </div>

      <div className="ad-card ad-card-pad" style={{ marginBottom: 16 }}>
        <div className="ad-eyebrow" style={{ marginBottom: 12 }}>Adicionar crédito / cashback</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="ad-input-affix" style={{ flex: 1 }}><span className="ad-affix">R$</span><input className="ad-input ad-num" placeholder="0,00" /></div>
          <Btn variant="primary" icon="plus">Adicionar</Btn>
        </div>
      </div>

      <div className="ad-card" style={{ marginBottom: 16 }}>
        <div className="ad-card-head"><h3>Últimos pedidos</h3></div>
        <table className="ad-table">
          <tbody>
            {AD.orders.slice(0, 3).map(o => (
              <tr key={o.id}><td className="ad-num ad-td-strong">{o.id}</td><td className="ad-small ad-sec">{o.date.split(' ')[0]}</td><td><Pill kind={AD.orderStatus[o.status].pill}>{AD.orderStatus[o.status].label}</Pill></td><td className="ad-tr-num ad-num" style={{ fontWeight: 700 }}>{AD.fmt0(o.total)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ad-card ad-card-pad">
        <div className="ad-eyebrow" style={{ marginBottom: 10 }}>Endereço principal</div>
        <div className="ad-small ad-sec" style={{ lineHeight: 1.6 }}>Rua das Acácias, 240 · Apto 52<br />Jardins · São Paulo / SP · 01410-000</div>
      </div>
    </Drawer>
  );
}
function MiniStat({ label, value }) {
  return <div className="ad-card ad-card-pad" style={{ padding: '14px 16px' }}><div className="ad-micro ad-muted" style={{ marginBottom: 4 }}>{label}</div><div className="ad-num" style={{ fontSize: 19, fontWeight: 800 }}>{value}</div></div>;
}
window.CustomersScreen = CustomersScreen;
