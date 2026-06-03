/* Estoque — saldos + movimentações */
function InventoryScreen() {
  const [tab, setTab] = useStateC('saldos');
  const low = AD.products.filter(p => p.stock <= p.min);
  return (
    <>
      <PageHead title="Estoque" subtitle="Saldos, movimentações e alertas de reposição">
        <Btn variant="outline" icon="download">Relatório</Btn>
        <Btn variant="dark" icon="plus">Entrada manual</Btn>
      </PageHead>

      <div className="ad-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 'var(--ad-5)' }}>
        <Stat label="SKUs ativos" value="312" icon="box" />
        <Stat label="Abaixo do mínimo" value={low.length} icon="alert" note="reposição" />
        <Stat label="Em ruptura" value="1" icon="trend-down" />
        <Stat label="Valor em estoque" value="R$ 842 mil" icon="wallet" />
      </div>

      <div className="ad-tabs">
        <div className="ad-tab" data-on={tab === 'saldos'} onClick={() => setTab('saldos')}>Saldos por produto</div>
        <div className="ad-tab" data-on={tab === 'mov'} onClick={() => setTab('mov')}>Movimentações</div>
        <div className="ad-tab" data-on={tab === 'alertas'} onClick={() => setTab('alertas')}>Alertas ({low.length})</div>
      </div>

      {tab === 'mov' ? (
        <div className="ad-tablewrap">
          <table className="ad-table">
            <thead><tr><th>Data</th><th>Produto</th><th>SKU</th><th>Tipo</th><th className="ad-tr-num">Qtd</th><th>Motivo</th><th>Responsável</th><th className="ad-tr-num">Saldo</th></tr></thead>
            <tbody>
              {AD.movements.map(m => (
                <tr key={m.id}>
                  <td className="ad-num ad-small">{m.date}</td>
                  <td className="ad-td-strong">{m.product}</td>
                  <td className="ad-num ad-small">{m.sku}</td>
                  <td>{m.type === 'in' ? <Pill kind="success">Entrada</Pill> : <Pill kind="error">Saída</Pill>}</td>
                  <td className="ad-tr-num ad-num" style={{ fontWeight: 700, color: m.type === 'in' ? 'var(--ad-success)' : 'var(--ad-error)' }}>{m.type === 'in' ? '+' : '−'}{m.qty}</td>
                  <td className="ad-small">{m.reason}</td>
                  <td className="ad-small">{m.who}</td>
                  <td className="ad-tr-num ad-num ad-td-strong">{m.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="ad-tablewrap">
          <table className="ad-table">
            <thead><tr><th>Produto</th><th>SKU base</th><th className="ad-tr-center">SKUs</th><th className="ad-tr-center">Saldo</th><th className="ad-tr-center">Mínimo</th><th style={{ width: 180 }}>Nível</th><th>Status</th></tr></thead>
            <tbody>
              {(tab === 'alertas' ? low : AD.products).map(p => {
                const ruptura = p.stock === 0, low2 = p.stock <= p.min;
                const pct = Math.min(100, (p.stock / (p.min * 2.5)) * 100);
                return (
                  <tr key={p.id}>
                    <td><div className="ad-cell-prod"><ProductThumb /><div><div style={{ fontWeight: 700, color: 'var(--ad-ink)' }}>{p.name}</div><div className="ad-cell-sub">{p.cat}</div></div></div></td>
                    <td className="ad-num ad-small">{p.id}</td>
                    <td className="ad-tr-center ad-num">{p.skus}</td>
                    <td className="ad-tr-center ad-num" style={{ fontWeight: 800, color: ruptura ? 'var(--ad-error)' : low2 ? 'var(--ad-warn)' : 'var(--ad-ink)' }}>{p.stock}</td>
                    <td className="ad-tr-center ad-num ad-muted">{p.min}</td>
                    <td><div className="ad-progress"><i style={{ width: pct + '%', background: ruptura ? 'var(--ad-error)' : low2 ? 'var(--ad-warn)' : 'var(--ad-success)' }} /></div></td>
                    <td>{ruptura ? <Pill kind="error">Ruptura</Pill> : low2 ? <Pill kind="warn">Repor</Pill> : <Pill kind="success">OK</Pill>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
window.InventoryScreen = InventoryScreen;
