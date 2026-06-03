/* Ouro Gold 18K — shared UI kit components.
   Exports to window for cross-file use (Babel scripts don't share scope). */
const { useState, useContext, createContext } = React;

/* ---- Shop context (provided by app.jsx) ---- */
const ShopCtx = createContext({});
const useShop = () => useContext(ShopCtx);

/* ---- Small atoms ---- */
function Eyebrow({ children, style = {} }) {
  return <div className="og-eyebrow" style={style}>{children}</div>;
}

function RuleGold({ style = {} }) {
  return <div className="og-rule--gold" style={style} />;
}

function Stars({ rating = 5, reviews, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ display: 'inline-flex', gap: 1, color: 'var(--gold)' }}>
        {[0,1,2,3,4].map(i => (
          <Icon key={i} name="star" size={size} filled={i < Math.round(rating)} stroke={1.2}
            style={{ color: i < Math.round(rating) ? 'var(--gold)' : 'var(--line-strong)' }} />
        ))}
      </span>
      {reviews != null && <span className="og-caption" style={{ color: 'var(--taupe)' }}>({reviews})</span>}
    </span>
  );
}

function Button({ variant = 'primary', size, block, children, onClick, icon, iconRight, type, style = {} }) {
  const cls = ['og-btn', `og-btn--${variant}`];
  if (size) cls.push(`og-btn--${size}`);
  if (block) cls.push('og-btn--block');
  return (
    <button type={type || 'button'} className={cls.join(' ')} onClick={onClick} style={style}>
      {icon && <Icon name={icon} size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </button>
  );
}

/* ---- Photo placeholder (stands in for product photography) ---- */
function PhotoSlot({ label, image, ratio = '4 / 5', children, style = {}, tone = 'champagne' }) {
  const bg = tone === 'sand' ? 'var(--sand)' : tone === 'gold' ? 'var(--gold-wash)' : 'var(--champagne)';
  if (image) {
    return (
      <div className="k-photo" style={{ aspectRatio: ratio, background: bg, overflow: 'hidden', ...style }}>
        <img src={image} alt={label || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {children}
      </div>
    );
  }
  return (
    <div className="k-photo" style={{ aspectRatio: ratio, background: bg, ...style }}>
      <div className="k-photo-mark">
        <Icon name="gem" size={20} stroke={1.2} style={{ color: 'var(--line-strong)', margin: '0 auto 8px' }} />
        {label && <span>{label}</span>}
      </div>
      {children}
    </div>
  );
}

/* ---- Product card ---- */
function ProductCard({ p, onOpen }) {
  const { wishlist, toggleWish } = useShop();
  const [hover, setHover] = useState(false);
  const faved = wishlist.includes(p.id);
  const tagMap = { new: ['Lançamento','og-tag--new'], sale: ['Oferta','og-tag--sale'], best: ['Best-seller','og-tag--soft'] };
  const tag = p.tag && tagMap[p.tag];
  return (
    <article className="k-pc" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onOpen && onOpen(p)}>
      <div className="k-pc-img">
        <PhotoSlot label={p.glyph} image={p.image} style={{ transition: 'transform .5s var(--ease-out)', transform: hover ? 'scale(1.04)' : 'none' }} />
        {tag && <span className={`og-tag ${tag[1]} k-pc-tag`}>{p.tag === 'sale' ? `-${Math.round((1-p.price/p.oldPrice)*100)}%` : tag[0]}</span>}
        <button className="k-fav" data-on={faved}
          onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }} aria-label="Lista de desejos">
          <Icon name="heart" size={17} filled={faved} stroke={1.5} />
        </button>
        <div className="k-pc-quick" style={{ opacity: hover ? 1 : 0, transform: hover ? 'translateY(0)' : 'translateY(8px)' }}>
          <span className="og-btn og-btn--primary og-btn--block og-btn--sm">Ver peça</span>
        </div>
      </div>
      <div className="k-pc-info">
        <div className="k-pc-meta">{p.material}{p.gem ? ` · ${p.gem}` : ''}</div>
        <h3 className="k-pc-name">{p.name}</h3>
        <div className="k-pc-price">
          <span className="og-price">{OG.fmt(p.price)}</span>
          {p.oldPrice && <span className="og-price og-price-old">{OG.fmt(p.oldPrice)}</span>}
        </div>
      </div>
    </article>
  );
}

/* ---- Quantity stepper ---- */
function QtyStepper({ value, onChange, min = 1 }) {
  return (
    <div className="k-qty">
      <button onClick={() => onChange(Math.max(min, value - 1))} aria-label="Diminuir"><Icon name="minus" size={15} /></button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="Aumentar"><Icon name="plus" size={15} /></button>
    </div>
  );
}

/* ---- Announcement bar ---- */
function AnnouncementBar() {
  const msgs = ['Frete grátis acima de R$ 800', 'Até 7x sem juros', '5% OFF à vista no PIX', 'Garantia vitalícia'];
  return (
    <div className="k-announce">
      {msgs.map((m, i) => <span key={i}>{m}</span>)}
    </div>
  );
}

