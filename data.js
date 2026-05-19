// data.js — Unit conversion tables and helpers

// ── Linear unit categories (convert via base unit) ────────────────
const UNIT_CATEGORIES = {
  length: {
    name: 'Length', icon: 'Ruler', color: window.C.SKY,
    defaultFrom: 'km', defaultTo: 'mi',
    units: {
      m:   { name:'Metre',         sym:'m',   f:1 },
      km:  { name:'Kilometre',     sym:'km',  f:1000 },
      mi:  { name:'Mile',          sym:'mi',  f:1609.344 },
      ft:  { name:'Foot',          sym:'ft',  f:0.3048 },
      in:  { name:'Inch',          sym:'in',  f:0.0254 },
      yd:  { name:'Yard',          sym:'yd',  f:0.9144 },
      nmi: { name:'Nautical mile', sym:'nmi', f:1852 },
      cm:  { name:'Centimetre',    sym:'cm',  f:0.01 },
      mm:  { name:'Millimetre',    sym:'mm',  f:0.001 },
    },
  },
  mass: {
    name: 'Mass', icon: 'Scale', color: window.C.MUSTARD,
    defaultFrom: 'kg', defaultTo: 'lb',
    units: {
      kg:  { name:'Kilogram',    sym:'kg',  f:1 },
      g:   { name:'Gram',        sym:'g',   f:0.001 },
      lb:  { name:'Pound',       sym:'lb',  f:0.453592 },
      oz:  { name:'Ounce',       sym:'oz',  f:0.0283495 },
      st:  { name:'Stone',       sym:'st',  f:6.35029 },
      t:   { name:'Metric tonne',sym:'t',   f:1000 },
      mg:  { name:'Milligram',   sym:'mg',  f:0.000001 },
    },
  },
  volume: {
    name: 'Volume', icon: 'Beaker', color: window.C.SAGE,
    defaultFrom: 'L', defaultTo: 'gal',
    units: {
      L:    { name:'Litre',              sym:'L',     f:1 },
      mL:   { name:'Millilitre',         sym:'mL',    f:0.001 },
      cup:  { name:'Cup (US)',           sym:'cup',   f:0.236588 },
      floz: { name:'Fl oz (US)',         sym:'fl oz', f:0.0295735 },
      gal:  { name:'Gallon (US)',        sym:'gal',   f:3.78541 },
      tsp:  { name:'Teaspoon',           sym:'tsp',   f:0.00492892 },
      tbsp: { name:'Tablespoon',         sym:'tbsp',  f:0.0147868 },
      pt:   { name:'Pint (US)',          sym:'pt',    f:0.473176 },
      qt:   { name:'Quart (US)',         sym:'qt',    f:0.946353 },
      gal_uk:{ name:'Gallon (UK)',       sym:'gal UK',f:4.54609 },
      cup_m:{ name:'Cup (Metric 250mL)', sym:'cup M', f:0.25 },
    },
  },
  temperature: {
    name: 'Temperature', icon: 'Therm', color: window.C.TERRA,
    defaultFrom: 'F', defaultTo: 'C',
    special: true,
    units: {
      C: { name:'Celsius',    sym:'°C' },
      F: { name:'Fahrenheit', sym:'°F' },
      K: { name:'Kelvin',     sym:'K'  },
      R: { name:'Rankine',    sym:'°R' },
    },
  },
  area: {
    name: 'Area', icon: 'Ruler', color: window.C.SKY,
    defaultFrom: 'm2', defaultTo: 'ft2',
    units: {
      m2:   { name:'Square metre',     sym:'m²',   f:1 },
      km2:  { name:'Square kilometre', sym:'km²',  f:1e6 },
      ft2:  { name:'Square foot',      sym:'ft²',  f:0.092903 },
      in2:  { name:'Square inch',      sym:'in²',  f:0.00064516 },
      yd2:  { name:'Square yard',      sym:'yd²',  f:0.836127 },
      mi2:  { name:'Square mile',      sym:'mi²',  f:2.59e6 },
      ha:   { name:'Hectare',          sym:'ha',   f:10000 },
      ac:   { name:'Acre',             sym:'ac',   f:4046.86 },
    },
  },
  speed: {
    name: 'Speed', icon: 'Arrow', color: window.C.SKY,
    defaultFrom: 'kmh', defaultTo: 'mph',
    units: {
      ms:   { name:'Metres/second', sym:'m/s',  f:1 },
      kmh:  { name:'Kilometres/hr', sym:'km/h', f:0.277778 },
      mph:  { name:'Miles/hour',    sym:'mph',  f:0.44704 },
      kn:   { name:'Knot',          sym:'kn',   f:0.514444 },
      fps:  { name:'Feet/second',   sym:'ft/s', f:0.3048 },
    },
  },
  time: {
    name: 'Time', icon: 'Bolt', color: window.C.INK_SOFT,
    defaultFrom: 'hr', defaultTo: 'min',
    units: {
      ms:  { name:'Millisecond', sym:'ms',  f:0.001 },
      s:   { name:'Second',      sym:'s',   f:1 },
      min: { name:'Minute',      sym:'min', f:60 },
      hr:  { name:'Hour',        sym:'hr',  f:3600 },
      day: { name:'Day',         sym:'day', f:86400 },
      wk:  { name:'Week',        sym:'wk',  f:604800 },
      mo:  { name:'Month (avg)', sym:'mo',  f:2629800 },
      yr:  { name:'Year',        sym:'yr',  f:31557600 },
    },
  },
  data: {
    name: 'Data', icon: 'Bolt', color: window.C.INK_SOFT,
    defaultFrom: 'GB', defaultTo: 'MB',
    units: {
      bit:  { name:'Bit',      sym:'bit', f:1 },
      B:    { name:'Byte',     sym:'B',   f:8 },
      KB:   { name:'Kilobyte', sym:'KB',  f:8192 },
      MB:   { name:'Megabyte', sym:'MB',  f:8388608 },
      GB:   { name:'Gigabyte', sym:'GB',  f:8589934592 },
      TB:   { name:'Terabyte', sym:'TB',  f:8796093022208 },
    },
  },
  pressure: {
    name: 'Pressure', icon: 'Bolt', color: window.C.SAGE,
    defaultFrom: 'psi', defaultTo: 'bar',
    units: {
      Pa:  { name:'Pascal',      sym:'Pa',  f:1 },
      kPa: { name:'Kilopascal',  sym:'kPa', f:1000 },
      MPa: { name:'Megapascal',  sym:'MPa', f:1e6 },
      bar: { name:'Bar',         sym:'bar', f:1e5 },
      psi: { name:'PSI',         sym:'psi', f:6894.76 },
      atm: { name:'Atmosphere',  sym:'atm', f:101325 },
      mmHg:{ name:'mmHg / torr', sym:'mmHg',f:133.322 },
    },
  },
  energy: {
    name: 'Energy', icon: 'Bolt', color: window.C.MUSTARD,
    defaultFrom: 'kcal', defaultTo: 'kJ',
    units: {
      J:    { name:'Joule',     sym:'J',    f:1 },
      kJ:   { name:'Kilojoule', sym:'kJ',   f:1000 },
      cal:  { name:'Calorie',   sym:'cal',  f:4.184 },
      kcal: { name:'Kilocalorie',sym:'kcal',f:4184 },
      Wh:   { name:'Watt-hour', sym:'Wh',   f:3600 },
      kWh:  { name:'Kilowatt-hr',sym:'kWh', f:3600000 },
      BTU:  { name:'BTU',       sym:'BTU',  f:1055.06 },
    },
  },
};

