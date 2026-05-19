// design.js — Smidge design system primitives
// Cream paper · sepia ink · terracotta · hand-drawn wobble

const C = {
  INK:        '#2e2421',
  INK_SOFT:   '#5a4a3e',
  INK_FAINT:  '#8a7a6a',
  PAPER:      '#f3e9d3',
  PAPER_SHADE:'#e8dcc1',
  PAPER_DEEP: '#dcc99e',
  TERRA:      '#c4593a',
  TERRA_SOFT: '#e8a892',
  SAGE:       '#7b8a6f',
  SKY:        '#7c95a8',
  MUSTARD:    '#c89a3a',
};

// Inject SVG filters + global CSS once
if (!document.getElementById('smidge-defs')) {
  const wrap = document.createElement('div');
  wrap.id = 'smidge-defs';
  wrap.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
  wrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><defs>
    <filter id="sk-wob" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="3"/>
      <feDisplacementMap in="SourceGraphic" scale="1.6"/>
    </filter>
    <filter id="sk-wob-lg" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="7"/>
      <feDisplacementMap in="SourceGraphic" scale="2.4"/>
    </filter>
    <filter id="sk-paper" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="2"/>
      <feColorMatrix values="0 0 0 0 0.18  0 0 0 0 0.14  0 0 0 0 0.10  0 0 0 0.10 0"/>
    </filter>
  </defs></svg>`;
  document.body.appendChild(wrap);
}

// ── Paper background ──────────────────────────────────────────────
function Paper({ children, style = {}, shade = 0, grid = false }) {
  const bg = shade === 2 ? C.PAPER_DEEP : shade === 1 ? C.PAPER_SHADE : C.PAPER;
  const gridId = `gp-${grid}`;
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', background:bg, overflow:'hidden', ...style }}>
      <svg width="100%" height="100%" style={{ position:'absolute', inset:0, opacity:0.55, pointerEvents:'none', mixBlendMode:'multiply' }}>
        <rect width="100%" height="100%" filter="url(#sk-paper)"/>
      </svg>
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at 30% 20%, rgba(255,240,210,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(120,80,40,0.10) 0%, transparent 60%)',
      }}/>
      {grid && (
        <svg width="100%" height="100%" style={{ position:'absolute', inset:0, opacity:0.18, pointerEvents:'none' }}>
          <defs><pattern id={gridId} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill={C.INK_FAINT}/>
          </pattern></defs>
          <rect width="100%" height="100%" fill={`url(#${gridId})`}/>
        </svg>
      )}
      <div style={{ position:'relative', width:'100%', height:'100%' }}>{children}</div>
    </div>
  );
}

// ── Rough rectangle ───────────────────────────────────────────────
function SkBox({ children, style={}, fill='transparent', stroke=C.INK, strokeWidth=1.6, radius=14, dashed=false, double=false, padding=12, onClick }) {
  return (
    <div style={{ position:'relative', ...style }} onClick={onClick}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"
        style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <rect x="1.5" y="1.5" width="97" height="97" rx={radius/4} ry={radius/4}
          fill={fill} stroke={stroke} strokeWidth={strokeWidth*0.6} strokeLinejoin="round" strokeLinecap="round"
          strokeDasharray={dashed?'2.5 1.5':'none'} filter="url(#sk-wob)" vectorEffect="non-scaling-stroke"/>
        {double && <rect x="3" y="3" width="94" height="94" rx={radius/4} ry={radius/4}
          fill="none" stroke={stroke} strokeWidth={strokeWidth*0.4}
          strokeDasharray="1.5 2" filter="url(#sk-wob)" vectorEffect="non-scaling-stroke" opacity="0.6"/>}
      </svg>
      <div style={{ position:'relative', padding, width:'100%', height:'100%', boxSizing:'border-box' }}>{children}</div>
    </div>
  );
}

