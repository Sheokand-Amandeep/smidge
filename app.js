// app.js — Root app, state management, navigation

const { useState, useEffect, useReducer, useCallback } = React;

// ── Initial state ──────────────────────────────────────────────
function getInitialState() {
  return {
    category:   'length',
    fromUnit:   'km',
    toUnit:     'mi',
    expression: '1',
    exprMode:   false,
    inputSide:  'from',
    pins:       ['temp', 'flour', 'glucose'],
    system:     'metric',
    decimals:   4,
  };
}

function loadSavedState() {
  try {
    const s = localStorage.getItem('smidge_state');
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

// ── Reducer ────────────────────────────────────────────────────
function reducer(state, action) {
  const s = state;
  switch (action.type) {

    case 'KEY': {
      const k = action.key;
      let expr = s.expression;
      if (k === '⌫') {
        expr = expr.length > 1 ? expr.slice(0, -1) : '0';
      } else if (k === '.') {
        const lastNum = expr.match(/[^+\-×÷*/]*$/)?.[0] || '';
        if (!lastNum.includes('.')) expr = expr + '.';
      } else if (k === '=') {
        const val = evalExpr(expr);
        if (val !== null) expr = String(parseFloat(val.toFixed(10)));
      } else if ('0123456789'.includes(k)) {
        if (expr === '0') expr = k;
        else if (expr.length < 20) expr = expr + k;
      } else {
        // Operators in expression mode
        if (expr.length < 40) expr = expr + k;
      }
      return { ...s, expression: expr };
    }

    case 'SWAP': {
      return { ...s, fromUnit: s.toUnit, toUnit: s.fromUnit };
    }

    case 'SET_SIDE': {
      if (action.side === s.inputSide) return s;
      // Compute the other side's displayed value so the user can edit it
      const rawVal = evalExpr(s.expression) ?? parseFloat(s.expression);
      let newExpr = '0';
      if (isFinite(rawVal)) {
        const converted = s.category
          ? convert(rawVal, s.fromUnit, s.toUnit, s.category)
          : NaN;
        if (action.side === 'to' && isFinite(converted)) {
          newExpr = String(parseFloat(converted.toFixed(10)));
        } else if (action.side === 'from') {
          newExpr = String(parseFloat(rawVal.toFixed(10)));
        }
      }
      return { ...s, inputSide: action.side, expression: newExpr };
    }

    case 'SET_CATEGORY': {
      const cat = UNIT_CATEGORIES[action.category];
      if (!cat) return s;
      return {
        ...s,
        category:  action.category,
        fromUnit:  action.fromUnit || cat.defaultFrom,
        toUnit:    action.toUnit   || cat.defaultTo,
        expression: '1',
        inputSide:  'from',
        exprMode:   false,
      };
    }

    case 'SET_UNIT': {
      if (action.side === 'from') return { ...s, fromUnit: action.unit };
      if (action.side === 'to')   return { ...s, toUnit:   action.unit };
      return s;
    }

    case 'TOGGLE_EXPR': {
      return { ...s, exprMode: !s.exprMode };
    }

    case 'SET_SYSTEM': {
      return { ...s, system: action.system };
    }

    default: return s;
  }
}

// ── App ────────────────────────────────────────────────────────
function App() {
  const onboardedInit = localStorage.getItem('smidge_onboarded') === '1';

  const [onboarded, setOnboarded] = useState(onboardedInit);
  const [obStep,    setObStep]    = useState(0); // 0=splash, 1=welcome, 2=pickCats, 3=pref, 4=pinThree
  const [obCats,    setObCats]    = useState(['length', 'mass', 'temperature', 'cooking']);
  const [obSystem,  setObSystem]  = useState('metric');
  const [obPins,    setObPins]    = useState(['temp', 'flour', 'glucose']);

  const [state, dispatch] = useReducer(reducer, null, () => loadSavedState() || getInitialState());

  // Navigation stack: [{ screen, params }]
  const [stack,   setStack]   = useState([{ screen: 'home', params: {} }]);
  const [animDir, setAnimDir] = useState('right');

  // Splash auto-advance
  useEffect(() => {
    if (!onboarded && obStep === 0) {
      const t = setTimeout(() => setObStep(1), 1600);
      return () => clearTimeout(t);
    }
  }, [onboarded, obStep]);

  // Persist state on change
  useEffect(() => {
    try { localStorage.setItem('smidge_state', JSON.stringify(state)); } catch {}
  }, [state]);

  const navigate = useCallback((screen, params = {}) => {
    if (screen === 'back') {
      setAnimDir('left');
      setStack(s => s.length > 1 ? s.slice(0, -1) : s);
    } else if (screen === 'home') {
      setAnimDir('left');
      setStack([{ screen: 'home', params: {} }]);
    } else {
      setAnimDir('right');
      setStack(s => [...s, { screen, params }]);
    }
  }, []);

  const finishOnboarding = useCallback(() => {
    dispatch({ type: 'SET_SYSTEM', system: obSystem });
    localStorage.setItem('smidge_onboarded', '1');
    setOnboarded(true);
  }, [obSystem]);

  // ── Onboarding flow ──────────────────────────────────────────
  if (!onboarded) {
    if (obStep === 0) return <ScrSplash/>;
    if (obStep === 1) return <ScrWelcome onNext={() => setObStep(2)}/>;
    if (obStep === 2) return (
      <ScrPickCats
        selected={obCats}
        onToggle={(id) => setObCats(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id])}
        onNext={() => setObStep(3)}
      />
    );
    if (obStep === 3) return (
      <ScrPref
        system={obSystem}
        onChange={setObSystem}
        onNext={() => setObStep(4)}
      />
    );
    if (obStep === 4) return (
      <ScrPinThree
        pins={obPins}
        onToggle={(id) => setObPins(v => {
          if (v.includes(id)) return v.filter(x => x !== id);
          if (v.length >= 3)  return [...v.slice(1), id];
          return [...v, id];
        })}
        onDone={finishOnboarding}
      />
    );
  }

  // ── Main app ─────────────────────────────────────────────────
  const current = stack[stack.length - 1];
  const { screen, params } = current;
  const animClass = animDir === 'right' ? 'screen-slide-in' : 'screen-slide-back';

  const renderScreen = () => {
    const cp = { state, dispatch, navigate, params: params || {} };
    switch (screen) {
      case 'home':       return <ScrHome       {...cp}/>;
      case 'multi':      return <ScrMulti      {...cp}/>;
      case 'library':    return <ScrLibrary    {...cp} activeCategory={state.category}/>;
      case 'unitPicker': return <ScrUnitPicker {...cp}/>;
      case 'cooking':    return <ScrCooking    {...cp}/>;
      case 'medical':    return <ScrMedical    navigate={navigate}/>;
      case 'trades':     return <ScrTrades     navigate={navigate}/>;
      case 'currency':   return <ScrCurrency   navigate={navigate}/>;
      case 'pins':       return <ScrPins       {...cp}/>;
      case 'settings':   return <ScrSettings   {...cp}/>;
      default:           return <ScrHome       {...cp}/>;
    }
  };

  return (
    <div key={`${screen}-${stack.length}`} className={animClass} style={{ height: '100%' }}>
      {renderScreen()}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