// ── Temperature conversion ─────────────────────────────────────────
function convertTemp(val, from, to) {
  const toC = { C:x=>x, F:x=>(x-32)*5/9, K:x=>x-273.15, R:x=>(x-491.67)*5/9 };
  const fromC = { C:x=>x, F:x=>x*9/5+32, K:x=>x+273.15, R:x=>x*9/5+491.67 };
  if (!toC[from] || !fromC[to]) return NaN;
  return fromC[to](toC[from](val));
}

// ── General converter ──────────────────────────────────────────────
function convert(value, fromKey, toKey, catKey) {
  if (!isFinite(value)) return NaN;
  const cat = UNIT_CATEGORIES[catKey];
  if (!cat) return NaN;
  if (cat.special) return convertTemp(value, fromKey, toKey);
  const from = cat.units[fromKey];
  const to = cat.units[toKey];
  if (!from || !to) return NaN;
  return (value * from.f) / to.f;
}

// ── Format number nicely ───────────────────────────────────────────
function fmt(n, decimals=4) {
  if (!isFinite(n)) return '—';
  const abs = Math.abs(n);
  if (abs === 0) return '0';
  if (abs >= 1e10 || (abs < 1e-4 && abs > 0)) {
    return n.toExponential(3);
  }
  // Use up to `decimals` significant decimals, strip trailing zeros
  const str = n.toFixed(decimals);
  return parseFloat(str).toLocaleString('en-US', { maximumFractionDigits: decimals });
}

// ── Expression parser ──────────────────────────────────────────────
function evalExpr(expr) {
  const s = expr.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/[^0-9+\-*/(). ]/g,'');
  if (!s.trim()) return null;
  try {
    // eslint-disable-next-line no-new-func
    const r = Function('"use strict";return('+s+')')();
    return (typeof r === 'number' && isFinite(r)) ? r : null;
  } catch { return null; }
}

