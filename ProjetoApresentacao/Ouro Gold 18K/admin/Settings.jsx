/* Configurações da loja */
function SettingsScreen() {
  const [tab, setTab] = useStateC('empresa');
  const tabs = [['empresa', 'Empresa', 'building'], ['pagamento', 'Pagamentos', 'credit-card'], ['frete', 'Frete & entrega', 'truck'], ['emails', 'E-mails', 'mail'], ['usuarios', 'Usuários & permissões', 'users'], ['seo', 'SEO & integrações', 'external']];
  return (
    <>
      <PageHead title="Configurações" subtitle="Dados da loja, pagamentos, frete, equipe e integrações" />
      <div className="ad-settings">
        <aside className="ad-settings-nav">
          {tabs.map(([k, l, ic]) => (
            <button key={k} className="ad-set-link" data-on={tab === k} onClick={() => setTab(k)}>
              <AdIcon name={ic} size={17} /> {l}
            </button>
          ))}
        </aside>
        <div style={{ minWidth: 0 }}>
          {tab === 'empresa' && <CardForm title="Dados da empresa" fields={[['Razão social', 'Ouro Gold Joias Ltda', 2], ['CNPJ', '00.000.000/0001-00', 1], ['Inscrição estadual', '000.000.000.000', 1], ['Endereço fiscal', 'Av. Paulista, 1000 · São Paulo / SP', 2], ['E-mail', 'contato@ourogold.com.br', 1], ['Telefone', '(11) 4000-0000', 1]]} />}
          {tab === 'pagamento' && <PaymentSettings />}
          {tab === 'frete' && <ShippingSettings />}
          {tab === 'emails' && <EmailSettings />}
          {tab === 'usuarios' && <UsersSettings />}
          {tab === 'seo' && <SeoSettings />}
        </div>
      </div>
    </>
  );
}

function CardForm({ title, fields }) {
  return (
    <div className="ad-card">
      <div className="ad-card-head"><h3>{title}</h3></div>
      <div className="ad-card-pad">
        <div className="ad-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {fields.map(([l, v, span]) => (
            <div key={l} style={{ gridColumn: span === 2 ? 'span 2' : 'auto' }}>
              <Field label={l}><input className="ad-input" defaultValue={v} /></Field>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}><Btn variant="primary" icon="check">Salvar alterações</Btn></div>
      </div>
    </div>
  );
}

