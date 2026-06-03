/* Login + 2FA — standalone (no shell) */
function LoginScreen() {
  const { enter } = useAdmin();
  const [step, setStep] = useStateC('login'); // login | twofa
  const [show, setShow] = useStateC(false);
  const [code, setCode] = useStateC(['', '', '', '', '', '']);
  const refs = [useRefC(), useRefC(), useRefC(), useRefC(), useRefC(), useRefC()];

  const setDigit = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...code]; n[i] = v; setCode(n);
    if (v && i < 5) refs[i + 1].current && refs[i + 1].current.focus();
  };

  return (
    <div className="ad-login">
      <div className="ad-login-aside">
        <div className="ad-login-aside-in">
          <span className="ad-login-mark"><span>OG</span></span>
          <h2 className="ad-login-wm">OURO GOLD</h2>
          <div className="ad-login-sub">PAINEL ADMINISTRATIVO · 18K</div>
          <p className="ad-login-tagline">Gestão de catálogo, pedidos, estoque e fiscal — em um só lugar, com a elegância da marca.</p>
          <div className="ad-login-foot">
            <div><AdIcon name="shield-check" size={17} /><span>Acesso protegido com 2FA</span></div>
            <div><AdIcon name="history" size={17} /><span>Auditoria completa de ações</span></div>
          </div>
        </div>
      </div>

      <div className="ad-login-main">
        <div className="ad-login-card">
          {step === 'login' ? (
            <>
              <h1 className="ad-page-title" style={{ marginBottom: 6 }}>Bem-vinda de volta</h1>
              <p className="ad-sec" style={{ marginBottom: 26 }}>Entre com suas credenciais de administrador.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field label="E-mail">
                  <input className="ad-input" defaultValue="helena@ourogold.com.br" />
                </Field>
                <Field label="Senha">
                  <div className="ad-input-affix" style={{ position: 'relative' }}>
                    <input className="ad-input" type={show ? 'text' : 'password'} defaultValue="senhasegura" style={{ paddingLeft: 12, paddingRight: 42 }} />
                    <button className="ad-iconbtn" style={{ position: 'absolute', right: 2, top: 1 }} onClick={() => setShow(s => !s)} tabIndex={-1}>
                      <AdIcon name={show ? 'eye-off' : 'eye'} size={17} />
                    </button>
                  </div>
                </Field>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <CheckUncontrolled /> <span className="ad-small ad-sec">Manter conectada</span>
                  </label>
                  <a className="ad-small" style={{ color: 'var(--ad-gold-deep)', fontWeight: 700 }}>Esqueci a senha</a>
                </div>
                <Btn variant="primary" size="lg" onClick={() => setStep('twofa')} style={{ width: '100%', marginTop: 4 }}>Entrar</Btn>
              </div>
              <p className="ad-micro ad-muted" style={{ textAlign: 'center', marginTop: 22 }}>
                <AdIcon name="lock" size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                Conexão segura · bloqueio após 5 tentativas
              </p>
            </>
          ) : (
            <>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" style={{ marginBottom: 14, marginLeft: -8 }} onClick={() => setStep('login')}>
                <AdIcon name="arrow-left" size={15} /> Voltar
              </button>
              <h1 className="ad-page-title" style={{ marginBottom: 6 }}>Verificação em duas etapas</h1>
              <p className="ad-sec" style={{ marginBottom: 26 }}>Digite o código de 6 dígitos do seu aplicativo autenticador.</p>
              <div className="ad-2fa">
                {code.map((d, i) => (
                  <input key={i} ref={refs[i]} className="ad-2fa-input ad-num" inputMode="numeric" maxLength={1}
                    value={d} onChange={e => setDigit(i, e.target.value)} />
                ))}
              </div>
              <Btn variant="primary" size="lg" onClick={enter} style={{ width: '100%', marginTop: 24 }}>Verificar e entrar</Btn>
              <p className="ad-small ad-sec" style={{ textAlign: 'center', marginTop: 18 }}>
                Não recebeu? <a style={{ color: 'var(--ad-gold-deep)', fontWeight: 700 }}>Reenviar código</a>
              </p>
            </>
          )}
        </div>
        <p className="ad-micro ad-muted" style={{ textAlign: 'center', marginTop: 22 }}>© 2026 Ouro Gold 18K · Painel Administrativo v2.4</p>
      </div>
    </div>
  );
}

function CheckUncontrolled() {
  const [on, setOn] = useStateC(true);
  return <Check on={on} onChange={setOn} />;
}

window.LoginScreen = LoginScreen;
