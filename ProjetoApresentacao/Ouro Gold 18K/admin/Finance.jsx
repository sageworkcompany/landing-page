/* Financeiro / Relatórios */
function FinanceScreen() {
  const donutTotal = AD.payMix.reduce((s, d) => s + d.value, 0);
  return (
    <>
      <PageHead title="Financeiro" subtitle="Receita, repasses e relatórios · maio–junho 2026">
        <div className="ad-seg"><button>30 dias</button><button data-on="true">Mês</button><button>Trimestre</button></div>
        <Btn variant="outline" icon="download">Exportar contábil</Btn>
      </PageHead>

      <div className="ad-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 'var(--ad-4)' }}>
        <Stat label="Receita bruta" value="R$ 184.230" icon="wallet" trend={12.4} />
        <Stat label="Receita líquida" value="R$ 162.840" icon="trend-up" trend={11.1} note="após taxas" />
        <Stat label="Descontos / cupons" value="R$ 14.320" icon="percent" note="impacto" />
        <Stat label="Devoluções" value="R$ 6.890" icon="refresh" trend={-2.1} />
      </div>

      <div className="ad-grid" style={{ gridTemplateColumns: '1.7fr 1fr', marginBottom: 'var(--ad-4)' }}>
        <div className="ad-card">
          <div className="ad-card-head"><div><h3>Faturamento diário</h3><span className="ad-micro ad-muted">Receita líquida · milhares de R$</span></div></div>
          <div className="ad-card-pad"><LineChart data={AD.revSeries.map(v => v * 0.88)} labels={AD.revLabels} stroke="#8C6C2C" /></div>
        </div>
        <div className="ad-card">
          <div className="ad-card-head"><h3>Formas de pagamento</h3></div>
          <div className="ad-card-pad" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Donut data={AD.payMix} size={150} center={<><b className="ad-num" style={{ fontSize: 19, fontWeight: 800 }}>{donutTotal}%</b></>} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
              {AD.payMix.map(p => (
                <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: p.color, flex: 'none' }} />
                  <span className="ad-sec" style={{ flex: 1 }}>{p.label}</span><b className="ad-num">{p.value}%</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="ad-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="ad-card">
          <div className="ad-card-head"><h3>Repasses previstos</h3><Pill kind="info" nodot>Próximos 30d</Pill></div>
          <table className="ad-table">
            <thead><tr><th>Forma</th><th>Previsão</th><th className="ad-tr-num">Valor</th></tr></thead>
            <tbody>
              <tr><td className="ad-td-strong">PIX</td><td className="ad-small ad-sec">Imediato</td><td className="ad-tr-num ad-num" style={{ fontWeight: 700 }}>R$ 84.700</td></tr>
              <tr><td className="ad-td-strong">Cartão de crédito</td><td className="ad-small ad-sec">D+30</td><td className="ad-tr-num ad-num" style={{ fontWeight: 700 }}>R$ 68.140</td></tr>
              <tr><td className="ad-td-strong">Boleto</td><td className="ad-small ad-sec">D+2</td><td className="ad-tr-num ad-num" style={{ fontWeight: 700 }}>R$ 10.000</td></tr>
            </tbody>
          </table>
        </div>
        <div className="ad-card">
          <div className="ad-card-head"><h3>Produtos · receita</h3><Btn variant="ghost" size="sm" iconRight="arrow-right">Relatório</Btn></div>
          <table className="ad-table">
            <thead><tr><th>Produto</th><th className="ad-tr-center">Vendas</th><th className="ad-tr-num">Receita</th></tr></thead>
            <tbody>
              {AD.topProducts.map(p => (
                <tr key={p.name}><td className="ad-td-strong">{p.name}</td><td className="ad-tr-center ad-num ad-small">{p.sold}</td><td className="ad-tr-num ad-num" style={{ fontWeight: 700 }}>{AD.fmt0(p.revenue)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
window.FinanceScreen = FinanceScreen;
