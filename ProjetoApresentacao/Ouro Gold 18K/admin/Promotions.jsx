/* Promoções & cupons */
function PromotionsScreen() {
  const [open, setOpen] = useStateC(false);
  const cstatus = { active: ['Ativo', 'success'], expired: ['Expirado', 'neutral'], scheduled: ['Agendado', 'info'] };
  return (
    <>
      <PageHead title="Promoções & cupons" subtitle="Regras de desconto, cupons e condições comerciais">
        <Btn variant="outline" icon="percent">Nova regra</Btn>
        <Btn variant="primary" icon="plus" onClick={() => setOpen(true)}>Novo cupom</Btn>
      </PageHead>

      {/* promo rule cards */}
      <div className="ad-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 'var(--ad-5)' }}>
        <RuleCard icon="truck" title="Frete grátis" desc="Pedidos acima de R$ 800" tag="Ativo" kind="success" />
        <RuleCard icon="credit-card" title="5% à vista (PIX)" desc="Desconto no pagamento à vista" tag="Ativo" kind="success" />
        <RuleCard icon="gift" title="Compre e ganhe" desc="Brinde acima de R$ 1.500" tag="Agendado" kind="info" />
      </div>

      <div className="ad-card-head" style={{ background: 'var(--ad-surface)', border: '1px solid var(--ad-line)', borderRadius: 'var(--ad-r-md) var(--ad-r-md) 0 0', borderBottom: 0 }}>
        <h3>Cupons</h3><span className="ad-micro ad-muted">{AD.coupons.length} cupons</span>
      </div>
      <div className="ad-tablewrap" style={{ borderRadius: '0 0 var(--ad-r-md) var(--ad-r-md)' }}>
        <table className="ad-table">
          <thead><tr><th>Código</th><th>Tipo</th><th>Descrição</th><th className="ad-tr-center">Usos</th><th>Validade</th><th>Status</th><th style={{ width: 80 }}></th></tr></thead>
          <tbody>
            {AD.coupons.map(c => {
              const cs = cstatus[c.status];
              return (
                <tr key={c.code}>
                  <td><span className="ad-coupon ad-num">{c.code}</span></td>
                  <td><Pill kind="gold" nodot>{c.type}</Pill></td>
                  <td className="ad-small">{c.desc}</td>
                  <td className="ad-tr-center ad-num ad-small">{c.uses} / {c.limit}</td>
                  <td className="ad-small ad-sec">{c.valid}</td>
                  <td><Pill kind={cs[1]}>{cs[0]}</Pill></td>
                  <td><div style={{ display: 'flex', gap: 2 }}><button className="ad-iconbtn" style={{ width: 30, height: 30 }}><AdIcon name="edit" size={15} /></button><button className="ad-iconbtn" style={{ width: 30, height: 30 }}><AdIcon name="copy" size={15} /></button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal title="Novo cupom" onClose={() => setOpen(false)}
          foot={<><Btn variant="ghost" onClick={() => setOpen(false)}>Cancelar</Btn><Btn variant="primary" icon="check">Criar cupom</Btn></>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Código do cupom" req><input className="ad-input ad-num" placeholder="EX: VERAO20" style={{ textTransform: 'uppercase' }} /></Field>
            <div className="ad-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Field label="Tipo de desconto"><select className="ad-select"><option>Percentual (%)</option><option>Valor fixo (R$)</option><option>Frete grátis</option></select></Field>
              <Field label="Valor"><input className="ad-input ad-num" placeholder="20" /></Field>
            </div>
            <div className="ad-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Field label="Limite de uso"><input className="ad-input ad-num" placeholder="1000" /></Field>
              <Field label="Válido até"><input className="ad-input" placeholder="dd/mm/aaaa" /></Field>
            </div>
            <Field label="Restrições" hint="Deixe em branco para aplicar a tudo"><select className="ad-select"><option>Sem restrição</option><option>Por categoria</option><option>Por coleção</option><option>Clientes VIP</option></select></Field>
          </div>
        </Modal>
      )}
    </>
  );
}

function RuleCard({ icon, title, desc, tag, kind }) {
  const [on, setOn] = useStateC(kind === 'success');
  return (
    <div className="ad-card ad-card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span className="ad-stat-ic"><AdIcon name={icon} size={18} /></span>
        <Switch on={on} onChange={setOn} />
      </div>
      <div><div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div><div className="ad-small ad-muted">{desc}</div></div>
      <Pill kind={kind} >{tag}</Pill>
    </div>
  );
}
window.PromotionsScreen = PromotionsScreen;
