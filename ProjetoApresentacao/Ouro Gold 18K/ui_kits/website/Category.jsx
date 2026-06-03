/* Listagem de categoria com filtros */
function CategoryScreen({ params }) {
  const { nav, openProduct } = useShop();
  const catSlug = (params && params.cat) || 'aneis';
  const cat = OG.categories.find(c => c.slug === catSlug) || OG.categories[0];
  const [sort, setSort] = useState('relevancia');
  const [sortOpen, setSortOpen] = useState(false);
  const [active, setActive] = useState({ material: [], gem: [], price: [] });

  let items = OG.byCat(catSlug);
  // pad the grid with other products so the layout reads full
  if (items.length < 6) items = items.concat(OG.products.filter(p => p.cat !== catSlug)).slice(0, 9);
  if (sort === 'menor') items = [...items].sort((a,b) => a.price - b.price);
  if (sort === 'maior') items = [...items].sort((a,b) => b.price - a.price);

  const sortLabels = { relevancia: 'Relevância', menor: 'Menor preço', maior: 'Maior preço', recente: 'Mais recentes' };
  const toggle = (group, val) => setActive(s => {
    const has = s[group].includes(val);
    return { ...s, [group]: has ? s[group].filter(v => v !== val) : [...s[group], val] };
  });

  const FilterGroup = ({ title, group, options }) => (
    <div className="k-filter-group">
      <div className="k-filter-title">{title}</div>
      {options.map(o => (
        <label key={o} className="k-check">
          <input type="checkbox" checked={active[group].includes(o)} onChange={() => toggle(group, o)} />
          <span className="k-check-box"><Icon name="check" size={13} stroke={2} /></span>
          {o}
        </label>
      ))}
    </div>
  );

  return (
    <main className="k-pagepad">
      <nav className="k-crumb">
        <a onClick={() => nav('home')}>Início</a><Icon name="chevron-right" size={13} /><span>{cat.label}</span>
      </nav>

      <header className="k-cat-head">
        <Eyebrow>Joias finas</Eyebrow>
        <h1 className="og-h1">{cat.label}</h1>
        <p className="og-body" style={{ maxWidth: 560 }}>
          Peças em ouro 18K selecionadas pela nossa curadoria. {cat.count} modelos disponíveis.
        </p>
      </header>

      <div className="k-cat-layout">
        {/* Filters */}
        <aside className="k-filters">
          <div className="k-filters-head"><Icon name="filter" size={17} /><span>Filtrar</span></div>
          <FilterGroup title="Material" group="material" options={['Ouro 18K','Prata 925','Banho de ouro']} />
          <FilterGroup title="Pedra / Gema" group="gem" options={['Diamante','Pérola','Safira','Esmeralda']} />
          <FilterGroup title="Faixa de preço" group="price" options={['Até R$ 1.000','R$ 1.000 – 3.000','R$ 3.000 – 6.000','Acima de R$ 6.000']} />
          <FilterGroup title="Público" group="material" options={['Feminino','Masculino','Unissex']} />
        </aside>

        {/* Results */}
        <section className="k-results">
          <div className="k-results-bar">
            <span className="og-caption">{items.length} peças</span>
            <div className="k-sort">
              <button className="k-sort-btn" onClick={() => setSortOpen(o => !o)}>
                Ordenar: <strong>{sortLabels[sort]}</strong><Icon name="chevron-down" size={15} />
              </button>
              {sortOpen && (
                <div className="k-sort-menu">
                  {Object.entries(sortLabels).map(([k,v]) => (
                    <button key={k} onClick={() => { setSort(k); setSortOpen(false); }} data-on={sort===k}>{v}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active chips */}
          {(active.material.length + active.gem.length + active.price.length) > 0 && (
            <div className="k-active-chips">
              {[...active.material, ...active.gem, ...active.price].map(v => (
                <span key={v} className="og-chip og-chip--active" onClick={() => {
                  ['material','gem','price'].forEach(g => active[g].includes(v) && toggle(g, v));
                }}>{v}<Icon name="x" size={13} /></span>
              ))}
            </div>
          )}

          <div className="k-grid-3">
            {items.map((p,i) => <ProductCard key={p.id + i} p={p} onOpen={openProduct} />)}
          </div>
        </section>
      </div>
    </main>
  );
}
window.CategoryScreen = CategoryScreen;
