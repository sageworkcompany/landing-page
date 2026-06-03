/* Ouro Gold 18K Admin — shared shell + atoms. Exports to window. */
const { useState: useStateC, useContext: useContextC, createContext: createContextC, useEffect: useEffectC, useRef: useRefC } = React;

const AdminCtx = createContextC({});
const useAdmin = () => useContextC(AdminCtx);

/* ---- Atoms ---- */
function Btn({ variant = 'outline', size, icon, iconRight, children, onClick, style = {}, title, disabled }) {
  const cls = ['ad-btn', `ad-btn-${variant}`];
  if (size) cls.push(`ad-btn-${size}`);
  if (!children) cls.push('ad-btn-icon');
  return (
    <button className={cls.join(' ')} onClick={onClick} style={style} title={title} disabled={disabled}>
      {icon && <AdIcon name={icon} size={size === 'sm' ? 15 : 16} />}
      {children}
      {iconRight && <AdIcon name={iconRight} size={15} />}
    </button>
  );
}

function Pill({ kind = 'neutral', children, nodot }) {
  return <span className={`ad-pill ad-pill-${kind}${nodot ? ' ad-pill--nodot' : ''}`}>{children}</span>;
}

function Switch({ on, onChange }) {
  return <button className="ad-switch" data-on={!!on} onClick={() => onChange && onChange(!on)} aria-pressed={!!on} />;
}

function Check({ on, onChange }) {
  return <span className="ad-check" data-on={!!on} onClick={() => onChange && onChange(!on)} role="checkbox" aria-checked={!!on}><AdIcon name="check" size={12} stroke={3} /></span>;
}

function Field({ label, req, hint, children }) {
  return (
    <label className="ad-field">
      {label && <span className="ad-label">{label}{req && <span className="ad-req"> *</span>}</span>}
      {children}
      {hint && <span className="ad-hint">{hint}</span>}
    </label>
  );
}

function Avatar({ name, size }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return <span className={`ad-avatar${size === 'lg' ? ' ad-avatar-lg' : ''}`}>{initials}</span>;
}

function Stat({ label, value, icon, trend, note }) {
  const up = trend >= 0;
  return (
    <div className="ad-stat">
      <div className="ad-stat-top">
        <span className="ad-stat-label">{label}</span>
        {icon && <span className="ad-stat-ic"><AdIcon name={icon} size={18} /></span>}
      </div>
      <div className="ad-stat-val ad-num">{value}</div>
      <div className="ad-stat-foot">
        {trend != null && (
          <span className={up ? 'ad-trend-up' : 'ad-trend-down'}>
            <AdIcon name={up ? 'trend-up' : 'trend-down'} size={14} />{up ? '+' : ''}{trend}%
          </span>
        )}
        {note && <span className="ad-trend-note">{note}</span>}
      </div>
    </div>
  );
}

function ProductThumb({ glyph }) {
  return <span className="ad-cell-thumb"><AdIcon name="gem" size={17} stroke={1.4} /></span>;
}

