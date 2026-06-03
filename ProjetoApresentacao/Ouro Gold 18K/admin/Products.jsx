/* Produtos — lista + cadastro/edição */
function ProductsScreen() {
  const [open, setOpen] = useStateC(null);
  const [view, setView] = useStateC('list');
  const statusPill = { active: ['Ativo', 'success'], inactive: ['Inativo', 'neutral'], draft: ['Rascunho', 'warn'] };

  return (
    <>
      <PageHead title="Produtos" subtitle="128 produtos · 4 coleções">
        <Btn variant="outline" icon="upload">Importar CSV</Btn>
        <Btn variant="outline" icon="download">Exportar</Btn>
        <Btn variant="primary" icon="plus" onClick={() => setOpen({ isNew: true })}>Novo produto</Btn>
      </PageHead>

      <div className="ad-toolbar">
        <div className="ad-top-search" style={{ width: 280, margin: 0 }}>
          <span className="ad-top-search-ic"><AdIcon name="search" size={16} /></span>
          <input className="" placeholder="Buscar por nome ou SKU…" style={{ width: '100%', height: 38, border: '1px solid var(--ad-line)', background: 'var(--ad-surface-2)', borderRadius: 'var(--ad-r-sm)', padding: '0 12px 0 38px', fontFamily: 'var(--ad-font)', fontSize: 13.5, color: 'var(--ad-ink)' }} />
        </div>
        <button className="ad-chip"><AdIcon name="gem" size={15} /> Categoria</button>
        <button className="ad-chip"><AdIcon name="tag" size={15} /> Coleção</button>
        <button className="ad-chip"><AdIcon name="filter" size={15} /> Status</button>
        <div className="ad-toolbar-spacer" />
        <div className="ad-seg">
          <button data-on="true"><AdIcon name="list" size={15} /></button>
          <button><AdIcon name="grid" size={15} /></button>
        </div>
      </div>

      <div className="ad-tablewrap">
        <table className="ad-table">
          <thead>
            <tr>
              <th style={{ width: 34 }}><Check on={false} /></th>
              <th>Produto</th><th>SKU</th><th>Categoria</th><th className="ad-tr-num">Preço</th>
              <th className="ad-tr-center">Estoque</th><th className="ad-tr-center">Vendas</th><th>Status</th><th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {AD.products.map(p => {
              const sp = statusPill[p.status];
              const low = p.stock <= p.min;
              return (
                <tr key={p.id} data-click="true" onClick={() => setOpen(p)}>
                  <td onClick={e => e.stopPropagation()}><Check on={false} /></td>
                  <td>
                    <div className="ad-cell-prod">
                      <ProductThumb />
                      <div><div style={{ fontWeight: 700, color: 'var(--ad-ink)' }}>{p.name}</div><div className="ad-cell-sub">{p.col}{p.gem ? ` · ${p.gem}` : ''}</div></div>
                    </div>
                  </td>
                  <td className="ad-num ad-small">{p.id}</td>
                  <td className="ad-small">{p.cat}</td>
                  <td className="ad-tr-num">
                    {p.promo
                      ? <><b className="ad-num" style={{ color: 'var(--ad-ink)' }}>{AD.fmt0(p.promo)}</b><div className="ad-micro ad-muted ad-num" style={{ textDecoration: 'line-through' }}>{AD.fmt0(p.price)}</div></>
                      : <b className="ad-num" style={{ color: 'var(--ad-ink)' }}>{AD.fmt0(p.price)}</b>}
                  </td>
                  <td className="ad-tr-center">
                    <span className="ad-num" style={{ fontWeight: 700, color: low ? 'var(--ad-error)' : 'var(--ad-ink)' }}>{p.stock}</span>
                    {low && <div className="ad-micro" style={{ color: 'var(--ad-error)' }}>mín. {p.min}</div>}
                  </td>
                  <td className="ad-tr-center ad-num ad-small">{p.sold}</td>
                  <td><Pill kind={sp[1]}>{sp[0]}</Pill></td>
                  <td onClick={e => e.stopPropagation()}><button className="ad-iconbtn" style={{ width: 30, height: 30 }}><AdIcon name="dots" size={16} /></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pager total={128} page={1} />
      </div>

      {open && <ProductDrawer p={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function ProductDrawer({ p, onClose }) {
  const isNew = p.isNew;
  const [active, setActive] = useStateC(true);
  return (
    <Drawer title={isNew ? 'Novo produto' : p.name} onClose={onClose} width={680}
      foot={<><Btn variant="ghost" onClick={onClose}>Cancelar</Btn><Btn variant="outline" icon="copy">Duplicar</Btn><Btn variant="primary" icon="check">Salvar produto</Btn></>}>

      {/* media */}
      <div className="ad-eyebrow" style={{ marginBottom: 10 }}>Imagens</div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
        <div className="ad-media-main"><AdIcon name="gem" size={26} stroke={1.2} /></div>
        {[0, 1, 2].map(i => <div key={i} className="ad-media-thumb"><AdIcon name="image" size={16} /></div>)}
        <div className="ad-media-add"><AdIcon name="plus" size={18} /><span className="ad-micro">Adicionar</span></div>
      </div>

      <div className="ad-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 16 }}>
        <Field label="Nome do produto" req><input className="ad-input" defaultValue={isNew ? '' : p.name} placeholder="Ex.: Solitário Aurora" /></Field>
        <Field label="SKU base" req><input className="ad-input ad-num" defaultValue={isNew ? '' : p.id} placeholder="OG-0000" /></Field>
      </div>
      <Field label="Descrição"><textarea className="ad-textarea" rows={3} placeholder="Descrição da peça, material e ocasião…" defaultValue={isNew ? '' : 'Solitário clássico em ouro 18K com diamante de lapidação brilhante.'} /></Field>

      <div className="ad-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', margin: '16px 0' }}>
        <Field label="Categoria"><select className="ad-select" defaultValue={p.cat}><option>Anéis</option><option>Brincos</option><option>Colares</option><option>Alianças</option><option>Pulseiras</option><option>Pingentes</option></select></Field>
        <Field label="Coleção"><select className="ad-select" defaultValue={p.col}><option>Aurora</option><option>Essenciais</option><option>Para Sempre</option></select></Field>
        <Field label="Material"><select className="ad-select"><option>Ouro 18K</option><option>Prata 925</option><option>Banho de ouro</option></select></Field>
      </div>

      {/* pricing */}
      <div className="ad-card ad-card-pad" style={{ marginBottom: 16 }}>
        <div className="ad-eyebrow" style={{ marginBottom: 12 }}>Preço</div>
        <div className="ad-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <Field label="Preço regular"><div className="ad-input-affix"><span className="ad-affix">R$</span><input className="ad-input ad-num" defaultValue={isNew ? '' : (p.price + ',00')} /></div></Field>
          <Field label="Preço promocional"><div className="ad-input-affix"><span className="ad-affix">R$</span><input className="ad-input ad-num" defaultValue={p.promo ? p.promo + ',00' : ''} placeholder="—" /></div></Field>
          <Field label="Validade da promoção"><input className="ad-input" type="text" placeholder="dd/mm – dd/mm" /></Field>
        </div>
      </div>

      {/* variations */}
      <div className="ad-card" style={{ marginBottom: 16 }}>
        <div className="ad-card-head"><h3>Variações & SKU</h3><Btn variant="ghost" size="sm" icon="plus">Adicionar</Btn></div>
        <table className="ad-table">
          <thead><tr><th>Variação</th><th>SKU</th><th className="ad-tr-num">Preço</th><th className="ad-tr-center">Estoque</th></tr></thead>
          <tbody>
            <tr><td>Aro 16 · Ouro amarelo</td><td className="ad-num ad-small">{p.id}-A16</td><td className="ad-tr-num ad-num">{AD.fmt0(p.price)}</td><td className="ad-tr-center ad-num">5</td></tr>
            <tr><td>Aro 17 · Ouro amarelo</td><td className="ad-num ad-small">{p.id}-A17</td><td className="ad-tr-num ad-num">{AD.fmt0(p.price)}</td><td className="ad-tr-center ad-num">4</td></tr>
            <tr><td>Aro 16 · Ouro branco</td><td className="ad-num ad-small">{p.id}-B16</td><td className="ad-tr-num ad-num">{AD.fmt0(p.price + 200)}</td><td className="ad-tr-center ad-num">3</td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 2px' }}>
        <div><div style={{ fontWeight: 700 }}>Produto ativo</div><div className="ad-micro ad-muted">Visível na vitrine</div></div>
        <Switch on={active} onChange={setActive} />
      </div>
    </Drawer>
  );
}
window.ProductsScreen = ProductsScreen;
