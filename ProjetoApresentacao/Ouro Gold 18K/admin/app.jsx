/* Ouro Gold 18K Admin — app shell, routing, theme */
const { useState: useStateApp, useEffect: useEffectApp } = React;

function AdminApp() {
  const [authed, setAuthed] = useStateApp(() => localStorage.getItem('og-admin-authed') === '1');
  const [screen, setScreenRaw] = useStateApp(() => localStorage.getItem('og-admin-screen') || 'dashboard');
  const [theme, setTheme] = useStateApp(() => localStorage.getItem('og-admin-theme') || 'light');
  const [sideOpen, setSideOpen] = useStateApp(false);

  useEffectApp(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('og-admin-theme', theme); }, [theme]);
  useEffectApp(() => { localStorage.setItem('og-admin-screen', screen); }, [screen]);
  useEffectApp(() => { localStorage.setItem('og-admin-authed', authed ? '1' : '0'); }, [authed]);

  const setScreen = (s) => { setScreenRaw(s); setSideOpen(false); const el = document.querySelector('.ad-main'); if (el) el.scrollTop = 0; window.scrollTo(0, 0); };
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const ctx = {
    screen, nav: setScreen, theme, toggleTheme,
    sideOpen, setSideOpen, enter: () => setAuthed(true), logout: () => setAuthed(false),
  };

  if (!authed) {
    return <AdminCtx.Provider value={ctx}><LoginScreen /></AdminCtx.Provider>;
  }

  const Screen = {
    dashboard: DashboardScreen, orders: OrdersScreen, invoices: InvoicesScreen,
    customers: CustomersScreen, products: ProductsScreen, inventory: InventoryScreen,
    promotions: PromotionsScreen, storefront: StorefrontScreen, finance: FinanceScreen,
    settings: SettingsScreen,
  }[screen] || DashboardScreen;

  return (
    <AdminCtx.Provider value={ctx}>
      <div className="ad-app">
        {sideOpen && <div className="ad-side-scrim" onClick={() => setSideOpen(false)} />}
        <Sidebar />
        <div className="ad-main">
          <Topbar />
          <div className="ad-content"><Screen /></div>
        </div>
      </div>
    </AdminCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdminApp />);
