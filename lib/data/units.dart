import 'package:flutter/material.dart';
import '../design/colors.dart';
import '../design/doodles.dart';

class Unit {
  final String name;
  final String sym;
  final double factor; // factor to base unit (not used for temperature)
  const Unit(this.name, this.sym, this.factor);
}

class UnitCategory {
  final String id;
  final String name;
  final DoodleKind icon;
  final Color color;
  final String defaultFrom;
  final String defaultTo;
  final bool special;
  final Map<String, Unit> units;
  const UnitCategory({
    required this.id,
    required this.name,
    required this.icon,
    required this.color,
    required this.defaultFrom,
    required this.defaultTo,
    this.special = false,
    required this.units,
  });
}

const Map<String, UnitCategory> kCategories = {
  'length': UnitCategory(
    id: 'length',
    name: 'Length',
    icon: DoodleKind.ruler,
    color: C.sky,
    defaultFrom: 'km',
    defaultTo: 'mi',
    units: {
      'm':   Unit('Metre',         'm',   1),
      'km':  Unit('Kilometre',     'km',  1000),
      'mi':  Unit('Mile',          'mi',  1609.344),
      'ft':  Unit('Foot',          'ft',  0.3048),
      'in':  Unit('Inch',          'in',  0.0254),
      'yd':  Unit('Yard',          'yd',  0.9144),
      'nmi': Unit('Nautical mile', 'nmi', 1852),
      'cm':  Unit('Centimetre',    'cm',  0.01),
      'mm':  Unit('Millimetre',    'mm',  0.001),
    },
  ),
  'mass': UnitCategory(
    id: 'mass',
    name: 'Mass',
    icon: DoodleKind.scale,
    color: C.mustard,
    defaultFrom: 'kg',
    defaultTo: 'lb',
    units: {
      'kg':  Unit('Kilogram',     'kg',  1),
      'g':   Unit('Gram',         'g',   0.001),
      'lb':  Unit('Pound',        'lb',  0.453592),
      'oz':  Unit('Ounce',        'oz',  0.0283495),
      'st':  Unit('Stone',        'st',  6.35029),
      't':   Unit('Metric tonne', 't',   1000),
      'mg':  Unit('Milligram',    'mg',  0.000001),
    },
  ),
  'volume': UnitCategory(
    id: 'volume',
    name: 'Volume',
    icon: DoodleKind.beaker,
    color: C.sage,
    defaultFrom: 'L',
    defaultTo: 'gal',
    units: {
      'L':     Unit('Litre',             'L',     1),
      'mL':    Unit('Millilitre',        'mL',    0.001),
      'cup':   Unit('Cup (US)',          'cup',   0.236588),
      'floz':  Unit('Fl oz (US)',        'fl oz', 0.0295735),
      'gal':   Unit('Gallon (US)',       'gal',   3.78541),
      'tsp':   Unit('Teaspoon',          'tsp',   0.00492892),
      'tbsp':  Unit('Tablespoon',        'tbsp',  0.0147868),
      'pt':    Unit('Pint (US)',         'pt',    0.473176),
      'qt':    Unit('Quart (US)',        'qt',    0.946353),
      'galuk': Unit('Gallon (UK)',       'gal UK',4.54609),
      'cupm':  Unit('Cup (Metric 250mL)','cup M', 0.25),
    },
  ),
  'temperature': UnitCategory(
    id: 'temperature',
    name: 'Temperature',
    icon: DoodleKind.therm,
    color: C.terra,
    defaultFrom: 'F',
    defaultTo: 'C',
    special: true,
    units: {
      'C': Unit('Celsius',    '°C', 0),
      'F': Unit('Fahrenheit', '°F', 0),
      'K': Unit('Kelvin',     'K',  0),
      'R': Unit('Rankine',    '°R', 0),
    },
  ),
  'area': UnitCategory(
    id: 'area',
    name: 'Area',
    icon: DoodleKind.ruler,
    color: C.sky,
    defaultFrom: 'm2',
    defaultTo: 'ft2',
    units: {
      'm2':  Unit('Square metre',     'm²',  1),
      'km2': Unit('Square kilometre', 'km²', 1e6),
      'ft2': Unit('Square foot',      'ft²', 0.092903),
      'in2': Unit('Square inch',      'in²', 0.00064516),
      'yd2': Unit('Square yard',      'yd²', 0.836127),
      'mi2': Unit('Square mile',      'mi²', 2.59e6),
      'ha':  Unit('Hectare',          'ha',  10000),
      'ac':  Unit('Acre',             'ac',  4046.86),
    },
  ),
  'speed': UnitCategory(
    id: 'speed',
    name: 'Speed',
    icon: DoodleKind.arrow,
    color: C.sky,
    defaultFrom: 'kmh',
    defaultTo: 'mph',
    units: {
      'ms':  Unit('Metres/second', 'm/s',  1),
      'kmh': Unit('Kilometres/hr', 'km/h', 0.277778),
      'mph': Unit('Miles/hour',    'mph',  0.44704),
      'kn':  Unit('Knot',          'kn',   0.514444),
      'fps': Unit('Feet/second',   'ft/s', 0.3048),
    },
  ),
  'time': UnitCategory(
    id: 'time',
    name: 'Time',
    icon: DoodleKind.bolt,
    color: C.inkSoft,
    defaultFrom: 'hr',
    defaultTo: 'min',
    units: {
      'ms':  Unit('Millisecond', 'ms',  0.001),
      's':   Unit('Second',      's',   1),
      'min': Unit('Minute',      'min', 60),
      'hr':  Unit('Hour',        'hr',  3600),
      'day': Unit('Day',         'day', 86400),
      'wk':  Unit('Week',        'wk',  604800),
      'mo':  Unit('Month (avg)', 'mo',  2629800),
      'yr':  Unit('Year',        'yr',  31557600),
    },
  ),
  'data': UnitCategory(
    id: 'data',
    name: 'Data',
    icon: DoodleKind.bolt,
    color: C.inkSoft,
    defaultFrom: 'GB',
    defaultTo: 'MB',
    units: {
      'bit': Unit('Bit',      'bit', 1),
      'B':   Unit('Byte',     'B',   8),
      'KB':  Unit('Kilobyte', 'KB',  8192),
      'MB':  Unit('Megabyte', 'MB',  8388608),
      'GB':  Unit('Gigabyte', 'GB',  8589934592),
      'TB':  Unit('Terabyte', 'TB',  8796093022208),
    },
  ),
  'pressure': UnitCategory(
    id: 'pressure',
    name: 'Pressure',
    icon: DoodleKind.drop,
    color: C.sage,
    defaultFrom: 'psi',
    defaultTo: 'bar',
    units: {
      'Pa':   Unit('Pascal',     'Pa',   1),
      'kPa':  Unit('Kilopascal', 'kPa',  1000),
      'MPa':  Unit('Megapascal', 'MPa',  1e6),
      'bar':  Unit('Bar',        'bar',  1e5),
      'psi':  Unit('PSI',        'psi',  6894.76),
      'atm':  Unit('Atmosphere', 'atm',  101325),
      'mmHg': Unit('mmHg / torr','mmHg', 133.322),
    },
  ),
  'energy': UnitCategory(
    id: 'energy',
    name: 'Energy',
    icon: DoodleKind.bolt,
    color: C.mustard,
    defaultFrom: 'kcal',
    defaultTo: 'kJ',
    units: {
      'J':    Unit('Joule',       'J',    1),
      'kJ':   Unit('Kilojoule',   'kJ',   1000),
      'cal':  Unit('Calorie',     'cal',  4.184),
      'kcal': Unit('Kilocalorie', 'kcal', 4184),
      'Wh':   Unit('Watt-hour',   'Wh',   3600),
      'kWh':  Unit('Kilowatt-hr', 'kWh',  3600000),
      'BTU':  Unit('BTU',         'BTU',  1055.06),
    },
  ),
};