// ── Cooking density data (grams per 1 US cup = 236.588 mL) ─────────
const INGREDIENTS = [
  { id:'flour_ap',    name:'All-purpose flour, unsifted', g:125 },
  { id:'flour_ap_s',  name:'All-purpose flour, sifted',   g:110 },
  { id:'flour_bread', name:'Bread flour',                  g:127 },
  { id:'flour_cake',  name:'Cake flour, sifted',           g:100 },
  { id:'sugar',       name:'Sugar, granulated',            g:200 },
  { id:'sugar_br',    name:'Sugar, brown (packed)',        g:220 },
  { id:'sugar_pw',    name:'Powdered sugar, sifted',       g:120 },
  { id:'butter',      name:'Butter',                       g:227 },
  { id:'honey',       name:'Honey',                        g:340 },
  { id:'water',       name:'Water',                        g:237 },
  { id:'milk',        name:'Milk, whole',                  g:244 },
  { id:'oil',         name:'Vegetable oil',                g:218 },
  { id:'rice',        name:'Rice, white (uncooked)',       g:185 },
  { id:'oats',        name:'Oats, rolled',                 g:90  },
  { id:'cocoa',       name:'Cocoa powder, natural',        g:100 },
  { id:'salt',        name:'Salt, fine',                   g:240 },
  { id:'almond_fl',   name:'Almond flour',                 g:96  },
  { id:'cornstarch',  name:'Cornstarch',                   g:120 },
  { id:'breadcrumbs', name:'Breadcrumbs, dry',             g:108 },
];

const US_CUP_ML = 236.588;

function cookingConvert(cups, ingredientId, targetUnit) {
  const ing = INGREDIENTS.find(i => i.id === ingredientId) || INGREDIENTS[0];
  const grams = cups * ing.g;
  switch(targetUnit) {
    case 'g':  return grams;
    case 'oz': return grams / 28.3495;
    case 'lb': return grams / 453.592;
    case 'kg': return grams / 1000;
    case 'mL': return cups * US_CUP_ML;
    default:   return grams;
  }
}

// ── Medical — glucose ──────────────────────────────────────────────
const GLUCOSE_FACTOR = 18.016; // mg/dL per mmol/L (MW of glucose = 180.16)

function convertGlucose(val, from, to) {
  if (!isFinite(val)) return NaN;
  let mgdL;
  if (from === 'mgdL') mgdL = val;
  else if (from === 'mmolL') mgdL = val * GLUCOSE_FACTOR;
  else return NaN;
  if (to === 'mgdL') return mgdL;
  if (to === 'mmolL') return mgdL / GLUCOSE_FACTOR;
  return NaN;
}

function glucoseRange(mgdL) {
  if (mgdL < 70)  return { label:'Low',       color:window.C.SKY,    pct: Math.max(0, mgdL/70)*20 };
  if (mgdL < 100) return { label:'Normal',     color:window.C.SAGE,   pct: 20 + (mgdL-70)/30*35 };
  if (mgdL < 126) return { label:'Pre-diab.',  color:window.C.MUSTARD,pct: 55 + (mgdL-100)/26*20 };
  return               { label:'Diabetic',    color:window.C.TERRA,  pct: Math.min(100, 75 + (mgdL-126)/74*25) };
}

// ── Trades — ft/in/fraction ────────────────────────────────────────
function mmToFtInFrac(mm, denom=16) {
  const totalIn = mm / 25.4;
  const feet = Math.floor(totalIn / 12);
  const rem = totalIn - feet * 12;
  const whole = Math.floor(rem);
  const frac = rem - whole;
  let num = Math.round(frac * denom);
  let den = denom;
  if (num === den) { return { feet, inches: whole + 1, num: 0, den: 1 }; }
  const g = gcd(num, den);
  return { feet, inches: whole, num: num/g, den: den/g };
}

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

// ── Currency (static snapshot — ECB rates relative to USD) ────────
const CURRENCY_RATES = {
  USD:{ sym:'$',  flag:'🇺🇸', name:'US Dollar',        rate:1 },
  EUR:{ sym:'€',  flag:'🇪🇺', name:'Euro',              rate:0.9205 },
  GBP:{ sym:'£',  flag:'🇬🇧', name:'Pound Sterling',    rate:0.7856 },
  INR:{ sym:'₹',  flag:'🇮🇳', name:'Indian Rupee',      rate:83.33 },
  JPY:{ sym:'¥',  flag:'🇯🇵', name:'Japanese Yen',      rate:155.0 },
  CAD:{ sym:'$',  flag:'🇨🇦', name:'Canadian Dollar',   rate:1.365 },
  AUD:{ sym:'$',  flag:'🇦🇺', name:'Australian Dollar', rate:1.532 },
  CHF:{ sym:'Fr', flag:'🇨🇭', name:'Swiss Franc',       rate:0.897 },
  CNY:{ sym:'¥',  flag:'🇨🇳', name:'Chinese Yuan',      rate:7.244 },
  MXN:{ sym:'$',  flag:'🇲🇽', name:'Mexican Peso',      rate:17.15 },
  BRL:{ sym:'R$', flag:'🇧🇷', name:'Brazilian Real',    rate:5.08 },
  SGD:{ sym:'$',  flag:'🇸🇬', name:'Singapore Dollar',  rate:1.342 },
  AED:{ sym:'د.إ',flag:'🇦🇪', name:'UAE Dirham',        rate:3.673 },
  KRW:{ sym:'₩',  flag:'🇰🇷', name:'South Korean Won',  rate:1368 },
};

Object.assign(window, {
  UNIT_CATEGORIES, convert, fmt, evalExpr,
  INGREDIENTS, cookingConvert, US_CUP_ML,
  convertGlucose, glucoseRange,
  mmToFtInFrac, gcd,
  CURRENCY_RATES,
});
