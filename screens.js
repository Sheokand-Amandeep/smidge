// screens.js — All Smidge screen components

const { useState, useEffect, useRef, useContext, useCallback } = React;

// ════════════════════════════════════════════════════════════════
// ONBOARDING SCREENS
// ════════════════════════════════════════════════════════════════

function ScrSplash() {
  return (
    <Paper grid="splash">
      <MiniStatus/>
      <div style={{ height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, padding:24 }}>
        <div style={{ position:'relative' }}>
          <SmidgeMark size={52}/>
          <div style={{ position:'absolute', right:-28, top:-10, transform:'rotate(14deg)' }}>
            <Doodle.Spoon size={34} color={C.TERRA}/>
          </div>
        </div>
        <SkUnderline width={120} color={C.TERRA}/>
        <div className="sk-hand" style={{ fontSize:24, color:C.INK_SOFT, marginTop:4 }}>just a smidge.</div>
        <div style={{ position:'absolute', bottom:80, fontFamily:'Manrope', fontSize:11, color:C.INK_FAINT, letterSpacing:2, textTransform:'uppercase' }}>
          loading the pantry…
        </div>
      </div>
    </Paper>
  );
}

function ScrWelcome({ onNext }) {
  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'60px 24px 24px', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ position:'absolute', top:60, right:14, opacity:.6 }}><Doodle.Beaker size={44}/></div>
        <div style={{ position:'absolute', top:120, left:16, opacity:.55, transform:'rotate(-12deg)' }}><Doodle.Ruler size={44}/></div>

        <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:38, color:C.INK, lineHeight:1, letterSpacing:-1.4, marginTop:90 }}>
          Hello,<br/>welcome to{' '}
          <span style={{ position:'relative' }}>
            smidge
            <span style={{ position:'absolute', left:0, right:-2, bottom:-6 }}><SkUnderline width={120} color={C.TERRA}/></span>
          </span>.
        </div>
        <div style={{ fontFamily:'Manrope', fontWeight:400, fontSize:15, color:C.INK_SOFT, marginTop:22, lineHeight:1.5, maxWidth:240 }}>
          A tiny, careful unit converter. No ads, no chatter — just the answer, at the speed you need it.
        </div>

        <div style={{ marginTop:'auto', display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:'Caveat', fontSize:20, color:C.INK_SOFT }}>
            <span>3 quick taps to set up</span>
            <Doodle.Arrow size={24}/>
          </div>
          <SkButton fill={C.INK} color={C.PAPER} big style={{ width:'100%', height:56 }} onClick={onNext}>
            Let's begin
          </SkButton>
          <div onClick={onNext} style={{ textAlign:'center', fontFamily:'Manrope', fontWeight:500, fontSize:13, color:C.INK_FAINT, cursor:'pointer' }}>
            Skip — I'm in a hurry
          </div>
        </div>
      </div>
    </Paper>
  );
}

function ScrPickCats({ selected, onToggle, onNext }) {
  const cats = [
    { id:'length',      name:'Length',      icon:<Doodle.Ruler size={28}/>,  color:C.SKY },
    { id:'mass',        name:'Mass',        icon:<Doodle.Scale size={28}/>,  color:C.MUSTARD },
    { id:'volume',      name:'Volume',      icon:<Doodle.Beaker size={28}/>, color:C.SAGE },
    { id:'temperature', name:'Temperature', icon:<Doodle.Therm size={28}/>,  color:C.TERRA },
    { id:'cooking',     name:'Cooking',     icon:<Doodle.Cup size={28}/>,    color:C.MUSTARD },
    { id:'currency',    name:'Currency',    icon:<Doodle.Globe size={28}/>,  color:C.SAGE },
    { id:'medical',     name:'Medical',     icon:<Doodle.Heart size={28}/>,  color:C.TERRA },
    { id:'trades',      name:'Trades',      icon:<Doodle.Saw size={28}/>,    color:C.SKY },
    { id:'data',        name:'Data',        icon:<Doodle.Bolt size={28}/>,   color:C.INK_SOFT },
  ];
  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'50px 22px 24px', height:'100%', display:'flex', flexDirection:'column' }}>
        <div className="sk-hand" style={{ fontSize:18, color:C.INK_FAINT }}>step one · the pantry</div>
        <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:26, color:C.INK, lineHeight:1.05, marginTop:4, letterSpacing:-.5 }}>
          What do you measure?
        </div>
        <div style={{ fontFamily:'Manrope', fontSize:13, color:C.INK_SOFT, marginTop:8 }}>
          Tick a few. You can always add more.
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:18 }}>
          {cats.map(cat => {
            const on = selected.includes(cat.id);
            return (
              <div key={cat.id} style={{ position:'relative', height:78 }} onClick={() => onToggle(cat.id)}>
                <SkBox padding={10} style={{ width:'100%', height:'100%', cursor:'pointer' }}
                  fill={on?'rgba(196,89,58,0.08)':'transparent'}
                  stroke={on?C.TERRA:C.INK_SOFT}>
                  <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                      {cat.icon}
                      <div style={{
                        width:20, height:20, borderRadius:'50%',
                        border:`1.5px solid ${on?C.TERRA:C.INK_FAINT}`,
                        background:on?C.TERRA:'transparent',
                        display:'flex', alignItems:'center', justifyContent:'center', filter:'url(#sk-wob)',
                      }}>
                        {on && <svg width="11" height="9" viewBox="0 0 11 9"><path d="M1 4 L4 7 L10 1" stroke={C.PAPER} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                    </div>
                    <div style={{ fontFamily:'Manrope', fontWeight:600, fontSize:14, color:C.INK }}>{cat.name}</div>
                  </div>
                </SkBox>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop:'auto', display:'flex', gap:10, alignItems:'center' }}>
          <div style={{ flex:1, display:'flex', gap:6 }}>
            <span style={{ width:28, height:4, background:C.INK, borderRadius:2 }}/>
            <span style={{ width:28, height:4, background:C.INK_FAINT, opacity:.3, borderRadius:2 }}/>
            <span style={{ width:28, height:4, background:C.INK_FAINT, opacity:.3, borderRadius:2 }}/>
          </div>
          <SkButton fill={C.INK} color={C.PAPER} style={{ width:110, height:46 }} onClick={onNext}>
            Continue →
          </SkButton>
        </div>
      </div>
    </Paper>
  );
}

function ScrPref({ system, onChange, onNext }) {
  const opts = [
    { k:'metric',   label:'Metric',       sub:'g · ml · km · °C', doodle:<Doodle.Beaker size={32}/> },
    { k:'imperial', label:'Imperial',     sub:'oz · cup · mi · °F', doodle:<Doodle.Cup size={32}/> },
    { k:'both',     label:'A bit of both',sub:'show both at once', doodle:<Doodle.Swap size={32}/> },
  ];
  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'50px 22px 24px', height:'100%', display:'flex', flexDirection:'column' }}>
        <div className="sk-hand" style={{ fontSize:18, color:C.INK_FAINT }}>step two · house style</div>
        <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:26, color:C.INK, lineHeight:1.05, marginTop:4, letterSpacing:-.5 }}>
          Which side of the<br/>kitchen are you on?
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:12, marginTop:22 }}>
          {opts.map(o => (
            <SkBox key={o.k} padding={14} stroke={system===o.k?C.TERRA:C.INK_SOFT}
              fill={system===o.k?'rgba(196,89,58,0.07)':'transparent'}
              style={{ width:'100%', height:64, cursor:'pointer' }}
              onClick={() => onChange(o.k)}>
              <div style={{ display:'flex', alignItems:'center', gap:14, height:'100%' }}>
                {o.doodle}
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:15, color:C.INK }}>{o.label}</div>
                  <div style={{ fontFamily:'Manrope', fontSize:12, color:C.INK_SOFT, marginTop:2 }}>{o.sub}</div>
                </div>
                <div style={{
                  width:20, height:20, borderRadius:'50%',
                  border:`1.5px solid ${system===o.k?C.TERRA:C.INK_FAINT}`,
                  background:system===o.k?C.TERRA:'transparent', filter:'url(#sk-wob)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {system===o.k && <svg width="11" height="9" viewBox="0 0 11 9"><path d="M1 4 L4 7 L10 1" stroke={C.PAPER} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </div>
            </SkBox>
          ))}
        </div>

        <div style={{ marginTop:'auto', display:'flex', gap:10, alignItems:'center' }}>
          <div style={{ flex:1, display:'flex', gap:6 }}>
            <span style={{ width:28, height:4, background:C.INK, opacity:.4, borderRadius:2 }}/>
            <span style={{ width:28, height:4, background:C.INK, borderRadius:2 }}/>
            <span style={{ width:28, height:4, background:C.INK_FAINT, opacity:.3, borderRadius:2 }}/>
          </div>
          <SkButton fill={C.INK} color={C.PAPER} style={{ width:110, height:46 }} onClick={onNext}>
            Continue →
          </SkButton>
        </div>
      </div>
    </Paper>
  );
}

