/* Ouro Gold 18K — Icon set.
   Thin-stroke line icons (Lucide-style geometry, stroke-width 1.5) rendered
   inline for reliability. currentColor-driven. */
const OG_ICONS = {
  search:    '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  user:      '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  bag:       '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  heart:     '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.5 4.04 3 5.5l7 7Z"/>',
  menu:      '<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>',
  x:         '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-down':  '<path d="m6 9 6 6 6-6"/>',
  'chevron-up':    '<path d="m18 15-6-6-6 6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-left':  '<path d="m15 18-6-6 6-6"/>',
  'arrow-right':   '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-left':    '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  filter:    '<path d="M3 4h18l-7 8v6l-4 2v-8z"/>',
  truck:     '<path d="M14 17V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1"/><path d="M14 8h4l4 4v5a1 1 0 0 1-1 1h-1"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M9 18h6"/>',
  shield:    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  star:      '<path d="M12 2.5l2.95 6.05 6.55.6-4.9 4.4 1.45 6.45L12 17.1l-6.05 3.4 1.45-6.45-4.9-4.4 6.55-.6z"/>',
  check:     '<path d="M20 6 9 17l-5-5"/>',
  plus:      '<path d="M12 5v14"/><path d="M5 12h14"/>',
  minus:     '<path d="M5 12h14"/>',
  trash:     '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  lock:      '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  gem:       '<path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/>',
  rotate:    '<path d="M3 12a9 9 0 1 0 2.6-6.3"/><path d="M3 4v4h4"/>',
  ruler:     '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m8 11 1.5 1.5"/><path d="m11 8 1.5 1.5"/><path d="m14 11 1.5 1.5"/><path d="m11 14 1.5 1.5"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>',
  chat:      '<path d="M7.5 19.5A9 9 0 1 0 4 16l-1.5 5.5z"/>',
  package:   '<path d="m7.5 4.3 9 5.2v9l-9 5.2-9-5.2v-9z" transform="translate(4.5 0)"/><path d="M3 7.5 12 12l9-4.5"/><path d="M12 12v9.5"/>',
  hey:       '',
};

function Icon({ name, size = 20, filled = false, stroke = 1.5, style = {}, className = '' }) {
  const inner = OG_ICONS[name] || '';
  return (
    <svg
      className={className}
      width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flex: 'none', ...style }}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

window.Icon = Icon;
