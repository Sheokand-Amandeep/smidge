import 'units.dart';

double convertTemp(double val, String from, String to) {
  double toC;
  switch (from) {
    case 'C': toC = val; break;
    case 'F': toC = (val - 32) * 5 / 9; break;
    case 'K': toC = val - 273.15; break;
    case 'R': toC = (val - 491.67) * 5 / 9; break;
    default: return double.nan;
  }
  switch (to) {
    case 'C': return toC;
    case 'F': return toC * 9 / 5 + 32;
    case 'K': return toC + 273.15;
    case 'R': return toC * 9 / 5 + 491.67;
  }
  return double.nan;
}

double convert(double value, String fromKey, String toKey, String catKey) {
  if (!value.isFinite) return double.nan;
  final cat = kCategories[catKey];
  if (cat == null) return double.nan;
  if (cat.special) return convertTemp(value, fromKey, toKey);
  final from = cat.units[fromKey];
  final to = cat.units[toKey];
  if (from == null || to == null) return double.nan;
  return (value * from.factor) / to.factor;
}

// ── Cooking density data (grams per 1 US cup) ──
class Ingredient {
  final String id;
  final String name;
  final double gramsPerCup;
  const Ingredient(this.id, this.name, this.gramsPerCup);
}

const List<Ingredient> kIngredients = [
  Ingredient('flour_ap',    'All-purpose flour, unsifted', 125),
  Ingredient('flour_ap_s',  'All-purpose flour, sifted',   110),
  Ingredient('flour_bread', 'Bread flour',                 127),
  Ingredient('flour_cake',  'Cake flour, sifted',          100),
  Ingredient('sugar',       'Sugar, granulated',           200),
  Ingredient('sugar_br',    'Sugar, brown (packed)',       220),
  Ingredient('sugar_pw',    'Powdered sugar, sifted',      120),
  Ingredient('butter',      'Butter',                      227),
  Ingredient('honey',       'Honey',                       340),
  Ingredient('water',       'Water',                       237),
  Ingredient('milk',        'Milk, whole',                 244),
  Ingredient('oil',         'Vegetable oil',               218),
  Ingredient('rice',        'Rice, white (uncooked)',      185),
  Ingredient('oats',        'Oats, rolled',                90),
  Ingredient('cocoa',       'Cocoa powder, natural',       100),
  Ingredient('salt',        'Salt, fine',                  240),
  Ingredient('almond_fl',   'Almond flour',                96),
  Ingredient('cornstarch',  'Cornstarch',                  120),
  Ingredient('breadcrumbs', 'Breadcrumbs, dry',            108),
];

const double kUsCupMl = 236.588;

double cookingConvert(double cups, String ingredientId, String targetUnit) {
  final ing = kIngredients.firstWhere(
    (i) => i.id == ingredientId,
    orElse: () => kIngredients.first,
  );
  final grams = cups * ing.gramsPerCup;
  switch (targetUnit) {
    case 'g':  return grams;
    case 'oz': return grams / 28.3495;
    case 'lb': return grams / 453.592;
    case 'kg': return grams / 1000;
    case 'mL': return cups * kUsCupMl;
  }
  return grams;
}

// ── Medical — glucose ──
const double kGlucoseFactor = 18.016;

double convertGlucose(double val, String from, String to) {
  if (!val.isFinite) return double.nan;
  double mgdL;
  if (from == 'mgdL') {
    mgdL = val;
  } else if (from == 'mmolL') {
    mgdL = val * kGlucoseFactor;
  } else {
    return double.nan;
  }
  if (to == 'mgdL') return mgdL;
  if (to == 'mmolL') return mgdL / kGlucoseFactor;
  return double.nan;
}

class GlucoseRange {
  final String label;
  final int colorValue; // ARGB
  final double pct;
  GlucoseRange(this.label, this.colorValue, this.pct);
}

GlucoseRange glucoseRange(double mgdL) {
  if (mgdL < 70) {
    return GlucoseRange('Low', 0xFF7C95A8,
        (mgdL.clamp(0, 70) / 70 * 20).toDouble());
  }
  if (mgdL < 100) {
    return GlucoseRange('Normal', 0xFF7B8A6F, 20 + (mgdL - 70) / 30 * 35);
  }
  if (mgdL < 126) {
    return GlucoseRange('Pre-diab.', 0xFFC89A3A, 55 + (mgdL - 100) / 26 * 20);
  }
  return GlucoseRange(
    'Diabetic',
    0xFFC4593A,
    (75 + (mgdL - 126) / 74 * 25).clamp(0, 100).toDouble(),
  );
}

// ── Trades — ft/in/fraction ──
class FtInFrac {
  final int feet;
  final int inches;
  final int num;
  final int den;
  FtInFrac(this.feet, this.inches, this.num, this.den);
}

int _gcd(int a, int b) => b == 0 ? a : _gcd(b, a % b);

FtInFrac mmToFtInFrac(double mm, {int denom = 16}) {
  final totalIn = mm / 25.4;
  final feet = totalIn ~/ 12;
  final rem = totalIn - feet * 12;
  final whole = rem.floor();
  final frac = rem - whole;
  var num = (frac * denom).round();
  final den = denom;
  if (num == den) return FtInFrac(feet, whole + 1, 0, 1);
  if (num == 0) return FtInFrac(feet, whole, 0, 1);
  final g = _gcd(num, den);
  return FtInFrac(feet, whole, num ~/ g, den ~/ g);
}

// ── Currency (static snapshot) ──
class Currency {
  final String sym;
  final String flag;
  final String name;
  final double rate; // relative to USD = 1
  const Currency(this.sym, this.flag, this.name, this.rate);
}

const Map<String, Currency> kCurrencies = {
  'USD': Currency(r'$',   '🇺🇸', 'US Dollar',        1),
  'EUR': Currency('€',    '🇪🇺', 'Euro',              0.9205),
  'GBP': Currency('£',    '🇬🇧', 'Pound Sterling',    0.7856),
  'INR': Currency('₹',    '🇮🇳', 'Indian Rupee',      83.33),
  'JPY': Currency('¥',    '🇯🇵', 'Japanese Yen',      155.0),
  'CAD': Currency(r'$',   '🇨🇦', 'Canadian Dollar',   1.365),
  'AUD': Currency(r'$',   '🇦🇺', 'Australian Dollar', 1.532),
  'CHF': Currency('Fr',   '🇨🇭', 'Swiss Franc',       0.897),
  'CNY': Currency('¥',    '🇨🇳', 'Chinese Yuan',      7.244),
  'MXN': Currency(r'$',   '🇲🇽', 'Mexican Peso',      17.15),
  'BRL': Currency(r'R$',  '🇧🇷', 'Brazilian Real',    5.08),
  'SGD': Currency(r'$',   '🇸🇬', 'Singapore Dollar',  1.342),
  'AED': Currency('د.إ',  '🇦🇪', 'UAE Dirham',        3.673),
  'KRW': Currency('₩',    '🇰🇷', 'South Korean Won',  1368),
};
