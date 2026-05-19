String fmt(num? n, {int decimals = 4}) {
  if (n == null || !n.isFinite) return '—';
  final abs = n.abs();
  if (abs == 0) return '0';
  if (abs >= 1e10 || (abs < 1e-4 && abs > 0)) {
    return n.toStringAsExponential(3);
  }
  final fixed = n.toStringAsFixed(decimals);
  final parsed = double.parse(fixed);
  if (parsed == parsed.toInt()) {
    return _withCommas(parsed.toInt().toString());
  }
  // strip trailing zeros after decimal
  var s = parsed.toString();
  if (s.contains('.')) {
    s = s.replaceAll(RegExp(r'0+$'), '').replaceAll(RegExp(r'\.$'), '');
  }
  // add commas to integer part
  final parts = s.split('.');
  parts[0] = _withCommas(parts[0]);
  return parts.join('.');
}

String _withCommas(String intStr) {
  final neg = intStr.startsWith('-');
  var s = neg ? intStr.substring(1) : intStr;
  final buf = StringBuffer();
  for (int i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 == 0) buf.write(',');
    buf.write(s[i]);
  }
  return neg ? '-${buf.toString()}' : buf.toString();
}

/// Tiny arithmetic expression evaluator for "3*250+50" style input.
/// Supports: + - * / × ÷ − . digits and parens.
/// Implemented as shunting-yard → RPN → evaluate, with sane sanitization.
double? evalExpr(String expr) {
  final s = expr
      .replaceAll('×', '*')
      .replaceAll('÷', '/')
      .replaceAll('−', '-')
      .replaceAll(RegExp(r'[^0-9+\-*/(). ]'), '')
      .trim();
  if (s.isEmpty) return null;
  try {
    final tokens = _tokenize(s);
    final rpn = _toRpn(tokens);
    final result = _evalRpn(rpn);
    return result.isFinite ? result : null;
  } catch (_) {
    return null;
  }
}

List<String> _tokenize(String s) {
  final tokens = <String>[];
  int i = 0;
  String? lastTokenType; // 'num', 'op', 'lparen', 'rparen'
  while (i < s.length) {
    final c = s[i];
    if (c == ' ') {
      i++;
      continue;
    }
    if ('0123456789.'.contains(c)) {
      final start = i;
      while (i < s.length && '0123456789.'.contains(s[i])) {
        i++;
      }
      tokens.add(s.substring(start, i));
      lastTokenType = 'num';
      continue;
    }
    if (c == '(') {
      tokens.add(c);
      lastTokenType = 'lparen';
      i++;
      continue;
    }
    if (c == ')') {
      tokens.add(c);
      lastTokenType = 'rparen';
      i++;
      continue;
    }
    if ('+-*/'.contains(c)) {
      // Unary minus/plus: at start or after op/lparen
      if ((c == '-' || c == '+') &&
          (lastTokenType == null ||
              lastTokenType == 'op' ||
              lastTokenType == 'lparen')) {
        // turn into signed number: read number ahead
        final start = i;
        i++;
        while (i < s.length && '0123456789.'.contains(s[i])) {
          i++;
        }
        tokens.add(s.substring(start, i));
        lastTokenType = 'num';
        continue;
      }
      tokens.add(c);
      lastTokenType = 'op';
      i++;
      continue;
    }
    i++;
  }
  return tokens;
}

int _prec(String op) {
  if (op == '+' || op == '-') return 1;
  if (op == '*' || op == '/') return 2;
  return 0;
}

List<String> _toRpn(List<String> tokens) {
  final out = <String>[];
  final ops = <String>[];
  for (final t in tokens) {
    if (double.tryParse(t) != null) {
      out.add(t);
    } else if (t == '(') {
      ops.add(t);
    } else if (t == ')') {
      while (ops.isNotEmpty && ops.last != '(') {
        out.add(ops.removeLast());
      }
      if (ops.isNotEmpty) ops.removeLast();
    } else {
      while (ops.isNotEmpty &&
          ops.last != '(' &&
          _prec(ops.last) >= _prec(t)) {
        out.add(ops.removeLast());
      }
      ops.add(t);
    }
  }
  while (ops.isNotEmpty) {
    out.add(ops.removeLast());
  }
  return out;
}

double _evalRpn(List<String> rpn) {
  final stack = <double>[];
  for (final t in rpn) {
    final n = double.tryParse(t);
    if (n != null) {
      stack.add(n);
    } else {
      if (stack.length < 2) throw 'bad expr';
      final b = stack.removeLast();
      final a = stack.removeLast();
      switch (t) {
        case '+': stack.add(a + b); break;
        case '-': stack.add(a - b); break;
        case '*': stack.add(a * b); break;
        case '/':
          if (b == 0) return double.nan;
          stack.add(a / b);
          break;
      }
    }
  }
  if (stack.isEmpty) throw 'empty';
  return stack.last;
}
