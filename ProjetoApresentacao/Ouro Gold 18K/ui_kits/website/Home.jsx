/* Home / vitrine principal */
function HomeScreen() {
  const { nav, openProduct } = useShop();
  const novidades = OG.products.filter(p => p.tag === 'new').concat(OG.byId('pontodeluz')).slice(0,4);
  const best = OG.products.filter(p => p.tag === 'best').slice(0,4);

  return (
    <main>
      {/* Hero */}
      <section className="k-hero">
        <div className="k-hero-text">
          <Eyebrow>Nova Coleção · Aurora</Eyebrow>
          <h1 className="og-display-2 k-hero-title">A luz do <span className="og-emph">primeiro</span> dia</h1>
          <p className="og-body-lg" style={{ maxWidth: 420 }}>
            Joias em ouro 18K e diamantes que celebram recomeços. Peças atemporais, feitas para durar gerações.
          </p>
          <div className="k-hero-cta">
            <Button variant="primary" size="lg" onClick={() => nav('collection')}>Ver a coleção</Button>
            <Button variant="ghost" iconRight="arrow-right" onClick={() => nav('category', { cat: 'aneis' })}>Explorar anéis</Button>
          </div>
        </div>
        <div className="k-hero-media">
          <PhotoSlot label="coleção aurora" ratio="3 / 4" tone="sand" style={{ height: '100%' }} />
        </div>
      </section>

      {/* Category tiles */}
      <section className="k-section k-cats">
        <div className="k-cats-row">
          {OG.categories.map(c => (
            <a key={c.slug} className="k-cat-tile" onClick={() => nav('category', { cat: c.slug })}>
              <PhotoSlot label={c.label.toLowerCase()} ratio="1 / 1" />
              <span className="k-cat-name">{c.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Novidades */}
      <section className="k-section">
        <div className="k-sec-head">
          <div>
            <Eyebrow>Acabou de chegar</Eyebrow>
            <h2 className="og-h2">Novidades</h2>
          </div>
          <Button variant="ghost" iconRight="arrow-right" onClick={() => nav('category', { cat: 'aneis' })}>Ver tudo</Button>
        </div>
        <div className="k-grid-4">
          {novidades.map(p => <ProductCard key={p.id} p={p} onOpen={openProduct} />)}
        </div>
      </section>

      {/* Collection band (dark) */}
      <section className="k-collband">
        <div className="k-collband-media"><PhotoSlot label="para sempre" ratio="16 / 10" tone="sand" style={{ height:'100%' }} /></div>
        <div className="k-collband-text">
          <Eyebrow style={{ color: 'var(--gold-light)' }}>Noivado & Casamento</Eyebrow>
          <h2 className="og-h1" style={{ color: 'var(--on-dark)' }}>Para Sempre</h2>
          <p className="og-body-lg" style={{ color: 'var(--on-dark-mut)', maxWidth: 420 }}>
            Solitários, alianças e meias alianças para marcar o compromisso de uma vida — com certificado e gravação inclusos.
          </p>
          <Button variant="gold" onClick={() => nav('collection')}>Descobrir a coleção</Button>
        </div>
      </section>

      {/* Best sellers */}
      <section className="k-section">
        <div className="k-sec-head">
          <div>
            <Eyebrow>Favoritas dos clientes</Eyebrow>
            <h2 className="og-h2">Mais vendidas</h2>
          </div>
          <Button variant="ghost" iconRight="arrow-right" onClick={() => nav('category', { cat: 'colares' })}>Ver tudo</Button>
        </div>
        <div className="k-grid-4">
          {best.map(p => <ProductCard key={p.id} p={p} onOpen={openProduct} />)}
        </div>
      </section>

      {/* Editorial split */}
      <section className="k-editorial">
        <div className="k-editorial-media"><PhotoSlot label="ateliê" ratio="4 / 3" tone="champagne" style={{ height:'100%' }} /></div>
        <div className="k-editorial-text">
          <Eyebrow>O valor do 18K</Eyebrow>
          <h2 className="og-h2">Feito para durar gerações</h2>
          <p className="og-body-lg">
            Trabalhamos exclusivamente com ouro 18 quilates e gemas de origem responsável. Cada peça nasce no ateliê, passa por controle de qualidade e chega até você com certificado e garantia vitalícia.
          </p>
          <Button variant="outline" onClick={() => nav('collection')}>Nossa história</Button>
        </div>
      </section>

      <TrustStrip />
    </main>
  );
}
window.HomeScreen = HomeScreen;