// ── Squiggle underline ────────────────────────────────────────────
function SkUnderline({ width=80, color=C.TERRA, style={} }) {
  return (
    <svg width={width} height="10" style={{ display:'block', ...style }} viewBox={`0 0 ${width} 10`} preserveAspectRatio="none">
      <path d={`M2 6 Q ${width*.2} 2, ${width*.4} 6 T ${width*.8} 6 T ${width-2} 6`}
        fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" filter="url(#sk-wob)"/>
    </svg>
  );
}

// ── Hand divider ──────────────────────────────────────────────────
function SkDivider({ style={}, color=C.INK_SOFT, dashed=true }) {
  return (
    <svg width="100%" height="12" style={{ display:'block', overflow:'visible', ...style }}>
      <path d="M0 6 Q 30 4, 60 6 T 120 6 T 180 6 T 240 6 T 300 6 T 360 6"
        fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"
        strokeDasharray={dashed?'3 3':'none'} filter="url(#sk-wob)"/>
    </svg>
  );
}

// ── Sketchy button ────────────────────────────────────────────────
function SkButton({ children, style={}, fill=C.INK, color=C.PAPER, stroke=C.INK, big=false, onClick, disabled=false }) {
  return (
    <div style={{ position:'relative', display:'inline-flex', opacity:disabled?.5:1, ...style }}
      onClick={disabled?null:onClick}>
      <svg width="100%" height="100%" viewBox="0 0 200 60" preserveAspectRatio="none" style={{ position:'absolute', inset:0 }}>
        <rect x="2" y="2" width="196" height="56" rx="6" fill={fill} stroke={stroke} strokeWidth="1.6" filter="url(#sk-wob)" vectorEffect="non-scaling-stroke"/>
      </svg>
      <div style={{
        position:'relative', width:'100%', display:'flex', alignItems:'center', justifyContent:'center',
        padding: big?'14px 24px':'10px 18px',
        fontFamily:'Manrope', fontWeight:700, color, fontSize:big?17:14, letterSpacing:0.2,
      }}>{children}</div>
    </div>
  );
}

// ── Chip / tag ────────────────────────────────────────────────────
function SkChip({ children, fill='transparent', stroke=C.INK_SOFT, color=C.INK, style={}, onClick }) {
  return (
    <span style={{ position:'relative', display:'inline-flex', alignItems:'center', padding:'5px 11px', cursor:onClick?'pointer':'default', ...style }}
      onClick={onClick}>
      <svg width="100%" height="100%" viewBox="0 0 100 32" preserveAspectRatio="none" style={{ position:'absolute', inset:0 }}>
        <rect x="1" y="1" width="98" height="30" rx="14" fill={fill} stroke={stroke} strokeWidth="1.2" filter="url(#sk-wob)" vectorEffect="non-scaling-stroke"/>
      </svg>
      <span style={{ position:'relative', fontFamily:'Manrope', fontWeight:600, fontSize:12, color, letterSpacing:0.2 }}>{children}</span>
    </span>
  );
}

// ── Stamp ─────────────────────────────────────────────────────────
function Stamp({ children, color=C.TERRA, rotate=-6, style={} }) {
  return (
    <div style={{ display:'inline-flex', padding:'4px 10px', position:'relative', transform:`rotate(${rotate}deg)`, ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 100 32" preserveAspectRatio="none" style={{ position:'absolute', inset:0 }}>
        <rect x="1.5" y="1.5" width="97" height="29" fill="none" stroke={color} strokeWidth="2" filter="url(#sk-wob)" vectorEffect="non-scaling-stroke"/>
        <rect x="3.5" y="3.5" width="93" height="25" fill="none" stroke={color} strokeWidth="1" filter="url(#sk-wob)" vectorEffect="non-scaling-stroke" opacity="0.5"/>
      </svg>
      <span style={{ position:'relative', fontFamily:'Caveat', fontWeight:700, color, fontSize:16, letterSpacing:0.5, textTransform:'uppercase' }}>{children}</span>
    </div>
  );
}

// ── Caption ───────────────────────────────────────────────────────
function Caption({ children, style={}, color=C.INK_SOFT, size=18 }) {
  return <div style={{ fontFamily:'Caveat', fontSize:size, color, lineHeight:1.1, ...style }}>{children}</div>;
}

// ── Wordmark ──────────────────────────────────────────────────────
function SmidgeMark({ size=36, color=C.INK, accent=C.TERRA }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'baseline', gap:6 }}>
      <span style={{ fontFamily:'Manrope', fontWeight:800, fontSize:size, color, letterSpacing:-1, lineHeight:1 }}>smidge</span>
      <span style={{ display:'inline-block', width:size*.18, height:size*.18, background:accent, borderRadius:'50%', filter:'url(#sk-wob)', alignSelf:'center', marginBottom:size*.12 }}/>
    </div>
  );
}

// ── Doodles (stroke-only SVG icons) ──────────────────────────────
const D = (props, paths) => (
  <svg viewBox="0 0 40 40" width={props.size||40} height={props.size||40}
    fill="none" stroke={props.color||C.INK} strokeWidth={props.strokeWidth||1.6}
    strokeLinecap="round" strokeLinejoin="round" filter="url(#sk-wob)" style={props.style}>
    {paths}
  </svg>
);

