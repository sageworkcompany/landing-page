/* Dashboard / KPIs */
function DashboardScreen() {
  const { nav } = useAdmin();
  const k = AD.kpis;
  const donutTotal = AD.catSplit.reduce((s, d) => s + d.value, 0);
  return (
    <>
      <PageHead title="Visão geral" subtitle="Resumo da operação · últimos 14 dias">
        <div className="ad-seg">
          <button>Hoje</button><button>7 dias</button><button data-on="true">14 dias</button><button>Mês</button>
        </div>
        <Btn variant="outline" icon="download">Exportar</Btn>
      </PageHead>

      {/* KPI row */}
      <div className="ad-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 'var(--ad-4)' }}>
        <Stat label="Receita bruta" value={AD.fmt0(k.revenue)} icon="wallet" trend={k.revenueTrend} note="vs. período anterior" />
        <Stat label="Pedidos" value={k.orders} icon="bag" trend={k.ordersTrend} note="342 pedidos" />
        <Stat label="Ticket médio" value={AD.fmt0(k.ticket)} icon="trend-up" trend={k.ticketTrend} note="por pedido" />
        <Stat label="Conversão" value={k.conversion + '%'} icon="chart" trend={k.conversionTrend} note="visitas → pedidos" />
      </div>

      {/* Charts row */}
      <div className="ad-grid" style={{ gridTemplateColumns: '1.7fr 1fr', marginBottom: 'var(--ad-4)' }}>
        <div className="ad-card">
          <div className="ad-card-head">
            <div><h3>Receita por dia</h3><span className="ad-micro ad-muted">Em milhares de R$</span></div>
            <Pill kind="success" nodot>+12,4%</Pill>
          </div>
          <div className="ad-card-pad"><LineChart data={AD.revSeries} labels={AD.revLabels} /></div>
        </div>
        <div className="ad-card">
          <div className="ad-card-head"><h3>Vendas por categoria</h3></div>
          <div className="ad-card-pad" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Donut data={AD.catSplit} center={<><b className="ad-num" style={{ fontSize: 22, fontWeight: 800 }}>{donutTotal}%</b><small className="ad-micro ad-muted">total</small></>} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
              {AD.catSplit.map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: c.color, flex: 'none' }} />
                  <span className="ad-sec" style={{ flex: 1 }}>{c.label}</span>
                  <b className="ad-num">{c.value}%</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: recent orders + top products + alerts */}
      <div className="ad-grid" style={{ gridTemplateColumns: '1.7fr 1fr' }}>
        <div className="ad-card">
          <div className="ad-card-head"><h3>Pedidos recentes</h3><Btn variant="ghost" size="sm" iconRight="arrow-right" onClick={() => nav('orders')}>Ver todos</Btn></div>
          <table className="ad-table">
            <thead><tr><th>Pedido</th><th>Cliente</th><th>Status</th><th className="ad-tr-num">Valor</th></tr></thead>
            <tbody>
              {AD.orders.slice(0, 5).map(o => {
                const st = AD.orderStatus[o.status];
                return (
                  <tr key={o.id} data-click="true" onClick={() => nav('orders')}>
                    <td className="ad-td-strong ad-num">{o.id}</td>
                    <td>{o.customer}</td>
                    <td><Pill kind={st.pill}>{st.label}</Pill></td>
                    <td className="ad-tr-num ad-td-strong">{AD.fmt0(o.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ad-4)' }}>
          <div className="ad-card">
            <div className="ad-card-head"><h3>Mais vendidos</h3></div>
            <div className="ad-card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {AD.topProducts.slice(0, 4).map((p, i) => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="ad-num" style={{ fontSize: 13, fontWeight: 800, color: 'var(--ad-gold-deep)', width: 16 }}>{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="ad-small" style={{ fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                    <BarRow value={p.sold} max={AD.topProducts[3].sold > p.sold ? p.sold : 73} />
                  </div>
                  <span className="ad-num ad-small ad-sec" style={{ fontWeight: 700 }}>{p.sold}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ad-card">
            <div className="ad-card-head"><h3>Alertas</h3></div>
            <div className="ad-card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="ad-alert ad-alert-warn"><AdIcon name="alert" size={16} /><span><b>3 produtos</b> abaixo do estoque mínimo</span></div>
              <div className="ad-alert ad-alert-error"><AdIcon name="box" size={16} /><span><b>Pulseira Veneza</b> esgotada</span></div>
              <div className="ad-alert ad-alert-info"><AdIcon name="file-text" size={16} /><span><b>1 NF-e</b> rejeitada — verificar</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
window.DashboardScreen = DashboardScreen;
