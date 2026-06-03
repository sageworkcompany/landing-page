/* Ouro Gold 18K — UI kit app shell: state, routing, providers */
const { useState: useStateA, useEffect: useEffectA, useCallback } = React;

function App() {
  const [screen, setScreen] = useStateA('home');
  const [params, setParams] = useStateA(null);
  const [cart, setCart] = useStateA([]);
  const [wishlist, setWishlist] = useStateA(['riviera', 'serena']);
  const [searchOpen, setSearchOpen] = useStateA(false);

  const scrollTop = () => { try { window.scrollTo({ top: 0, behavior: 'instant' }); document.documentElement.scrollTop = 0; document.body.scrollTop = 0; } catch (e) {} };

  const nav = useCallback((s, p = null) => { setScreen(s); setParams(p); setSearchOpen(false); setTimeout(scrollTop, 0); }, []);
  const openProduct = useCallback((p) => nav('product', { product: p }), [nav]);

  const addToCart = useCallback((p, qty = 1, size = '16') => {
    setCart(c => {
      const idx = c.findIndex(l => l.p.id === p.id && l.size === size);
      if (idx >= 0) { const n = [...c]; n[idx] = { ...n[idx], qty: n[idx].qty + qty }; return n; }
      return [...c, { p, qty, size }];
    });
  }, []);
  const setQty = useCallback((i, v) => setCart(c => c.map((l, k) => k === i ? { ...l, qty: v } : l)), []);
  const removeFromCart = useCallback((i) => setCart(c => c.filter((_, k) => k !== i)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const toggleWish = useCallback((id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]), []);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);

  const ctx = { screen, nav, openProduct, cart, addToCart, setQty, removeFromCart, clearCart,
    cartCount, wishlist, toggleWish, openSearch: () => setSearchOpen(true) };

  const Screen = {
    home: HomeScreen, category: CategoryScreen, product: ProductScreen,
    cart: CartScreen, checkout: CheckoutScreen, account: AccountScreen, collection: CollectionScreen,
  }[screen] || HomeScreen;

  const hideChrome = screen === 'checkout';

  return (
    <ShopCtx.Provider value={ctx}>
      {!hideChrome && <Header />}
      <Screen params={params} />
      {!hideChrome && <Footer />}
      {searchOpen && <SearchOverlay nav={nav} onClose={() => setSearchOpen(false)} openProduct={openProduct} />}
    </ShopCtx.Provider>
  );
}

function SearchOverlay({ nav, onClose, openProduct }) {
  const [q, setQ] = useStateA('');
  const sugg = ['Anel solitário', 'Aliança de ouro', 'Brinco de pérola', 'Colar ponto de luz'];
  const results = q ? OG.products.filter(p => (p.name + p.gem + p.material).toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div className="k-search-overlay" onClick={onClose}>
      <div className="k-search-panel" onClick={e => e.stopPropagation()}>
        <div className="k-search-row">
          <Icon name="search" size={22} style={{ color:'var(--taupe)' }} />
          <input autoFocus className="k-search-input" placeholder="O que você procura?" value={q} onChange={e => setQ(e.target.value)} />
          <button className="k-icon-btn" onClick={onClose} aria-label="Fechar"><Icon name="x" size={22} /></button>
        </div>
        {!q && (
          <div className="k-search-sugg">
            <span className="og-label">Sugestões</span>
            {sugg.map(s => <button key={s} className="og-chip" onClick={() => setQ(s)}>{s}</button>)}
          </div>
        )}
        {q && (
          <div className="k-search-results">
            <span className="og-caption">{results.length} resultado(s) para “{q}”</span>
            {results.map(p => (
              <button key={p.id} className="k-search-hit" onClick={() => openProduct(p)}>
                <div className="k-search-hit-img"><PhotoSlot label="" ratio="1 / 1" /></div>
                <div><strong>{p.name}</strong><span className="og-caption">{p.material}{p.gem?` · ${p.gem}`:''}</span></div>
                <span className="og-price">{OG.fmt(p.price)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