const Doodle = {
  Spoon:  p => D(p, <><ellipse cx="13" cy="14" rx="7" ry="9"/><path d="M19 18 L34 33"/></>),
  Ruler:  p => D(p, <><rect x="4" y="14" width="32" height="12" rx="1"/><path d="M9 14v4 M14 14v6 M19 14v4 M24 14v6 M29 14v4 M34 14v6"/></>),
  Beaker: p => D(p, <><path d="M13 6 h14 M14 6 v10 L8 32 c0 3 24 3 24 0 L26 16 V6"/><path d="M11 26 q5 2 9 0 t9 0"/></>),
  Therm:  p => D(p, <><path d="M20 6 a4 4 0 0 1 4 4 v14 a5 5 0 1 1 -8 0 V10 a4 4 0 0 1 4 -4z"/><path d="M20 12 v14"/><circle cx="20" cy="30" r="2.5" fill={p.color||C.INK}/></>),
  Scale:  p => D(p, <><path d="M6 32 h28"/><path d="M20 32 V12"/><path d="M10 12 h20"/><path d="M14 12 l-4 8 a4 4 0 0 0 8 0 z"/><path d="M26 12 l-4 8 a4 4 0 0 0 8 0 z"/></>),
  Pencil: p => D(p, <><path d="M5 35 L25 15 l5 5 L10 40 z" transform="translate(0,-5)"/><path d="M25 10 l3 -3 a2 2 0 0 1 3 0 l2 2 a2 2 0 0 1 0 3 l-3 3"/></>),
  Cup:    p => D(p, <><path d="M8 12 h20 v14 a8 8 0 0 1 -16 0 z"/><path d="M28 16 a4 4 0 0 1 0 8"/><path d="M13 6 q1 3 0 5 M19 6 q1 3 0 5"/></>),
  Drop:   p => D(p, <path d="M20 6 q-9 12 -9 19 a9 9 0 0 0 18 0 q0 -7 -9 -19z"/>),
  Globe:  p => D(p, <><circle cx="20" cy="20" r="13"/><ellipse cx="20" cy="20" rx="6" ry="13"/><path d="M7 20 h26"/></>),
  Heart:  p => D(p, <path d="M20 32 C 8 24, 6 14, 13 11 c4 -2 7 1 7 4 c0 -3 3 -6 7 -4 c7 3 5 13 -7 21z"/>),
  Saw:    p => D(p, <><path d="M6 14 l3 4 l3 -4 l3 4 l3 -4 l3 4 l3 -4 l3 4 l3 -4 v6 H6 z"/><path d="M30 20 v10 a2 2 0 0 0 2 2 h2"/></>),
  Pin:    p => D(p, <><path d="M15 6 h10 l-2 6 l4 4 l-3 3 h-8 l-3 -3 l4 -4 z"/><path d="M20 19 v15"/></>),
  Arrow:  p => D(p, <><path d="M6 20 h26"/><path d="M26 14 l6 6 l-6 6"/></>),
  Swap:   p => D(p, <><path d="M8 14 h22 l-5 -5 M30 14 l-5 5"/><path d="M30 26 h-22 l5 -5 M8 26 l5 5"/></>),
  Bolt:   p => D(p, <path d="M22 6 L10 22 h8 L16 34 L30 18 h-8 z"/>),
  Star:   p => D(p, <path d="M20 6 l4 9 l10 1 l-7.5 7 l2 10 L20 28 l-8.5 5 l2 -10 L6 16 l10 -1 z"/>),
};

// ── Status bar ────────────────────────────────────────────────────
function MiniStatus({ time='9:41', light=false }) {
  const [now, setNow] = React.useState(() => {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
  });
  React.useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setNow(`${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`);
    }, 10000);
    return () => clearInterval(t);
  }, []);
  const col = light ? C.PAPER : C.INK;
  return (
    <div style={{
      position:'absolute', top:0, left:0, right:0, height:36, zIndex:4,
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'14px 22px 0', fontFamily:'Manrope', fontWeight:700, fontSize:12, color:col,
    }}>
      <span>{now}</span>
      <div style={{ display:'flex', gap:4, alignItems:'center', opacity:.85 }}>
        <svg width="14" height="9" viewBox="0 0 14 9"><path d="M1 8 L1 6 M4 8 L4 4 M7 8 L7 2 M10 8 L10 1 M13 8 L13 0" stroke={col} strokeWidth="1.4" strokeLinecap="round" filter="url(#sk-wob)"/></svg>
        <svg width="18" height="9" viewBox="0 0 18 9"><rect x="0.5" y="0.5" width="14" height="8" rx="1.5" fill="none" stroke={col} strokeWidth="1" filter="url(#sk-wob)"/><rect x="2" y="2" width="9" height="5" fill={col}/><rect x="15" y="3" width="2" height="3" fill={col}/></svg>
      </div>
    </div>
  );
}

// ── Back button ───────────────────────────────────────────────────
function BackBtn({ onClick, color=C.INK }) {
  return (
    <div onClick={onClick} style={{ display:'inline-flex', alignItems:'center', gap:4, cursor:'pointer', padding:'4px 2px' }}>
      <Doodle.Arrow size={22} color={color} style={{ transform:'scaleX(-1)' }}/>
    </div>
  );
}

// expose globally (other scripts need them)
Object.assign(window, {
  C, Paper, SkBox, SkUnderline, SkDivider, SkButton, SkChip, Stamp, Caption,
  SmidgeMark, Doodle, MiniStatus, BackBtn,
});