function ScrPinThree({ pins, onToggle, onDone }) {
  const opts = [
    { id:'temp',    a:'°F', b:'°C',         doodle:<Doodle.Therm size={26}/>, c:C.TERRA },
    { id:'flour',   a:'cup', b:'g · flour', doodle:<Doodle.Cup size={26}/>,   c:C.MUSTARD },
    { id:'glucose', a:'mg/dL', b:'mmol/L',  doodle:<Doodle.Drop size={26}/>,  c:C.SAGE },
    { id:'dist',    a:'mi', b:'km',         doodle:<Doodle.Ruler size={26}/>, c:C.SKY },
    { id:'weight',  a:'lb', b:'kg',         doodle:<Doodle.Scale size={26}/>, c:C.INK_SOFT },
  ];
  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'50px 22px 24px', height:'100%', display:'flex', flexDirection:'column' }}>
        <div className="sk-hand" style={{ fontSize:18, color:C.INK_FAINT }}>step three · the shortcut shelf</div>
        <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:26, color:C.INK, lineHeight:1.05, marginTop:4, letterSpacing:-.5 }}>
          Pin three you'll use<br/>most often.
        </div>

        <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:10 }}>
          {opts.map(p => {
            const on = pins.includes(p.id);
            return (
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }} onClick={() => onToggle(p.id)}>
                {p.doodle}
                <div style={{ flex:1, fontFamily:'Manrope', fontSize:14, color:C.INK, fontWeight:500 }}>
                  <span style={{ fontWeight:700 }}>{p.a}</span>
                  <span style={{ color:C.INK_FAINT, margin:'0 6px' }}>↔</span>
                  <span style={{ fontWeight:700 }}>{p.b}</span>
                </div>
                <svg width="26" height="26" viewBox="0 0 26 26" style={{ filter:'url(#sk-wob)' }}>
                  <path d="M13 4 L15 11 L22 11 L16 15 L18 22 L13 18 L8 22 L10 15 L4 11 L11 11 z"
                    fill={on?p.c:'none'} stroke={on?p.c:C.INK_FAINT} strokeWidth="1.4"/>
                </svg>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop:'auto', display:'flex', gap:10, alignItems:'center' }}>
          <div style={{ flex:1, display:'flex', gap:6 }}>
            <span style={{ width:28, height:4, background:C.INK, opacity:.4, borderRadius:2 }}/>
            <span style={{ width:28, height:4, background:C.INK, opacity:.4, borderRadius:2 }}/>
            <span style={{ width:28, height:4, background:C.INK, borderRadius:2 }}/>
          </div>
          <SkButton fill={C.TERRA} color={C.PAPER} style={{ width:130, height:46 }} onClick={onDone}>
            Start measuring
          </SkButton>
        </div>
      </div>
    </Paper>
  );
}

// ════════════════════════════════════════════════════════════════
// KEYPAD
// ════════════════════════════════════════════════════════════════

