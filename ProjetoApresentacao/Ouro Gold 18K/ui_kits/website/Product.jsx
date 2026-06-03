/* Página de produto */
function ProductScreen({ params }) {
  const { nav, addToCart, wishlist, toggleWish, openProduct } = useShop();
  const p = (params && params.product) || OG.byId('aurora');
  const [size, setSize] = useState('16');
  const [thumb, setThumb] = useState(0);
  const [qty, setQty] = useState(1);
  const [acc, setAcc] = useState('desc');
  const faved = wishlist.includes(p.id);
  const related = OG.products.filter(r => r.id !== p.id && (r.cat === p.cat || r.gem === p.gem)).slice(0,4);

  const Acc = ({ id, title, children }) => (
    <div className="k-acc">
      <button className="k-acc-head" onClick={() => setAcc(acc === id ? '' : id)}>
        {title}<Icon name={acc === id ? 'minus' : 'plus'} size={16} />
      </button>
      {acc === id && <div className="k-acc-body">{children}</div>}
    </div>
  );

  return (
    <main className="k-pagepad">
      <nav className="k-crumb">
        <a onClick={() => nav('home')}>Início</a><Icon name="chevron-right" size={13} />
        <a onClick={() => nav('category', { cat: p.cat })}>{(OG.categories.find(c=>c.slug===p.cat)||{}).label}</a>
        <Icon name="chevron-right" size={13} /><span>{p.name}</span>
      </nav>

      <div className="k-pdp">
        {/* Gallery */}
        <div className="k-gallery">
          <div className="k-thumbs">
            {[0,1,2,3].map(i => (
              <button key={i} className="k-thumb" data-on={thumb===i} onClick={() => setThumb(i)}>
                <PhotoSlot label="" image={p.image} ratio="1 / 1" />
              </button>
            ))}
          </div>
          <div className="k-gallery-main">
            <PhotoSlot label={p.glyph} image={p.image} ratio="4 / 5" style={{ height: '100%' }} />
            <div className="k-gallery-tools">
              <button className="k-icon-btn" aria-label="Zoom"><Icon name="search" size={18} /></button>
              <button className="k-icon-btn" aria-label="Ver em 360°"><Icon name="rotate" size={18} /></button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="k-pdp-info">
          <Eyebrow>{p.material}{p.gem ? ` · ${p.gem}` : ''}</Eyebrow>
          <h1 className="og-h1" style={{ marginTop: 6 }}>{p.name}</h1>
          <div style={{ margin: '12px 0 18px' }}><Stars rating={p.rating} reviews={p.reviews} size={16} /></div>

          <div className="k-pdp-price">
            <span className="og-price" style={{ fontSize: 30 }}>{OG.fmt(p.price)}</span>
            {p.oldPrice && <span className="og-price og-price-old" style={{ fontSize: 20 }}>{OG.fmt(p.oldPrice)}</span>}
          </div>
          <p className="og-caption" style={{ marginBottom: 22 }}>
            ou <strong style={{ color:'var(--mocha)' }}>{OG.fmt(Math.round(p.price*0.95))}</strong> à vista (5% OFF) · até 7x de {OG.fmt(Math.round(p.price/7))} sem juros
          </p>

          {/* Variation: size */}
          <div className="k-var">
            <div className="k-var-head"><span className="og-label" style={{ margin:0 }}>Tamanho do aro</span>
              <a className="k-size-guide"><Icon name="ruler" size={15} />Guia de tamanhos</a></div>
            <div className="k-sizes">
              {['14','15','16','17','18','19'].map(s => (
                <button key={s} className="k-size" data-on={size===s} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="k-pdp-buy">
            <QtyStepper value={qty} onChange={setQty} />
            <Button variant="gold" block onClick={() => { addToCart(p, qty); nav('cart'); }}>Adicionar ao carrinho</Button>
          </div>
          <Button variant="primary" block style={{ marginTop: 10 }} onClick={() => { addToCart(p, qty); nav('checkout'); }}>Comprar agora</Button>
          <button className="k-wishlink" onClick={() => toggleWish(p.id)}>
            <Icon name="heart" size={16} filled={faved} /> {faved ? 'Na sua lista de desejos' : 'Adicionar à lista de desejos'}
          </button>

          {/* Mini trust */}
          <div className="k-pdp-trust">
            <div><Icon name="truck" size={18} style={{color:'var(--gold)'}} /><span>Enviado em até 3 dias úteis</span></div>
            <div><Icon name="shield-check" size={18} style={{color:'var(--gold)'}} /><span>Garantia vitalícia + certificado</span></div>
            <div><Icon name="gem" size={18} style={{color:'var(--gold)'}} /><span>Gravação personalizada grátis</span></div>
          </div>

          {/* Accordions */}
          <div className="k-accs">
            <Acc id="desc" title="Descrição">{p.desc}</Acc>
            <Acc id="det" title="Detalhes e especificações">
              <ul className="k-spec">
                <li><span>Material</span><b>{p.material}</b></li>
                <li><span>Pedra</span><b>{p.gem || '—'}</b></li>
                <li><span>Peso aprox.</span><b>2,4 g</b></li>
                <li><span>Acabamento</span><b>Polido</b></li>
                <li><span>Certificação</span><b>Certificado de origem</b></li>
              </ul>
            </Acc>
            <Acc id="ship" title="Entrega e trocas">Frete grátis acima de R$ 800. Prazo estimado de 3 a 7 dias úteis. Você tem 30 dias para troca ou devolução, com fluxo guiado e etiqueta gratuita.</Acc>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="k-section" style={{ paddingTop: 8 }}>
        <div className="k-sec-head"><div><Eyebrow>Combina com</Eyebrow><h2 className="og-h3">Complete o look</h2></div></div>
        <div className="k-grid-4">{related.map(r => <ProductCard key={r.id} p={r} onOpen={openProduct} />)}</div>
      </section>
    </main>
  );
}
window.ProductScreen = ProductScreen;