function ToggleRow({ icon, title, desc, on: initial }) {
  const [on, setOn] = useStateC(initial);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--ad-line)' }}>
      <span className="ad-stat-ic"><AdIcon name={icon} size={17} /></span>
      <div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>{title}</div><div className="ad-small ad-muted">{desc}</div></div>
      <Switch on={on} onChange={setOn} />
    </div>
  );
}
function PaymentSettings() {
  return (
    <div className="ad-card"><div className="ad-card-head"><h3>Métodos de pagamento</h3></div>
      <div className="ad-card-pad" style={{ paddingTop: 0 }}>
        <ToggleRow icon="qr" title="PIX" desc="Aprovação imediata · 5% de desconto à vista" on={true} />
        <ToggleRow icon="credit-card" title="Cartão de crédito" desc="Até 10x · sem juros até 7x" on={true} />
        <ToggleRow icon="file-text" title="Boleto bancário" desc="Vencimento em 3 dias úteis" on={true} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}><Btn variant="primary" icon="check">Salvar</Btn></div>
      </div>
    </div>
  );
}
function ShippingSettings() {
  return (
    <div className="ad-card"><div className="ad-card-head"><h3>Frete & entrega</h3><Btn variant="outline" size="sm" icon="plus">Transportadora</Btn></div>
      <table className="ad-table">
        <thead><tr><th>Transportadora</th><th>Tipo</th><th>Prazo</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td className="ad-td-strong">Correios SEDEX</td><td className="ad-small">Tabela de frete</td><td className="ad-small ad-sec">3–5 dias</td><td><Pill kind="success">Ativo</Pill></td></tr>
          <tr><td className="ad-td-strong">Correios PAC</td><td className="ad-small">Tabela de frete</td><td className="ad-small ad-sec">5–9 dias</td><td><Pill kind="success">Ativo</Pill></td></tr>
          <tr><td className="ad-td-strong">Retirada na loja</td><td className="ad-small">Grátis</td><td className="ad-small ad-sec">Mesmo dia</td><td><Pill kind="success">Ativo</Pill></td></tr>
          <tr><td className="ad-td-strong">Frete grátis</td><td className="ad-small">Acima de R$ 800</td><td className="ad-small ad-sec">—</td><td><Pill kind="gold">Regra</Pill></td></tr>
        </tbody>
      </table>
    </div>
  );
}
function EmailSettings() {
  const templates = [['Confirmação de pedido', 'Disparado ao criar pedido'], ['Pagamento aprovado', 'Disparado na aprovação'], ['Pedido enviado', 'Com código de rastreio'], ['Pedido entregue', 'Solicita avaliação'], ['Carrinho abandonado', 'Após 24h'], ['Boas-vindas', 'Novo cadastro']];
  return (
    <div className="ad-card"><div className="ad-card-head"><h3>E-mails transacionais</h3></div>
      <table className="ad-table">
        <tbody>
          {templates.map(([t, d]) => (
            <tr key={t} data-click="true"><td><div className="ad-cell-prod"><span className="ad-stat-ic" style={{ width: 30, height: 30 }}><AdIcon name="mail" size={15} /></span><div><div style={{ fontWeight: 700, color: 'var(--ad-ink)' }}>{t}</div><div className="ad-cell-sub">{d}</div></div></div></td><td style={{ textAlign: 'right' }}><Pill kind="success">Ativo</Pill></td><td style={{ width: 80, textAlign: 'right' }}><Btn variant="ghost" size="sm" icon="edit">Editar</Btn></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function UsersSettings() {
  const users = [['Helena Andrade', 'helena@ourogold.com.br', 'Administradora', 'gold'], ['Lucas Pereira', 'lucas@ourogold.com.br', 'Estoque', 'info'], ['Marina Costa', 'marina@ourogold.com.br', 'Operadora', 'neutral'], ['Roberto Dias', 'roberto@ourogold.com.br', 'Financeiro', 'success']];
  return (
    <div className="ad-card"><div className="ad-card-head"><h3>Usuários & permissões</h3><Btn variant="primary" size="sm" icon="plus">Convidar</Btn></div>
      <table className="ad-table">
        <thead><tr><th>Usuário</th><th>Perfil de acesso</th><th>2FA</th><th style={{ width: 60 }}></th></tr></thead>
        <tbody>
          {users.map(([n, e, role, k]) => (
            <tr key={e}><td><div className="ad-cell-prod"><Avatar name={n} /><div><div style={{ fontWeight: 700, color: 'var(--ad-ink)' }}>{n}</div><div className="ad-cell-sub">{e}</div></div></div></td><td><Pill kind={k} nodot>{role}</Pill></td><td><Pill kind="success">Ativo</Pill></td><td><button className="ad-iconbtn" style={{ width: 30, height: 30 }}><AdIcon name="dots" size={16} /></button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function SeoSettings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="ad-card"><div className="ad-card-head"><h3>Pixels & rastreamento</h3></div>
        <div className="ad-card-pad" style={{ paddingTop: 0 }}>
          <ToggleRow icon="external" title="Google Tag Manager" desc="GTM-XXXXXX" on={true} />
          <ToggleRow icon="external" title="Meta Pixel" desc="Rastreamento de conversões" on={true} />
          <ToggleRow icon="chart" title="Google Analytics 4" desc="G-XXXXXXX" on={false} />
        </div>
      </div>
      <CardForm title="SEO padrão" fields={[['Título padrão (title)', 'Ouro Gold 18K · Joias finas', 2], ['Meta description', 'Joias atemporais em ouro 18K com certificado e garantia vitalícia.', 2]]} />
    </div>
  );
}
window.SettingsScreen = SettingsScreen;