function Keypad({ onKey, exprMode=false }) {
  const rows = exprMode
    ? [['7','8','9','÷'],['4','5','6','×'],['1','2','3','−'],['.','0','=','+']]
    : [['7','8','9'],['4','5','6'],['1','2','3'],['.','0','⌫']];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6, padding:'8px 14px 16px' }}>
      {rows.map((row,i) => (
        <div key={i} style={{ display:'flex', gap:6 }}>
          {row.map((k,j) => {
            const accent = exprMode && k === '=';
            return (
              <div key={j} onClick={() => onKey(k)}
                style={{ position:'relative', flex: k==='.' || k==='0' || k==='⌫' ? 1 : 1, height:50, cursor:'pointer', userSelect:'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none" style={{ position:'absolute', inset:0 }}>
                  <rect x="2" y="2" width="96" height="46" rx="6"
                    fill={accent?C.TERRA:'rgba(255,255,255,0.45)'} stroke={accent?C.TERRA:C.INK_SOFT}
                    strokeWidth="1.2" filter="url(#sk-wob)" vectorEffect="non-scaling-stroke"/>
                </svg>
                <div style={{ position:'relative', height:'100%', display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'Manrope', fontWeight:600, fontSize:22, color:accent?C.PAPER:C.INK }}>
                  {k}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// HOME SCREEN — Core converter
// ════════════════════════════════════════════════════════════════

function ScrHome({ state, dispatch, navigate }) {
  const { category, fromUnit, toUnit, expression, exprMode, inputSide, pins } = state;
  const cat = UNIT_CATEGORIES[category] || UNIT_CATEGORIES['length'];
  const units = cat.units || {};

  const fromSym = units[fromUnit]?.sym || fromUnit;
  const toSym   = units[toUnit]?.sym   || toUnit;
  const fromName = units[fromUnit]?.name || fromUnit;
  const toName   = units[toUnit]?.name   || toUnit;

  // Evaluate expression to get current numeric value
  const parsedVal = evalExpr(expression) ?? parseFloat(expression);
  const isFromActive = inputSide === 'from';

  let fromVal, toVal;
  if (isFinite(parsedVal)) {
    if (isFromActive) {
      fromVal = expression;
      toVal = fmt(convert(parsedVal, fromUnit, toUnit, category));
    } else {
      toVal = expression;
      fromVal = fmt(convert(parsedVal, toUnit, fromUnit, category));
    }
  } else {
    fromVal = isFromActive ? expression : '';
    toVal   = !isFromActive ? expression : '';
  }

  const onKey = useCallback((k) => {
    dispatch({ type:'KEY', key:k });
  }, [dispatch]);

  const cats = Object.entries(UNIT_CATEGORIES).slice(0,4);

  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
        {/* Top bar */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 18px 6px' }}>
          <SmidgeMark size={22}/>
          <div style={{ display:'flex', gap:10 }}>
            <div onClick={() => navigate('pins')} style={{ cursor:'pointer' }}>
              <Doodle.Pin size={22} color={C.INK_SOFT}/>
            </div>
            <div onClick={() => navigate('library')} style={{ cursor:'pointer', display:'flex', alignItems:'center' }}>
              <svg width="20" height="14" viewBox="0 0 20 14"><path d="M1 2 h18 M1 7 h18 M1 12 h18" stroke={C.INK_SOFT} strokeWidth="1.6" strokeLinecap="round" filter="url(#sk-wob)"/></svg>
            </div>
          </div>
        </div>

        {/* Pinned shelf */}
        <PinnedShelf pins={pins} activeCategory={category} dispatch={dispatch} navigate={navigate}/>

        {/* Category strip */}
        <div style={{ display:'flex', gap:8, padding:'12px 16px 6px', overflowX:'auto', scrollbarWidth:'none' }}>
          {Object.entries(UNIT_CATEGORIES).map(([id, cat]) => (
            <SkChip key={id}
              fill={id===category?C.INK:'transparent'}
              stroke={id===category?C.INK:C.INK_FAINT}
              color={id===category?C.PAPER:C.INK}
              style={{ height:30, whiteSpace:'nowrap', flexShrink:0, cursor:'pointer' }}
              onClick={() => dispatch({ type:'SET_CATEGORY', category:id })}>
              {cat.name}
            </SkChip>
          ))}
        </div>

        {/* Conversion card */}
        <div style={{ padding:'6px 16px' }}>
          <SkBox padding={0} double stroke={C.INK} radius={20} style={{ width:'100%' }}>
            <div style={{ padding:18, position:'relative' }}>
              {/* FROM side */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <div className="sk-hand" style={{ fontSize:18, color:C.INK_FAINT }}>from</div>
                <div onClick={() => navigate('unitPicker',{side:'from'})}
                  style={{ fontFamily:'Manrope', fontWeight:600, fontSize:12, color:C.INK_SOFT, cursor:'pointer' }}>
                  {fromName} <span style={{ color:C.INK_FAINT }}>↓</span>
                </div>
              </div>
              <div onClick={() => dispatch({ type:'SET_SIDE', side:'from' })}
                style={{ display:'flex', alignItems:'baseline', gap:6, marginTop:4, cursor:'pointer' }}>
                <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:52, color:C.INK, lineHeight:1, letterSpacing:-2, minHeight:58 }}>
                  {isFromActive && exprMode
                    ? <span>{expression || '0'}</span>
                    : <span>{fromVal || '0'}</span>}
                </div>
                <div style={{ fontFamily:'Manrope', fontSize:18, color:C.INK_SOFT, fontWeight:600 }}>{fromSym}</div>
                {isFromActive && <div style={{ marginLeft:'auto', width:2, height:26, background:C.TERRA, animation:'blink 1s infinite' }}/>}
              </div>
              {exprMode && isFromActive && (
                <div className="sk-hand" style={{ fontSize:16, color:C.INK_SOFT, marginTop:2 }}>
                  = {isFinite(parsedVal) ? fmt(parsedVal) : '?'}
                </div>
              )}

              {/* Swap divider */}
              <div style={{ display:'flex', alignItems:'center', gap:10, margin:'14px 0 10px' }}>
                <div style={{ flex:1, height:1, background:`repeating-linear-gradient(90deg,${C.INK_SOFT} 0 4px,transparent 4px 8px)` }}/>
                <div onClick={() => dispatch({ type:'SWAP' })}
                  style={{ width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', cursor:'pointer' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" style={{ position:'absolute' }}>
                    <circle cx="18" cy="18" r="16" fill={C.PAPER} stroke={C.INK} strokeWidth="1.6" filter="url(#sk-wob)"/>
                  </svg>
                  <Doodle.Swap size={20}/>
                </div>
                <div style={{ flex:1, height:1, background:`repeating-linear-gradient(90deg,${C.INK_SOFT} 0 4px,transparent 4px 8px)` }}/>
              </div>

              {/* TO side */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <div className="sk-hand" style={{ fontSize:18, color:C.INK_FAINT }}>to</div>
                <div onClick={() => navigate('unitPicker',{side:'to'})}
                  style={{ fontFamily:'Manrope', fontWeight:600, fontSize:12, color:C.INK_SOFT, cursor:'pointer' }}>
                  {toName} <span style={{ color:C.INK_FAINT }}>↓</span>
                </div>
              </div>
              <div onClick={() => dispatch({ type:'SET_SIDE', side:'to' })}
                style={{ display:'flex', alignItems:'baseline', gap:6, marginTop:4, cursor:'pointer' }}>
                <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:52, color:C.TERRA, lineHeight:1, letterSpacing:-2, minHeight:58 }}>
                  {!isFromActive && exprMode
                    ? <span>{expression || '0'}</span>
                    : <span>{toVal || '0'}</span>}
                </div>
                <div style={{ fontFamily:'Manrope', fontSize:18, color:C.INK_SOFT, fontWeight:600 }}>{toSym}</div>
                {!isFromActive && <div style={{ marginLeft:'auto', width:2, height:26, background:C.TERRA, animation:'blink 1s infinite' }}/>}
              </div>

              {/* Also row */}
              <div style={{ marginTop:10, paddingTop:8, borderTop:`1px dashed ${C.INK_FAINT}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div className="sk-hand" style={{ fontSize:14, color:C.INK_SOFT }}>
                  {isFinite(parsedVal) && <AlsoRow value={parsedVal} fromUnit={fromUnit} toUnit={toUnit} category={category} isFromSide={isFromActive}/>}
                </div>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <div onClick={() => dispatch({ type:'TOGGLE_EXPR' })}
                    style={{ cursor:'pointer' }}>
                    <SkChip fill={exprMode?C.TERRA:'transparent'} stroke={exprMode?C.TERRA:C.INK_FAINT}
                      color={exprMode?C.PAPER:C.INK_SOFT} style={{ height:22 }}>
                      <span style={{ fontSize:10 }}>= math</span>
                    </SkChip>
                  </div>
                  <div onClick={() => navigate('multi')} style={{ fontFamily:'Manrope', fontSize:11, color:C.INK_FAINT, cursor:'pointer' }}>all →</div>
                </div>
              </div>
            </div>
          </SkBox>
        </div>

        <Keypad onKey={onKey} exprMode={exprMode}/>
      </div>
    </Paper>
  );
}

function AlsoRow({ value, fromUnit, toUnit, category }) {
  const cat = UNIT_CATEGORIES[category];
  if (!cat || cat.special) return null;
  const units = cat.units;
  // Show a couple of nearby units
  const extras = Object.keys(units).filter(u => u !== fromUnit && u !== toUnit).slice(0,2);
  if (!extras.length) return null;
  return (
    <span>
      {extras.map(u => `${fmt(convert(value, fromUnit, u, category))} ${units[u].sym}`).join(' · ')}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════
// PINNED SHELF
// ════════════════════════════════════════════════════════════════

function PinnedShelf({ pins, activeCategory, dispatch, navigate }) {
  const PIN_DEFS = {
    temp:    { a:'°F', b:'°C', doodle:<Doodle.Therm size={20}/>, c:C.TERRA, category:'temperature', from:'F', to:'C' },
    flour:   { a:'cup', b:'g', doodle:<Doodle.Cup size={20}/>,   c:C.MUSTARD, category:'cooking' },
    glucose: { a:'mg/dL', b:'mmol/L', doodle:<Doodle.Drop size={20}/>, c:C.SAGE, category:'medical' },
    dist:    { a:'mi', b:'km', doodle:<Doodle.Ruler size={20}/>, c:C.SKY, category:'length', from:'mi', to:'km' },
    weight:  { a:'lb', b:'kg', doodle:<Doodle.Scale size={20}/>, c:C.INK_SOFT, category:'mass', from:'lb', to:'kg' },
  };
  const show = (pins || ['temp','flour','glucose']).slice(0,3);
  return (
    <div style={{ display:'flex', gap:6, padding:'0 16px' }}>
      {show.map((id,i) => {
        const p = PIN_DEFS[id];
        if (!p) return null;
        const active = p.category === activeCategory;
        return (
          <div key={id} style={{ flex:1, position:'relative', cursor:'pointer' }}
            onClick={() => {
              if (['cooking','medical','trades','currency'].includes(p.category)) {
                navigate(p.category);
              } else {
                dispatch({ type:'SET_CATEGORY', category:p.category, fromUnit:p.from, toUnit:p.to });
              }
            }}>
            <SkBox padding={6} stroke={active?C.INK:C.INK_FAINT}
              fill={active?C.PAPER:'rgba(0,0,0,0.02)'}
              style={{ width:'100%', height:40 }}>
              <div style={{ display:'flex', alignItems:'center', gap:5, height:'100%' }}>
                {p.doodle}
                <div style={{ fontFamily:'Manrope', fontWeight:600, fontSize:11, color:C.INK, lineHeight:1.1 }}>
                  {p.a}<br/><span style={{ color:C.INK_FAINT }}>↓ {p.b}</span>
                </div>
              </div>
            </SkBox>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MULTI-UNIT VIEW
// ════════════════════════════════════════════════════════════════

function ScrMulti({ state, navigate }) {
  const { category, fromUnit, expression } = state;
  const cat = UNIT_CATEGORIES[category];
  if (!cat) return null;
  const val = evalExpr(expression) ?? parseFloat(expression) ?? 1;
  const units = cat.units;

  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 18px 18px', height:'100%', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <BackBtn onClick={() => navigate('back')}/>
            <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:18, color:C.INK }}>
              {cat.name} <span className="sk-hand" style={{ color:C.INK_FAINT, fontSize:16 }}> · all at once</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop:12, padding:14, position:'relative' }}>
          <SkBox padding={12} fill="rgba(196,89,58,0.05)" stroke={C.TERRA} radius={16} style={{ width:'100%' }}>
            <div className="sk-hand" style={{ fontSize:16, color:C.INK_SOFT }}>input</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
              <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:40, color:C.INK, lineHeight:1, letterSpacing:-1.5 }}>
                {isFinite(val) ? fmt(val) : expression}
              </div>
              <div style={{ fontFamily:'Manrope', fontWeight:600, fontSize:16, color:C.INK_SOFT }}>
                {units[fromUnit]?.name || fromUnit}
              </div>
            </div>
          </SkBox>
        </div>

        <SkDivider style={{ margin:'4px 0' }}/>

        <div style={{ flex:1, overflowY:'auto', marginTop:8 }}>
          {Object.entries(units)
            .filter(([k]) => k !== fromUnit)
            .map(([key, u], i) => {
              const result = isFinite(val) ? (cat.special ? convertTemp(val, fromUnit, key) : convert(val, fromUnit, key, category)) : NaN;
              return (
                <div key={key} style={{ display:'flex', alignItems:'baseline', gap:8, padding:'4px 4px', borderBottom:`1px dashed ${C.INK_FAINT}55` }}>
                  <div style={{ flex:1, fontFamily:'Manrope', fontSize:13, color:C.INK_SOFT, fontWeight:500 }}>{u.name}</div>
                  <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:17, color:C.INK, letterSpacing:-.4 }}>{fmt(result)}</div>
                  <div style={{ fontFamily:'Manrope', fontSize:11, color:C.INK_FAINT, width:36, textAlign:'right' }}>{u.sym}</div>
                </div>
              );
            })}
        </div>
      </div>
    </Paper>
  );
}

// ════════════════════════════════════════════════════════════════
// LIBRARY
// ════════════════════════════════════════════════════════════════

function ScrLibrary({ navigate, dispatch, activeCategory }) {
  const [search, setSearch] = useState('');
  const cats = [
    { id:'length',      doodle:<Doodle.Ruler size={28}/>,  color:C.SKY,      desc:'17 units · m, km, mi, ft…' },
    { id:'mass',        doodle:<Doodle.Scale size={28}/>,  color:C.MUSTARD,  desc:'7 units · kg, lb, oz…' },
    { id:'volume',      doodle:<Doodle.Beaker size={28}/>, color:C.SAGE,     desc:'11 units · L, cup, gal…' },
    { id:'temperature', doodle:<Doodle.Therm size={28}/>,  color:C.TERRA,    desc:'4 scales · °C, °F, K, °R' },
    { id:'area',        doodle:<Doodle.Ruler size={28}/>,  color:C.SKY,      desc:'8 units · m², ft², ha…' },
    { id:'speed',       doodle:<Doodle.Arrow size={28}/>,  color:C.SKY,      desc:'5 units · km/h, mph…' },
    { id:'time',        doodle:<Doodle.Bolt size={28}/>,   color:C.INK_SOFT, desc:'8 units · s, min, hr, day…' },
    { id:'data',        doodle:<Doodle.Bolt size={28}/>,   color:C.INK_SOFT, desc:'6 units · B, KB, MB, GB…' },
    { id:'pressure',    doodle:<Doodle.Drop size={28}/>,   color:C.SAGE,     desc:'7 units · Pa, psi, bar…' },
    { id:'energy',      doodle:<Doodle.Bolt size={28}/>,   color:C.MUSTARD,  desc:'7 units · J, cal, kWh…' },
    { id:'cooking',     doodle:<Doodle.Cup size={28}/>,    color:C.MUSTARD,  desc:'19 ingredients · density-aware' },
    { id:'medical',     doodle:<Doodle.Heart size={28}/>,  color:C.TERRA,    desc:'Glucose · clinical ranges' },
    { id:'trades',      doodle:<Doodle.Saw size={28}/>,    color:C.SKY,      desc:'Compound ft-in-fraction' },
    { id:'currency',    doodle:<Doodle.Globe size={28}/>,  color:C.SAGE,     desc:'14 currencies · static rates' },
  ];
  const filtered = search
    ? cats.filter(c => {
        const cat = UNIT_CATEGORIES[c.id];
        const name = cat?.name || c.id;
        const units = cat ? Object.values(cat.units||{}).map(u => u.name+' '+u.sym).join(' ') : '';
        return (name+' '+units+' '+c.desc).toLowerCase().includes(search.toLowerCase());
      })
    : cats;

  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 18px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <BackBtn onClick={() => navigate('back')}/>
            <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:22, color:C.INK, letterSpacing:-.5 }}>The library</div>
          </div>
        </div>

        <div style={{ padding:'10px 16px' }}>
          <SkBox padding={10} radius={14} stroke={C.INK_FAINT} fill="rgba(255,255,255,0.4)" style={{ width:'100%', height:38 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, height:'100%' }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5" fill="none" stroke={C.INK_SOFT} strokeWidth="1.4" filter="url(#sk-wob)"/><path d="M10 10 L13 13" stroke={C.INK_SOFT} strokeWidth="1.4" strokeLinecap="round" filter="url(#sk-wob)"/></svg>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder='Search 200+ units… "smidge", "cmH₂O"'
                style={{ border:'none', background:'transparent', fontFamily:'Manrope', fontSize:13, color:C.INK, outline:'none', flex:1, padding:0 }}/>
            </div>
          </SkBox>
        </div>

        <div style={{ padding:'4px 16px', overflowY:'auto', flex:1 }}>
          {filtered.map((c, i) => {
            const cat = UNIT_CATEGORIES[c.id];
            const name = cat?.name || c.id;
            return (
              <div key={c.id} onClick={() => {
                if (['cooking','medical','trades','currency'].includes(c.id)) {
                  navigate(c.id);
                } else {
                  dispatch({ type:'SET_CATEGORY', category:c.id });
                  navigate('home');
                }
              }}
                style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 4px', borderBottom:`1px dashed ${C.INK_FAINT}66`, cursor:'pointer' }}>
                <div style={{
                  width:44, height:44, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center',
                  background:`${c.color}22`, position:'relative',
                }}>
                  <svg width="44" height="44" viewBox="0 0 44 44" style={{ position:'absolute', inset:0 }}>
                    <rect x="2" y="2" width="40" height="40" rx="9" fill="none" stroke={c.color} strokeWidth="1.4" filter="url(#sk-wob)"/>
                  </svg>
                  {c.doodle}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:15, color:C.INK }}>{name}</div>
                  <div style={{ fontFamily:'Manrope', fontSize:11, color:C.INK_SOFT, marginTop:2 }}>{c.desc}</div>
                </div>
                <Doodle.Arrow size={20} color={C.INK_FAINT}/>
              </div>
            );
          })}
        </div>
      </div>
    </Paper>
  );
}

// ════════════════════════════════════════════════════════════════
// UNIT PICKER
// ════════════════════════════════════════════════════════════════

function ScrUnitPicker({ state, dispatch, navigate, params }) {
  const { side } = params;
  const { category } = state;
  const cat = UNIT_CATEGORIES[category];
  const [search, setSearch] = useState('');

  if (!cat) return null;
  const units = Object.entries(cat.units || {});
  const filtered = search
    ? units.filter(([k,u]) => (u.name+' '+u.sym).toLowerCase().includes(search.toLowerCase()))
    : units;

  const currentUnit = side === 'from' ? state.fromUnit : state.toUnit;

  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 18px 8px', display:'flex', alignItems:'center', gap:10 }}>
          <BackBtn onClick={() => navigate('back')}/>
          <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:16, color:C.INK }}>
            Pick a unit · {cat.name}
          </div>
        </div>

        <div style={{ padding:'4px 16px 6px' }}>
          <SkBox padding={10} radius={14} stroke={C.INK} fill="rgba(255,255,255,0.6)" style={{ width:'100%', height:42 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, height:'100%' }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5" fill="none" stroke={C.INK_SOFT} strokeWidth="1.4" filter="url(#sk-wob)"/><path d="M10 10 L13 13" stroke={C.INK_SOFT} strokeWidth="1.4" strokeLinecap="round" filter="url(#sk-wob)"/></svg>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder={`Search ${cat.name.toLowerCase()} units…`}
                style={{ border:'none', background:'transparent', fontFamily:'Manrope', fontSize:14, color:C.INK, outline:'none', flex:1, padding:0 }}/>
            </div>
          </SkBox>
        </div>

        <div style={{ padding:'0 16px', flex:1, overflowY:'auto' }}>
          {filtered.map(([key, u]) => (
            <div key={key}
              onClick={() => { dispatch({ type:'SET_UNIT', side, unit:key }); navigate('back'); }}
              style={{ display:'flex', alignItems:'center', padding:'11px 4px', borderBottom:`1px dashed ${C.INK_FAINT}55`, cursor:'pointer' }}>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'Manrope', fontWeight:600, fontSize:14, color:C.INK }}>
                  {u.name}
                  {key === currentUnit && <span style={{ fontFamily:'Manrope', fontSize:11, color:C.TERRA, marginLeft:8 }}>✓ current</span>}
                </div>
                {u.sym !== u.name.split(' ')[0] && (
                  <div style={{ fontFamily:'Manrope', fontSize:11, color:C.INK_SOFT, marginTop:2 }}>symbol: {u.sym}</div>
                )}
              </div>
              <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:13, color:C.INK_FAINT }}>{u.sym}</div>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
}

// ════════════════════════════════════════════════════════════════
// COOKING SCREEN
// ════════════════════════════════════════════════════════════════

function ScrCooking({ state, dispatch, navigate }) {
  const [ingredient, setIngredient] = useState(INGREDIENTS[0].id);
  const [cups, setCups] = useState('2.5');
  const [target, setTarget] = useState('g');
  const [showIngPicker, setShowIngPicker] = useState(false);
  const [ingSearch, setIngSearch] = useState('');

  const cval = parseFloat(cups) || 0;
  const result = cookingConvert(cval, ingredient, target);
  const ing = INGREDIENTS.find(i => i.id === ingredient) || INGREDIENTS[0];

  const targets = [
    { k:'g', l:'grams' }, { k:'oz', l:'oz' }, { k:'lb', l:'lb' }, { k:'kg', l:'kg' }, { k:'mL', l:'mL' },
  ];

  const onKey = (k) => {
    if (k === '⌫') { setCups(v => v.slice(0,-1)||'0'); return; }
    if (k === '.') { if (!cups.includes('.')) setCups(v => v+'.'); return; }
    if (cups === '0') { setCups(k); return; }
    setCups(v => v+k);
  };

  const filteredIngs = ingSearch
    ? INGREDIENTS.filter(i => i.name.toLowerCase().includes(ingSearch.toLowerCase()))
    : INGREDIENTS;

  if (showIngPicker) {
    return (
      <Paper>
        <MiniStatus/>
        <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'0 18px 8px', display:'flex', alignItems:'center', gap:10 }}>
            <BackBtn onClick={() => setShowIngPicker(false)}/>
            <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:16, color:C.INK }}>Choose ingredient</div>
          </div>
          <div style={{ padding:'4px 16px 6px' }}>
            <SkBox padding={10} radius={14} stroke={C.INK} fill="rgba(255,255,255,0.6)" style={{ width:'100%', height:42 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, height:'100%' }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5" fill="none" stroke={C.INK_SOFT} strokeWidth="1.4" filter="url(#sk-wob)"/></svg>
                <input value={ingSearch} onChange={e=>setIngSearch(e.target.value)}
                  placeholder="flour, sugar, butter…"
                  style={{ border:'none', background:'transparent', fontFamily:'Manrope', fontSize:14, color:C.INK, outline:'none', flex:1, padding:0 }}/>
              </div>
            </SkBox>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'0 16px' }}>
            {filteredIngs.map(i => (
              <div key={i.id} onClick={() => { setIngredient(i.id); setShowIngPicker(false); }}
                style={{ padding:'12px 4px', borderBottom:`1px dashed ${C.INK_FAINT}55`, cursor:'pointer' }}>
                <div style={{ fontFamily:'Manrope', fontWeight:600, fontSize:14, color:C.INK }}>{i.name}</div>
                <div style={{ fontFamily:'Manrope', fontSize:11, color:C.INK_SOFT, marginTop:2 }}>1 US cup = {i.g} g</div>
              </div>
            ))}
          </div>
        </div>
      </Paper>
    );
  }

  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 18px 6px', display:'flex', alignItems:'center', gap:10 }}>
          <BackBtn onClick={() => navigate('back')}/>
          <div style={{ flex:1, fontFamily:'Manrope', fontWeight:700, fontSize:18, color:C.INK }}>
            In the kitchen <Doodle.Cup size={18} color={C.MUSTARD} style={{ verticalAlign:'middle', marginLeft:4 }}/>
          </div>
          <Stamp color={C.MUSTARD} rotate={4}>density-aware</Stamp>
        </div>

        <div style={{ padding:'8px 16px 0' }}>
          <SkBox padding={12} radius={14} stroke={C.INK} fill="rgba(255,255,255,0.5)" onClick={() => setShowIngPicker(true)} style={{ cursor:'pointer' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:`${C.MUSTARD}33`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Doodle.Cup size={24}/>
              </div>
              <div style={{ flex:1 }}>
                <div className="sk-hand" style={{ fontSize:14, color:C.INK_FAINT }}>ingredient</div>
                <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:15, color:C.INK }}>{ing.name}</div>
              </div>
              <Doodle.Arrow size={20} color={C.INK_SOFT}/>
            </div>
          </SkBox>
        </div>

        <div style={{ padding:'12px 16px 0' }}>
          <SkBox padding={0} radius={20} stroke={C.INK} double>
            <div style={{ padding:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <div className="sk-hand" style={{ fontSize:17, color:C.INK_FAINT }}>from</div>
                <div style={{ fontFamily:'Manrope', fontWeight:600, fontSize:11, color:C.INK_SOFT }}>US cups</div>
              </div>
              <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:44, color:C.INK, lineHeight:1, letterSpacing:-1.5, marginTop:2 }}>
                {cups || '0'}
              </div>
              <div style={{ margin:'10px 0', height:1, background:`repeating-linear-gradient(90deg,${C.INK_SOFT} 0 3px,transparent 3px 7px)` }}/>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <div className="sk-hand" style={{ fontSize:17, color:C.INK_FAINT }}>to</div>
                <div style={{ display:'flex', gap:4 }}>
                  {targets.map(t => (
                    <SkChip key={t.k} fill={target===t.k?C.INK:'transparent'} stroke={target===t.k?C.INK:C.INK_FAINT}
                      color={target===t.k?C.PAPER:C.INK_SOFT} style={{ height:22, cursor:'pointer' }}
                      onClick={() => setTarget(t.k)}>
                      <span style={{ fontSize:10 }}>{t.k}</span>
                    </SkChip>
                  ))}
                </div>
              </div>
              <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:44, color:C.TERRA, lineHeight:1, letterSpacing:-1.5, marginTop:2 }}>
                {fmt(result, 1)}
              </div>
              <div style={{ fontFamily:'Manrope', fontSize:13, color:C.INK_SOFT, fontWeight:600 }}>{target}</div>
            </div>
          </SkBox>
        </div>

        <div style={{ padding:'10px 16px 0' }}>
          <SkBox padding={10} radius={12} stroke={C.INK_FAINT} fill="rgba(200,154,58,0.10)" dashed>
            <div style={{ fontFamily:'Manrope', fontSize:12, color:C.INK_SOFT, lineHeight:1.45 }}>
              <span style={{ fontWeight:700, color:C.INK }}>1 US cup {ing.name.split(',')[0].toLowerCase()} ≈ {ing.g} g.</span>
              {' '}Density per USDA FoodData Central.
            </div>
          </SkBox>
        </div>

        <div style={{ marginTop:'auto' }}>
          <Keypad onKey={onKey}/>
        </div>
      </div>
    </Paper>
  );
}

// ════════════════════════════════════════════════════════════════
// MEDICAL SCREEN
// ════════════════════════════════════════════════════════════════

function ScrMedical({ navigate }) {
  const [mgdL, setMgdL] = useState('94');
  const [inputUnit, setInputUnit] = useState('mgdL');

  const numVal = parseFloat(mgdL) || 0;
  let actualMgdL = inputUnit === 'mgdL' ? numVal : numVal * GLUCOSE_FACTOR;
  const converted = inputUnit === 'mgdL'
    ? fmt(convertGlucose(numVal,'mgdL','mmolL'), 2)
    : fmt(convertGlucose(numVal,'mmolL','mgdL'), 0);

  const range = glucoseRange(actualMgdL);

  const onKey = (k) => {
    if (k === '⌫') { setMgdL(v => v.slice(0,-1)||'0'); return; }
    if (k === '.') { if (!mgdL.includes('.')) setMgdL(v => v+'.'); return; }
    if (mgdL === '0') { setMgdL(k); return; }
    setMgdL(v => v.length < 6 ? v+k : v);
  };

  const fromSym = inputUnit === 'mgdL' ? 'mg/dL' : 'mmol/L';
  const toSym   = inputUnit === 'mgdL' ? 'mmol/L' : 'mg/dL';

  // Range bar — 4 segments
  const segs = [
    { w:20, color:C.SKY,    label:'< 70',    sub:'low' },
    { w:35, color:C.SAGE,   label:'70–99',   sub:'normal' },
    { w:20, color:C.MUSTARD,label:'100–125', sub:'pre-diab' },
    { w:25, color:C.TERRA,  label:'≥ 126',   sub:'diabetic' },
  ];
  const markerPct = Math.min(98, Math.max(2, range.pct));

  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 18px 4px', display:'flex', alignItems:'center', gap:8 }}>
          <BackBtn onClick={() => navigate('back')}/>
          <div style={{ flex:1, fontFamily:'Manrope', fontWeight:700, fontSize:18, color:C.INK }}>
            Medical <Doodle.Drop size={18} color={C.TERRA} style={{ verticalAlign:'middle' }}/>
          </div>
          <Stamp color={C.TERRA} rotate={-4}>not a diagnosis</Stamp>
        </div>

        <div style={{ padding:'6px 16px 0' }}>
          <div style={{ display:'flex', gap:6 }}>
            {['Glucose','HbA1c','Cholest.','Creat.','Trig.'].map((t,i) => (
              <SkChip key={i} fill={i===0?C.TERRA:'transparent'} stroke={i===0?C.TERRA:C.INK_FAINT} color={i===0?C.PAPER:C.INK_SOFT}>
                <span style={{ fontSize:11 }}>{t}</span>
              </SkChip>
            ))}
          </div>
        </div>

        <div style={{ padding:'10px 16px 0' }}>
          <SkBox padding={0} radius={20} stroke={C.INK} double>
            <div style={{ padding:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <div className="sk-hand" style={{ fontSize:17, color:C.INK_FAINT }}>blood glucose</div>
                <div onClick={() => setInputUnit(v => v==='mgdL'?'mmolL':'mgdL')}
                  style={{ fontFamily:'Manrope', fontWeight:600, fontSize:11, color:C.INK_SOFT, cursor:'pointer' }}>
                  {fromSym} ↕
                </div>
              </div>
              <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:46, color:C.INK, lineHeight:1, letterSpacing:-1.6 }}>
                {mgdL}
              </div>
              <div style={{ fontFamily:'Manrope', fontSize:14, color:C.INK_SOFT, fontWeight:600 }}>{fromSym}</div>

              <div style={{ margin:'10px 0', height:1, background:`repeating-linear-gradient(90deg,${C.INK_SOFT} 0 3px,transparent 3px 7px)` }}/>

              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div className="sk-hand" style={{ fontSize:17, color:C.INK_FAINT }}>=</div>
                <div style={{ fontFamily:'Manrope', fontWeight:600, fontSize:11, color:C.INK_SOFT }}>{toSym}</div>
              </div>
              <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:46, color:C.TERRA, lineHeight:1, letterSpacing:-1.6 }}>
                {converted}
              </div>
              <div style={{ fontFamily:'Manrope', fontSize:14, color:C.INK_SOFT, fontWeight:600 }}>{toSym}</div>
            </div>
          </SkBox>
        </div>

        {/* Range bar */}
        <div style={{ padding:'14px 18px 0' }}>
          <div className="sk-hand" style={{ fontSize:16, color:C.INK_FAINT, marginBottom:8 }}>where this sits · fasting (ADA)</div>
          <div style={{ position:'relative', height:54 }}>
            <div style={{ display:'flex', height:18, borderRadius:4, overflow:'hidden', filter:'url(#sk-wob)' }}>
              {segs.map((s,i) => (
                <div key={i} style={{ flex:s.w, background:s.color, opacity:.85 }}/>
              ))}
            </div>
            {/* marker */}
            <div style={{ position:'absolute', top:0, left:`${markerPct}%`, transform:'translateX(-50%)', width:2, height:28, background:C.INK, filter:'url(#sk-wob)' }}/>
            <div style={{ position:'absolute', top:-10, left:`${markerPct}%`, transform:'translateX(-50%)', width:10, height:10, borderRadius:'50%', background:C.INK, filter:'url(#sk-wob)' }}/>
            {/* labels */}
            <div style={{ display:'flex', position:'absolute', bottom:0, left:0, right:0, fontFamily:'Manrope', fontSize:9.5, color:C.INK_SOFT }}>
              {segs.map((s,i) => (
                <div key={i} style={{ flex:s.w, textAlign:'center' }}>
                  <span style={{ color:s.color, fontWeight:700 }}>{s.sub}</span><br/>{s.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding:'18px 16px 0' }}>
          <SkBox padding={10} radius={12} fill={`${range.color}1a`} stroke={range.color} dashed>
            <div className="sk-hand" style={{ fontSize:17, color:C.INK, lineHeight:1.1 }}>
              {range.label}. {range.label === 'Normal' ? '🌿' : range.label === 'Low' ? '❄️' : range.label === 'Pre-diab.' ? '⚠️' : '🔴'}
            </div>
            <div style={{ fontFamily:'Manrope', fontSize:11, color:C.INK_SOFT, marginTop:3 }}>
              ADA reference · educational only — discuss with your clinician.
            </div>
          </SkBox>
        </div>

        <div style={{ marginTop:'auto' }}>
          <Keypad onKey={onKey}/>
        </div>
      </div>
    </Paper>
  );
}

// ════════════════════════════════════════════════════════════════
// TRADES SCREEN
// ════════════════════════════════════════════════════════════════

function ScrTrades({ navigate }) {
  const [mm, setMm] = useState('1847');
  const [denom, setDenom] = useState(16);

  const numMm = parseFloat(mm) || 0;
  const frac = mmToFtInFrac(numMm, denom);
  const alsoFt = numMm / 304.8;
  const alsoIn = numMm / 25.4;

  const onKey = (k) => {
    if (k === '⌫') { setMm(v => v.slice(0,-1)||'0'); return; }
    if (k === '.') { if (!mm.includes('.')) setMm(v => v+'.'); return; }
    if (mm === '0') { setMm(k); return; }
    setMm(v => v.length < 7 ? v+k : v);
  };

  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 18px 4px', display:'flex', alignItems:'center', gap:10 }}>
          <BackBtn onClick={() => navigate('back')}/>
          <div style={{ flex:1, fontFamily:'Manrope', fontWeight:700, fontSize:18, color:C.INK }}>
            Trades <Doodle.Saw size={18} color={C.SKY} style={{ verticalAlign:'middle' }}/>
          </div>
          <Stamp color={C.SKY} rotate={4}>compound</Stamp>
        </div>

        <div style={{ padding:'6px 16px' }}>
          <div style={{ display:'flex', gap:6 }}>
            {['1/8″','1/16″','1/32″','1/64″','decimal'].map((t,i) => {
              const ds = [8,16,32,64,0][i];
              const active = i === 4 ? denom===0 : denom===ds;
              return (
                <SkChip key={t} fill={active?C.INK:'transparent'} stroke={active?C.INK:C.INK_FAINT} color={active?C.PAPER:C.INK_SOFT}
                  style={{ cursor:'pointer' }} onClick={() => setDenom(ds)}>
                  <span style={{ fontSize:11 }}>{t}</span>
                </SkChip>
              );
            })}
          </div>
        </div>

        <div style={{ padding:'10px 16px 0' }}>
          <SkBox padding={0} radius={20} stroke={C.INK} double>
            <div style={{ padding:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <div className="sk-hand" style={{ fontSize:17, color:C.INK_FAINT }}>decimal</div>
                <div style={{ fontFamily:'Manrope', fontWeight:600, fontSize:11, color:C.INK_SOFT }}>millimetres</div>
              </div>
              <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:46, color:C.INK, lineHeight:1, letterSpacing:-1.6 }}>
                {mm || '0'}
              </div>
              <div style={{ fontFamily:'Manrope', fontSize:14, color:C.INK_SOFT, fontWeight:600 }}>mm</div>

              <div style={{ margin:'10px 0', height:1, background:`repeating-linear-gradient(90deg,${C.INK_SOFT} 0 3px,transparent 3px 7px)` }}/>

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <div className="sk-hand" style={{ fontSize:17, color:C.INK_FAINT }}>compound</div>
                <div style={{ fontFamily:'Manrope', fontWeight:600, fontSize:11, color:C.INK_SOFT }}>ft-in-frac · 1/{denom||'dec'}″</div>
              </div>
              {denom === 0 ? (
                <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:36, color:C.TERRA, lineHeight:1 }}>
                  {fmt(alsoFt, 4)} ft
                </div>
              ) : (
                <div style={{ display:'flex', alignItems:'baseline', gap:8, marginTop:4, flexWrap:'wrap' }}>
                  <span style={{ fontFamily:'Manrope', fontWeight:800, fontSize:38, color:C.TERRA, letterSpacing:-1 }}>{frac.feet}</span>
                  <span style={{ fontFamily:'Manrope', fontSize:14, color:C.INK_SOFT, fontWeight:600 }}>′</span>
                  <span style={{ fontFamily:'Manrope', fontWeight:800, fontSize:38, color:C.TERRA, letterSpacing:-1 }}>{frac.inches}</span>
                  <span style={{ fontFamily:'Manrope', fontSize:14, color:C.INK_SOFT, fontWeight:600 }}>″</span>
                  {frac.num > 0 && (
                    <div style={{ display:'inline-flex', flexDirection:'column', alignItems:'center', fontFamily:'Manrope', fontWeight:800, fontSize:20, color:C.TERRA, lineHeight:1 }}>
                      <span>{frac.num}</span>
                      <span style={{ borderTop:`1.5px solid ${C.TERRA}`, padding:'0 2px' }}>{frac.den}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="sk-hand" style={{ fontSize:14, color:C.INK_SOFT, marginTop:6 }}>
                also: {fmt(alsoFt,3)} ft · {fmt(alsoIn,2)} in · {fmt(numMm/1000,4)} m
              </div>
            </div>
          </SkBox>
        </div>

        {/* Tape measure visual */}
        <div style={{ padding:'12px 16px 0', position:'relative' }}>
          <svg width="100%" height="36" viewBox="0 0 280 36" style={{ overflow:'visible' }}>
            <rect x="0" y="8" width="280" height="16" fill={C.MUSTARD} fillOpacity="0.35" stroke={C.INK} strokeWidth="1.4" filter="url(#sk-wob)"/>
            {Array.from({length:29}).map((_,i) => (
              <line key={i} x1={i*10} y1={8} x2={i*10} y2={i%4===0?18:12} stroke={C.INK} strokeWidth="1" filter="url(#sk-wob)"/>
            ))}
          </svg>
        </div>

        <div style={{ marginTop:'auto' }}>
          <Keypad onKey={onKey}/>
        </div>
      </div>
    </Paper>
  );
}

// ════════════════════════════════════════════════════════════════
// CURRENCY SCREEN
// ════════════════════════════════════════════════════════════════

function ScrCurrency({ navigate }) {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [amount, setAmount] = useState('250');

  const val = parseFloat(amount) || 0;
  const fromRate = CURRENCY_RATES[from].rate;
  const toRate   = CURRENCY_RATES[to].rate;
  const result   = (val / fromRate) * toRate;

  const onKey = (k) => {
    if (k === '⌫') { setAmount(v => v.slice(0,-1)||'0'); return; }
    if (k === '.') { if (!amount.includes('.')) setAmount(v => v+'.'); return; }
    if (amount === '0') { setAmount(k); return; }
    setAmount(v => v.length < 10 ? v+k : v);
  };

  const recents = Object.entries(CURRENCY_RATES).filter(([k]) => k !== from && k !== to).slice(0,4);

  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 18px 4px', display:'flex', alignItems:'center', gap:10 }}>
          <BackBtn onClick={() => navigate('back')}/>
          <div style={{ flex:1, fontFamily:'Manrope', fontWeight:700, fontSize:18, color:C.INK }}>
            Currency <Doodle.Globe size={18} color={C.SAGE} style={{ verticalAlign:'middle', marginLeft:4 }}/>
          </div>
          <Stamp color={C.TERRA} rotate={-8}>static · snapshot</Stamp>
        </div>

        <div style={{ padding:'10px 16px 0' }}>
          <SkBox padding={0} radius={20} double stroke={C.INK}>
            <div style={{ padding:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:18, color:C.INK }}>
                  {CURRENCY_RATES[from].flag} {from}
                </div>
                <div onClick={() => { const tmp=from; setFrom(to); setTo(tmp); }} style={{ cursor:'pointer' }}>
                  <Doodle.Swap size={20} color={C.INK_SOFT}/>
                </div>
              </div>
              <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:42, color:C.INK, lineHeight:1, letterSpacing:-1.6 }}>
                {CURRENCY_RATES[from].sym} {amount}
              </div>
              <div style={{ margin:'12px 0', height:1, background:`repeating-linear-gradient(90deg,${C.INK_SOFT} 0 4px,transparent 4px 8px)` }}/>
              <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:18, color:C.INK }}>
                {CURRENCY_RATES[to].flag} {to}
              </div>
              <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:42, color:C.TERRA, lineHeight:1, letterSpacing:-1.6 }}>
                {CURRENCY_RATES[to].sym} {fmt(result, 2)}
              </div>
              <div className="sk-hand" style={{ fontSize:14, color:C.INK_SOFT, marginTop:6 }}>
                1 {from} ≈ {CURRENCY_RATES[to].sym} {fmt(toRate/fromRate, 4)} · static snapshot
              </div>
            </div>
          </SkBox>
        </div>

        <div style={{ padding:'12px 18px 4px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div className="sk-hand" style={{ fontSize:18, color:C.INK_FAINT }}>other currencies</div>
        </div>
        <div style={{ padding:'0 16px', flex:1, overflowY:'auto' }}>
          {recents.map(([code,cur]) => {
            const r = (val / fromRate) * cur.rate;
            return (
              <div key={code} style={{ display:'flex', alignItems:'center', padding:'8px 4px', borderBottom:`1px dashed ${C.INK_FAINT}55`, cursor:'pointer' }}
                onClick={() => setTo(code)}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:14, color:C.INK }}>{cur.flag} {code} <span style={{ color:C.INK_SOFT, fontWeight:500 }}> · {cur.name}</span></div>
                  <div style={{ fontFamily:'Manrope', fontSize:11, color:C.INK_FAINT, marginTop:2 }}>1 {from} = {fmt(cur.rate/fromRate,4)} {code}</div>
                </div>
                <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:15, color:C.INK }}>{cur.sym} {fmt(r,2)}</div>
              </div>
            );
          })}
        </div>

        <Keypad onKey={onKey}/>
      </div>
    </Paper>
  );
}

// ════════════════════════════════════════════════════════════════
// PINS SCREEN
// ════════════════════════════════════════════════════════════════

function ScrPins({ state, navigate, dispatch }) {
  const pinDefs = [
    { id:'temp',    cat:'temperature', from:'F',  to:'C',    a:'°F',    b:'°C',     doodle:<Doodle.Therm size={30} color={C.TERRA}/>, accent:C.TERRA,  note:'temperature', valFrom:'72' },
    { id:'flour',   cat:'cooking',     doodle:<Doodle.Cup size={30} color={C.MUSTARD}/>, accent:C.MUSTARD, note:'all-purpose flour', a:'cup', b:'g', valFrom:'1' },
    { id:'glucose', cat:'medical',     doodle:<Doodle.Drop size={30} color={C.SAGE}/>, accent:C.SAGE,  note:'blood glucose', a:'mg/dL', b:'mmol/L', valFrom:'94' },
    { id:'dist',    cat:'length',      from:'mi', to:'km',   a:'mi',    b:'km',     doodle:<Doodle.Ruler size={30} color={C.SKY}/>,   accent:C.SKY,   note:'distance', valFrom:'1' },
    { id:'weight',  cat:'mass',        from:'lb', to:'kg',   a:'lb',    b:'kg',     doodle:<Doodle.Scale size={30} color={C.INK_SOFT}/>,accent:C.INK_SOFT,note:'mass', valFrom:'1' },
  ];

  const getResult = (p) => {
    const v = parseFloat(p.valFrom);
    if (p.cat === 'cooking') return { a:p.valFrom, b:fmt(cookingConvert(v,'flour_ap','g'),0) };
    if (p.cat === 'medical') return { a:p.valFrom, b:fmt(convertGlucose(v,'mgdL','mmolL'),2) };
    return { a:p.valFrom, b:fmt(convert(v, p.from, p.to, p.cat)) };
  };

  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 18px 6px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <BackBtn onClick={() => navigate('back')}/>
            <SmidgeMark size={22}/>
          </div>
          <Doodle.Pin size={20} color={C.TERRA}/>
        </div>
        <div style={{ padding:'6px 18px 0' }}>
          <div className="sk-hand" style={{ fontSize:22, color:C.INK_SOFT }}>your three pins</div>
          <div style={{ fontFamily:'Manrope', fontSize:11, color:C.INK_FAINT, marginTop:2 }}>tap to open · long-press to swap</div>
        </div>

        <div style={{ padding:'14px 16px 0', display:'flex', flexDirection:'column', gap:12, flex:1, overflowY:'auto' }}>
          {pinDefs.map((p,i) => {
            const r = getResult(p);
            return (
              <SkBox key={p.id} padding={14} radius={18} stroke={p.accent} double fill="rgba(255,255,255,0.4)"
                onClick={() => { dispatch({ type:'SET_CATEGORY', category:p.cat, fromUnit:p.from, toUnit:p.to }); navigate('home'); }}>
                <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:44, height:44, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:`${p.accent}1c` }}>
                    {p.doodle}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:13, color:C.INK_SOFT, letterSpacing:.2 }}>
                      {p.a} → {p.b}
                    </div>
                    <div style={{ display:'flex', alignItems:'baseline', gap:4, marginTop:4 }}>
                      <span style={{ fontFamily:'Manrope', fontWeight:800, fontSize:28, color:C.INK, letterSpacing:-.8, lineHeight:1 }}>{r.a}</span>
                      <span style={{ fontFamily:'Manrope', fontSize:12, color:C.INK_SOFT }}>{p.a}</span>
                      <span style={{ fontFamily:'Manrope', fontSize:16, color:C.INK_FAINT, margin:'0 4px' }}>→</span>
                      <span style={{ fontFamily:'Manrope', fontWeight:800, fontSize:28, color:p.accent, letterSpacing:-.8, lineHeight:1 }}>{r.b}</span>
                      <span style={{ fontFamily:'Manrope', fontSize:12, color:C.INK_SOFT }}>{p.b}</span>
                    </div>
                    <div className="sk-hand" style={{ fontSize:14, color:C.INK_FAINT, marginTop:4 }}>{p.note}</div>
                  </div>
                </div>
              </SkBox>
            );
          })}
        </div>
      </div>
    </Paper>
  );
}

// ════════════════════════════════════════════════════════════════
// SETTINGS SCREEN
// ════════════════════════════════════════════════════════════════

function ScrSettings({ state, dispatch, navigate }) {
  const groups = [
    { sec:'House style', items:[
      { l:'Default system', r:state.system==='metric'?'Metric':state.system==='imperial'?'Imperial':'Both', d:<Doodle.Scale size={20}/> },
      { l:'Decimal places',  r:state.decimals || 2,   d:<Doodle.Pencil size={20}/> },
      { l:'Show sci notation', r:'above 1e7',        d:<Doodle.Bolt size={20}/> },
    ]},
    { sec:'Pantry', items:[
      { l:'Active categories', r:Object.keys(UNIT_CATEGORIES).length+' total', d:<Doodle.Star size={20}/> },
      { l:'My pinned three', r:'3 / 3',   d:<Doodle.Pin size={20}/>, action:() => navigate('pins') },
      { l:'Cooking · default cup', r:'US (236 mL)', d:<Doodle.Cup size={20}/> },
      { l:'Medical · thresholds', r:'ADA default', d:<Doodle.Heart size={20}/> },
    ]},
    { sec:'Currency', items:[
      { l:'Rate source', r:'Static snapshot', d:<Doodle.Globe size={20}/> },
      { l:'Offline cache', r:'On',    d:<Doodle.Drop size={20}/> },
    ]},
    { sec:'About', items:[
      { l:'Privacy',   r:'no tracking', d:<Doodle.Heart size={20}/> },
      { l:'Made with care · v1.0', r:'', d:<Doodle.Star size={20}/> },
    ]},
  ];
  return (
    <Paper>
      <MiniStatus/>
      <div style={{ padding:'46px 0 0', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'0 18px 8px', display:'flex', alignItems:'center', gap:10 }}>
          <BackBtn onClick={() => navigate('back')}/>
          <div style={{ fontFamily:'Manrope', fontWeight:800, fontSize:24, color:C.INK, letterSpacing:-.5 }}>Settings</div>
        </div>
        <div style={{ padding:'4px 16px', overflowY:'auto', flex:1 }}>
          {groups.map((g,gi) => (
            <div key={gi} style={{ marginBottom:12 }}>
              <div className="sk-hand" style={{ fontSize:16, color:C.INK_FAINT, padding:'4px 8px' }}>{g.sec}</div>
              <SkBox padding={0} radius={16} stroke={C.INK} style={{ width:'100%' }}>
                {g.items.map((it,ii) => (
                  <div key={ii} onClick={it.action}
                    style={{ display:'flex', alignItems:'center', padding:'11px 12px', borderBottom:ii<g.items.length-1?`1px dashed ${C.INK_FAINT}55`:'none', gap:10, cursor:it.action?'pointer':'default' }}>
                    {it.d}
                    <div style={{ flex:1, fontFamily:'Manrope', fontWeight:500, fontSize:13, color:C.INK }}>{it.l}</div>
                    <div style={{ fontFamily:'Manrope', fontSize:12, color:C.INK_SOFT, fontWeight:500 }}>{it.r}</div>
                    {it.r && <span style={{ fontFamily:'Manrope', color:C.INK_FAINT, fontSize:12 }}>›</span>}
                  </div>
                ))}
              </SkBox>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
}

// expose
Object.assign(window, {
  ScrSplash, ScrWelcome, ScrPickCats, ScrPref, ScrPinThree,
  Keypad, PinnedShelf,
  ScrHome, ScrMulti, ScrLibrary, ScrUnitPicker,
  ScrCooking, ScrMedical, ScrTrades, ScrCurrency,
  ScrPins, ScrSettings,
});
