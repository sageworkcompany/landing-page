/* Vitrine & conteúdo (CMS) — banners, seções, páginas */
function StorefrontScreen() {
  const [tab, setTab] = useStateC('banners');
  const bstatus = { active: ['Ativo', 'success'], scheduled: ['Agendado', 'info'], inactive: ['Finalizado', 'neutral'] };
  return (
    <>
      <PageHead title="Vitrine & conteúdo" subtitle="Banners, seções da home e páginas institucionais">
        <Btn variant="outline" icon="external">Ver loja</Btn>
        <Btn variant="primary" icon="plus">Novo banner</Btn>
      </PageHead>

      <div className="ad-tabs">
        <div className="ad-tab" data-on={tab === 'banners'} onClick={() => setTab('banners')}>Banners & carrosséis</div>
        <div className="ad-tab" data-on={tab === 'secoes'} onClick={() => setTab('secoes')}>Seções da home</div>
        <div className="ad-tab" data-on={tab === 'paginas'} onClick={() => setTab('paginas')}>Páginas institucionais</div>
      </div>

      {tab === 'banners' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {AD.banners.map(b => {
            const st = bstatus[b.status];
            return (
              <div key={b.id} className="ad-card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 14 }}>
                <button className="ad-drag"><AdIcon name="dots" size={16} /><AdIcon name="dots" size={16} style={{ marginLeft: -9 }} /></button>
                <div className="ad-banner-thumb"><AdIcon name="image" size={20} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700 }}>{b.title}</div>
                  <div className="ad-small ad-muted">{b.pos} · <span className="ad-num">{b.period}</span></div>
                </div>
                <Pill kind={st[1]}>{st[0]}</Pill>
                <Switch on={b.status === 'active'} onChange={() => {}} />
                <div style={{ display: 'flex', gap: 2 }}>
                  <button className="ad-iconbtn" style={{ width: 32, height: 32 }}><AdIcon name="edit" size={15} /></button>
                  <button className="ad-iconbtn" style={{ width: 32, height: 32 }}><AdIcon name="trash" size={15} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'secoes' && (
        <div className="ad-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
          {[['Destaques', 'gem', 8], ['Lançamentos', 'star', 12], ['Best-sellers', 'trend-up', 10], ['Coleção Aurora', 'tag', 6]].map(([t, ic, n]) => (
            <div key={t} className="ad-card ad-card-pad" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="ad-stat-ic"><AdIcon name={ic} size={18} /></span>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>{t}</div><div className="ad-small ad-muted">{n} produtos · ordenação manual</div></div>
              <Btn variant="outline" size="sm" icon="edit">Editar</Btn>
            </div>
          ))}
        </div>
      )}

      {tab === 'paginas' && (
        <div className="ad-tablewrap">
          <table className="ad-table">
            <thead><tr><th>Página</th><th>URL</th><th>Atualizada</th><th>Status</th><th style={{ width: 80 }}></th></tr></thead>
            <tbody>
              {[['Sobre nós', '/sobre', '28/05/2026'], ['Sustentabilidade', '/sustentabilidade', '12/04/2026'], ['FAQ', '/faq', '02/06/2026'], ['Política de trocas', '/trocas', '15/03/2026'], ['Guia de tamanhos', '/tamanhos', '20/02/2026']].map(([t, u, d]) => (
                <tr key={u} data-click="true">
                  <td className="ad-td-strong">{t}</td>
                  <td className="ad-num ad-small ad-sec">{u}</td>
                  <td className="ad-small ad-sec ad-num">{d}</td>
                  <td><Pill kind="success">Publicada</Pill></td>
                  <td><button className="ad-iconbtn" style={{ width: 30, height: 30 }}><AdIcon name="edit" size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
window.StorefrontScreen = StorefrontScreen;
