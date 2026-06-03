/* Notas fiscais (NF-e) */
function InvoicesScreen() {
  return (
    <>
      <PageHead title="Notas fiscais (NF-e)" subtitle="Emissão integrada · NFe.io">
        <Btn variant="outline" icon="settings">Configurar emissor</Btn>
        <Btn variant="outline" icon="download">Relatório do período</Btn>
        <Btn variant="primary" icon="plus">Emitir NF-e</Btn>
      </PageHead>

      <div className="ad-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 'var(--ad-5)' }}>
        <Stat label="Autorizadas (mês)" value="318" icon="shield-check" trend={9.4} />
        <Stat label="Processando" value="2" icon="clock" />
        <Stat label="Rejeitadas" value="1" icon="alert" note="verificar" />
        <Stat label="Valor faturado" value="R$ 171 mil" icon="file-text" />
      </div>

      {/* emitter status banner */}
      <div className="ad-card ad-card-pad" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'var(--ad-5)' }}>
        <span className="ad-stat-ic" style={{ background: 'var(--ad-success-bg)', color: 'var(--ad-success)' }}><AdIcon name="shield-check" size={18} /></span>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>Emissor conectado · NFe.io</div><div className="ad-small ad-muted">Certificado A1 válido até 14/03/2027 · emissão automática ao confirmar pagamento</div></div>
        <Pill kind="success">Operacional</Pill>
      </div>

      <div className="ad-toolbar">
        <button className="ad-chip" data-on="true">Todas</button>
        <button className="ad-chip">Autorizadas</button>
        <button className="ad-chip">Pendências</button>
        <button className="ad-chip">Devoluções</button>
        <div className="ad-toolbar-spacer" />
        <button className="ad-chip"><AdIcon name="calendar" size={15} /> Junho 2026</button>
      </div>

      <div className="ad-tablewrap">
        <table className="ad-table">
          <thead><tr><th>NF-e</th><th>Pedido</th><th>Cliente</th><th>Emissão</th><th className="ad-tr-num">Valor</th><th>Status</th><th style={{ width: 130 }}>Documentos</th></tr></thead>
          <tbody>
            {AD.invoices.map((n, i) => {
              const st = AD.invStatus[n.status];
              return (
                <tr key={i}>
                  <td className="ad-num ad-td-strong">{n.nf}</td>
                  <td className="ad-num ad-small">{n.order}</td>
                  <td>{n.customer}</td>
                  <td className="ad-num ad-small ad-sec">{n.date}</td>
                  <td className="ad-tr-num ad-num" style={{ fontWeight: 700 }}>{AD.fmt0(n.value)}</td>
                  <td><Pill kind={st.pill}>{st.label}</Pill></td>
                  <td>
                    {n.status === 'authorized' || n.status === 'devolution' ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="ad-tag" style={{ cursor: 'pointer' }}><AdIcon name="download" size={13} /> DANFE</button>
                        <button className="ad-tag" style={{ cursor: 'pointer' }}>XML</button>
                      </div>
                    ) : n.status === 'rejected' ? (
                      <button className="ad-tag" style={{ cursor: 'pointer', color: 'var(--ad-error)', borderColor: 'var(--ad-error-line)' }}><AdIcon name="alert" size={13} /> Ver erro</button>
                    ) : <span className="ad-micro ad-muted">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pager total={321} page={1} />
      </div>
    </>
  );
}
window.InvoicesScreen = InvoicesScreen;