/* ---- Header ---- */
function Header() {
  const { nav, cartCount, wishlist, screen, openSearch } = useShop();
  return (
    <header className="k-header">
      <AnnouncementBar />
      <div className="k-header-main">
        <div className="k-header-inner">
          <button className="k-icon-btn k-only-mobile" aria-label="Menu"><Icon name="menu" size={22} /></button>
          <nav className="k-nav k-only-desk">
            {OG.categories.slice(0,4).map(c => (
              <a key={c.slug} onClick={() => nav('category', { cat: c.slug })} className="k-nav-link">{c.label}</a>
            ))}
            <a onClick={() => nav('collection')} className="k-nav-link">Coleções</a>
          </nav>
          <a className="k-logo" onClick={() => nav('home')}>
            <span className="k-logo-wm">OURO GOLD</span>
            <span className="k-logo-sub"><i></i>FINE JEWELRY<b>18K</b><i></i></span>
          </a>
          <div className="k-header-actions">
            <button className="k-icon-btn" onClick={openSearch} aria-label="Buscar"><Icon name="search" size={20} /></button>
            <button className="k-icon-btn k-only-desk" onClick={() => nav('account')} aria-label="Conta"><Icon name="user" size={20} /></button>
            <button className="k-icon-btn" onClick={() => nav('account')} aria-label="Favoritos" style={{ position:'relative' }}>
              <Icon name="heart" size={20} />
              {wishlist.length > 0 && <span className="k-badge">{wishlist.length}</span>}
            </button>
            <button className="k-icon-btn" onClick={() => nav('cart')} aria-label="Sacola" style={{ position:'relative' }}>
              <Icon name="bag" size={20} />
              {cartCount > 0 && <span className="k-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---- Footer ---- */
function Footer() {
  const { nav } = useShop();
  const col = (title, items) => (
    <div className="k-foot-col">
      <h4>{title}</h4>
      <ul>{items.map((i,k) => <li key={k}><a onClick={() => nav('category', { cat: OG.categories[0].slug })}>{i}</a></li>)}</ul>
    </div>
  );
  return (
    <footer className="k-footer">
      <div className="k-foot-top">
        <div className="k-foot-brand">
          <span className="k-logo-wm" style={{ color: 'var(--on-dark)', fontSize: 30 }}>OURO GOLD</span>
          <p>Joias atemporais em ouro 18K, lapidadas para acompanhar cada momento da sua história.</p>
          <div className="k-foot-social">
            <a aria-label="Instagram"><Icon name="instagram" size={19} /></a>
            <a aria-label="WhatsApp"><Icon name="chat" size={19} /></a>
          </div>
        </div>
        {col('Joias', ['Anéis','Brincos','Colares','Alianças','Coleções'])}
        {col('Ajuda', ['Frete e entrega','Trocas e devoluções','Guia de tamanhos','Garantia','Fale conosco'])}
        {col('A Ouro Gold', ['Nossa história','Sustentabilidade','Lojas físicas','Certificações'])}
        <div className="k-foot-col k-foot-news">
          <h4>Newsletter</h4>
          <p className="og-caption" style={{ color:'var(--on-dark-mut)' }}>Novidades e ofertas exclusivas.</p>
          <div className="k-news-row">
            <input className="og-input" placeholder="Seu e-mail" style={{ background:'transparent', borderColor:'var(--mocha)', color:'var(--on-dark)' }} />
            <button className="og-btn og-btn--gold og-btn--sm">OK</button>
          </div>
        </div>
      </div>
      <div className="k-foot-bottom">
        <span>© 2026 Ouro Gold 18K · CNPJ 00.000.000/0001-00</span>
        <div className="k-foot-pay">
          <Icon name="shield-check" size={16} /><span>Site seguro · SSL</span>
          <span className="k-foot-tags">PIX · Cartão · Boleto</span>
        </div>
      </div>
    </footer>
  );
}

/* ---- Trust strip (reusable) ---- */
function TrustStrip() {
  const items = [
    ['truck', 'Frete grátis', 'acima de R$ 800'],
    ['shield-check', 'Garantia vitalícia', 'contra defeitos'],
    ['gem', 'Certificado de origem', 'em todas as peças'],
    ['rotate', '30 dias para troca', 'fluxo guiado'],
  ];
  return (
    <section className="k-trust">
      {items.map(([ic, t, s]) => (
        <div key={t} className="k-trust-item">
          <Icon name={ic} size={22} stroke={1.4} style={{ color: 'var(--gold)' }} />
          <div><strong>{t}</strong><span>{s}</span></div>
        </div>
      ))}
    </section>
  );
}

Object.assign(window, { ShopCtx, useShop, Eyebrow, RuleGold, Stars, Button, PhotoSlot, ProductCard, QtyStepper, AnnouncementBar, Header, Footer, TrustStrip });
