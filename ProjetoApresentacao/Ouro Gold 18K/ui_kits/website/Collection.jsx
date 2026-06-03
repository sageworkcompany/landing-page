/* Página de coleção / editorial */
function CollectionScreen({ params }) {
  const { nav, openProduct } = useShop();
  const coll = (params && params.coll) || OG.collections[0];
  const picks = OG.products.filter(p => p.tag === 'new' || p.gem === 'Diamante').slice(0,4);
  const others = OG.collections.filter(c => c.slug !== coll.slug);

  return (
    <main>
      {/* Editorial hero — full bleed */}
      <section className="k-coll-hero">
        <PhotoSlot label={coll.glyph} ratio="21 / 9" tone="sand" style={{ position:'absolute', inset:0, height:'100%' }} />
        <div className="k-coll-hero-inner">
          <Eyebrow style={{ color:'var(--gold-deep)' }}>{coll.eyebrow}</Eyebrow>
          <h1 className="og-display-1 k-coll-title">{coll.title}</h1>
          <p className="og-body-lg" style={{ maxWidth: 520, margin:'0 auto' }}>{coll.desc}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="k-section k-coll-intro">
        <RuleGold style={{ margin: '0 auto 22px' }} />
        <p className="og-display-2" style={{ fontSize: 32, fontWeight: 400, lineHeight: 1.4, textAlign:'center', maxWidth: 720, margin:'0 auto', color:'var(--espresso)' }}>
          Cada peça da coleção <span className="og-emph">{coll.title}</span> nasce de um desenho à mão, é lapidada em ouro 18K e finalizada uma a uma no nosso ateliê.
        </p>
      </section>

      {/* Featured products */}
      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-sec-head"><div><Eyebrow>Selecionadas</Eyebrow><h2 className="og-h2">Peças da coleção</h2></div>
          <Button variant="ghost" iconRight="arrow-right" onClick={() => nav('category', { cat:'aneis' })}>Ver todas</Button></div>
        <div className="k-grid-4">{picks.map(p => <ProductCard key={p.id} p={p} onOpen={openProduct} />)}</div>
      </section>

      {/* Editorial split A */}
      <section className="k-editorial">
        <div className="k-editorial-media"><PhotoSlot label="detalhe" ratio="4 / 3" tone="champagne" style={{ height:'100%' }} /></div>
        <div className="k-editorial-text">
          <Eyebrow>Matéria-prima</Eyebrow>
          <h2 className="og-h2">Ouro 18K e origem responsável</h2>
          <p className="og-body-lg">Trabalhamos apenas com ouro certificado e gemas de procedência rastreável, alinhadas ao Kimberley Process. Beleza com responsabilidade.</p>
        </div>
      </section>

      {/* Editorial split B (reversed, dark) */}
      <section className="k-editorial k-editorial--rev k-band-dark">
        <div className="k-editorial-media"><PhotoSlot label="ateliê" ratio="4 / 3" tone="sand" style={{ height:'100%' }} /></div>
        <div className="k-editorial-text">
          <Eyebrow style={{ color:'var(--gold-light)' }}>Feito à mão</Eyebrow>
          <h2 className="og-h2" style={{ color:'var(--on-dark)' }}>Do desenho ao acabamento</h2>
          <p className="og-body-lg" style={{ color:'var(--on-dark-mut)' }}>Mais de 40 etapas separam o esboço da joia pronta. Cada peça é conferida individualmente antes de chegar até você, com certificado e garantia vitalícia.</p>
          <Button variant="gold" onClick={() => nav('category', { cat:'aneis' })}>Explorar a coleção</Button>
        </div>
      </section>

      {/* Other collections */}
      <section className="k-section">
        <div className="k-sec-head"><div><Eyebrow>Continue explorando</Eyebrow><h2 className="og-h2">Outras coleções</h2></div></div>
        <div className="k-coll-grid">
          {others.map(c => (
            <a key={c.slug} className="k-coll-card" onClick={() => nav('collection', { coll: c })}>
              <PhotoSlot label={c.glyph} ratio="3 / 4" tone="champagne" />
              <div className="k-coll-card-text">
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <h3 className="og-h3">{c.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <TrustStrip />
    </main>
  );
}
window.CollectionScreen = CollectionScreen;
