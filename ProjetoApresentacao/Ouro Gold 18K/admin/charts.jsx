/* Ouro Gold 18K Admin — brand-styled charts (pure SVG, theme-aware via tokens).
   Exports: LineChart, BarMini, Donut, Sparkline. */
const { useId } = React;

function cssvar(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return (v && v.trim()) || fallback;
}

/* Area + line chart */
function LineChart({ data, labels, height = 220, stroke = '#AE893F' }) {
  const uid = useId().replace(/:/g, '');
  const w = 760, h = height, padL = 6, padR = 6, padT = 16, padB = 26;
  const max = Math.max(...data) * 1.12, min = Math.min(...data) * 0.78;
  const ix = (i) => padL + (i * (w - padL - padR)) / (data.length - 1);
  const iy = (v) => padT + (h - padT - padB) * (1 - (v - min) / (max - min));
  const pts = data.map((v, i) => [ix(i), iy(v)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L ${ix(data.length - 1).toFixed(1)} ${h - padB} L ${padL} ${h - padB} Z`;
  const grid = cssvar('--ad-chart-grid', '#EBE4D7');
  const ink3 = cssvar('--ad-ink-3', '#938777');
  const gridLines = 4;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={'g' + uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.20" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: gridLines + 1 }).map((_, i) => {
        const y = padT + ((h - padT - padB) * i) / gridLines;
        return <line key={i} x1={padL} y1={y} x2={w - padR} y2={y} stroke={grid} strokeWidth="1" />;
      })}
      <path d={area} fill={`url(#g${uid})`} />
      <path d={line} fill="none" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (i === pts.length - 1 ? <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={stroke} stroke="var(--ad-surface)" strokeWidth="2" /> : null))}
      {labels && labels.map((l, i) => (
        (i % 2 === 0 || i === labels.length - 1) ?
        <text key={i} x={ix(i)} y={h - 8} fontSize="11" fill={ink3} textAnchor="middle" fontFamily="Mulish, sans-serif">{l}</text> : null
      ))}
    </svg>
  );
}

/* Mini vertical bars */
function BarMini({ data, height = 60, color = 'var(--ad-gold)' }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: color, borderRadius: '2px 2px 0 0', opacity: i === data.length - 1 ? 1 : 0.5 }} />
      ))}
    </div>
  );
}

/* Donut */
function Donut({ data, size = 168, thickness = 26, center }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--ad-surface-3)" strokeWidth={thickness} />
        {data.map((d, i) => {
          const len = (d.value / total) * c;
          const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color} strokeWidth={thickness} strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} />;
          offset += len;
          return el;
        })}
      </svg>
      {center && <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{center}</div>}
    </div>
  );
}

/* Horizontal bar (for ranked lists) */
function BarRow({ value, max, color = 'var(--ad-gold)' }) {
  return (
    <div className="ad-progress" style={{ height: 8 }}>
      <i style={{ width: `${(value / max) * 100}%`, background: color }} />
    </div>
  );
}

Object.assign(window, { LineChart, BarMini, Donut, BarRow });