/* ---- Drawer / Modal ---- */
function Drawer({ title, onClose, children, foot, width }) {
  useEffectC(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, []);
  return (
    <div className="ad-overlay ad-overlay-right" onClick={onClose}>
      <div className="ad-drawer" style={width ? { width } : {}} onClick={e => e.stopPropagation()}>
        <div className="ad-drawer-head">
          <h3 className="ad-h2">{title}</h3>
          <button className="ad-iconbtn" onClick={onClose}><AdIcon name="x" size={18} /></button>
        </div>
        <div className="ad-drawer-body">{children}</div>
        {foot && <div style={{ position: 'sticky', bottom: 0, background: 'var(--ad-surface)', borderTop: '1px solid var(--ad-line)', padding: '14px 22px', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>{foot}</div>}
      </div>
    </div>
  );
}

function Modal({ title, onClose, children, foot }) {
  return (
    <div className="ad-overlay ad-overlay-center" onClick={onClose}>
      <div className="ad-modal" onClick={e => e.stopPropagation()}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--ad-line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 className="ad-h2">{title}</h3>
          <button className="ad-iconbtn" onClick={onClose}><AdIcon name="x" size={18} /></button>
        </div>
        <div style={{ padding: 22 }}>{children}</div>
        {foot && <div style={{ borderTop: '1px solid var(--ad-line)', padding: '14px 22px', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>{foot}</div>}
      </div>
    </div>
  );
}

/* ---- Page header ---- */
function PageHead({ title, subtitle, children }) {
  return (
    <div className="ad-pagehead">
      <div className="ad-pagehead-l">
        <h1 className="ad-page-title">{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children && <div className="ad-pagehead-actions">{children}</div>}
    </div>
  );
}

/* ---- Pagination (display only) ---- */
function Pager({ total, page = 1, perPage = 10 }) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  const from = (page - 1) * perPage + 1, to = Math.min(total, page * perPage);
  return (
    <div className="ad-pager">
      <span>{from}–{to} de {total}</span>
      <div className="ad-pager-btns">
        <button className="ad-pg"><AdIcon name="chevron-left" size={15} /></button>
        {Array.from({ length: Math.min(pages, 4) }).map((_, i) => (
          <button key={i} className="ad-pg" data-on={i + 1 === page}>{i + 1}</button>
        ))}
        <button className="ad-pg"><AdIcon name="chevron-right" size={15} /></button>
      </div>
    </div>
  );
}

/* ---- Sidebar ---- */
const NAV = [
  { group: 'Operação', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'orders', label: 'Pedidos', icon: 'bag', badge: 6 },
    { id: 'invoices', label: 'Notas fiscais', icon: 'file-text' },
    { id: 'customers', label: 'Clientes', icon: 'users' },
  ]},
  { group: 'Catálogo', items: [
    { id: 'products', label: 'Produtos', icon: 'gem' },
    { id: 'inventory', label: 'Estoque', icon: 'box', badge: 3 },
    { id: 'promotions', label: 'Promoções & cupons', icon: 'percent' },
  ]},
  { group: 'Loja', items: [
    { id: 'storefront', label: 'Vitrine & conteúdo', icon: 'layout' },
    { id: 'finance', label: 'Financeiro', icon: 'wallet' },
    { id: 'settings', label: 'Configurações', icon: 'settings' },
  ]},
];

function Sidebar() {
  const { screen, nav, sideOpen } = useAdmin();
  return (
    <aside className="ad-side" data-open={sideOpen}>
      <div className="ad-side-brand">
        <span className="ad-side-mark"><span>OG</span></span>
        <span className="ad-side-wm"><b>OURO GOLD</b><small>ADMIN · 18K</small></span>
      </div>
      <div className="ad-side-scroll">
        {NAV.map(g => (
          <div className="ad-side-group" key={g.group}>
            <div className="ad-side-glabel">{g.group}</div>
            {g.items.map(it => (
              <div key={it.id} className="ad-nav-item" data-on={screen === it.id} onClick={() => nav(it.id)}>
                <AdIcon name={it.icon} size={18} className="ad-nav-ic" />
                <span>{it.label}</span>
                {it.badge && <span className="ad-nav-badge">{it.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="ad-side-foot">
        <div className="ad-side-user">
          <Avatar name="Helena Andrade" />
          <div className="ad-side-user-info"><b>Helena Andrade</b><small>Administradora</small></div>
        </div>
      </div>
    </aside>
  );
}

/* ---- Topbar ---- */
const CRUMB = {
  dashboard: 'Dashboard', orders: 'Pedidos', invoices: 'Notas fiscais', customers: 'Clientes',
  products: 'Produtos', inventory: 'Estoque', promotions: 'Promoções & cupons',
  storefront: 'Vitrine & conteúdo', finance: 'Financeiro', settings: 'Configurações',
};
function Topbar() {
  const { theme, toggleTheme, setSideOpen } = useAdmin();
  const { screen } = useAdmin();
  return (
    <div className="ad-top">
      <button className="ad-iconbtn" style={{ display: 'none' }} id="ad-burger" onClick={() => setSideOpen(s => !s)}><AdIcon name="menu" size={20} /></button>
      <div className="ad-top-crumb"><span>Ouro Gold</span><AdIcon name="chevron-right" size={14} /><b>{CRUMB[screen] || ''}</b></div>
      <div className="ad-top-search">
        <span className="ad-top-search-ic"><AdIcon name="search" size={17} /></span>
        <input placeholder="Buscar pedidos, produtos, clientes…" />
      </div>
      <div className="ad-top-actions">
        <button className="ad-iconbtn" onClick={toggleTheme} title="Alternar tema">
          <AdIcon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </button>
        <button className="ad-iconbtn" title="Notificações"><AdIcon name="bell" size={18} /><span className="ad-dot" /></button>
        <div className="ad-vdivider" style={{ height: 28, margin: '0 6px' }} />
        <Avatar name="Helena Andrade" />
      </div>
    </div>
  );
}

Object.assign(window, { AdminCtx, useAdmin, Btn, Pill, Switch, Check, Field, Avatar, Stat, ProductThumb, Drawer, Modal, PageHead, Pager, Sidebar, Topbar });
