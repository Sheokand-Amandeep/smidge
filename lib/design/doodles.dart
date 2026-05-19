import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'colors.dart';
import 'wobble.dart';

enum DoodleKind {
  spoon, ruler, beaker, therm, scale, pencil, cup, drop,
  globe, heart, saw, pin, arrow, swap, bolt, star,
}

class Doodle extends StatelessWidget {
  final DoodleKind kind;
  final double size;
  final Color color;
  const Doodle(this.kind, {super.key, this.size = 24, this.color = C.ink});

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size.square(size),
      painter: _DoodlePainter(kind, color),
    );
  }
}

class _DoodlePainter extends CustomPainter {
  final DoodleKind kind;
  final Color color;
  _DoodlePainter(this.kind, this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width;
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.4
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    void drawWob(Path path) => canvas.drawPath(Wobble.apply(path), paint);

    switch (kind) {
      case DoodleKind.spoon:
        drawWob(Path()
          ..addOval(Rect.fromLTWH(s * 0.55, s * 0.05, s * 0.4, s * 0.45)));
        drawWob(Path()
          ..moveTo(s * 0.6, s * 0.4)
          ..lineTo(s * 0.1, s * 0.9));
        break;
      case DoodleKind.ruler:
        drawWob(Path()
          ..addRRect(RRect.fromRectAndRadius(
            Rect.fromLTWH(s * 0.05, s * 0.35, s * 0.9, s * 0.3),
            const Radius.circular(2),
          )));
        for (int i = 1; i < 6; i++) {
          final h = i.isOdd ? 0.12 : 0.06;
          drawWob(Path()
            ..moveTo(s * (0.05 + 0.18 * i), s * 0.35)
            ..lineTo(s * (0.05 + 0.18 * i), s * (0.35 + h)));
        }
        break;
      case DoodleKind.beaker:
        drawWob(Path()
          ..moveTo(s * 0.30, s * 0.15)
          ..lineTo(s * 0.30, s * 0.45)
          ..lineTo(s * 0.10, s * 0.85)
          ..lineTo(s * 0.90, s * 0.85)
          ..lineTo(s * 0.70, s * 0.45)
          ..lineTo(s * 0.70, s * 0.15));
        drawWob(Path()
          ..moveTo(s * 0.25, s * 0.15)
          ..lineTo(s * 0.75, s * 0.15));
        drawWob(Path()
          ..addOval(Rect.fromCircle(
            center: Offset(s * 0.45, s * 0.65),
            radius: s * 0.05,
          )));
        break;
      case DoodleKind.therm:
        Wobble.drawCircle(canvas, Offset(s * 0.5, s * 0.78), s * 0.14,
            stroke: color, strokeWidth: 1.4);
        drawWob(Path()
          ..addRRect(RRect.fromRectAndRadius(
            Rect.fromLTWH(s * 0.42, s * 0.10, s * 0.16, s * 0.60),
            Radius.circular(s * 0.08),
          )));
        canvas.drawCircle(
          Offset(s * 0.5, s * 0.78),
          s * 0.07,
          Paint()..color = color..style = PaintingStyle.fill,
        );
        break;
      case DoodleKind.scale:
        drawWob(Path()
          ..moveTo(s * 0.1, s * 0.25)
          ..lineTo(s * 0.9, s * 0.25));
        drawWob(Path()
          ..moveTo(s * 0.5, s * 0.25)
          ..lineTo(s * 0.5, s * 0.85));
        drawWob(Path()
          ..moveTo(s * 0.3, s * 0.85)
          ..lineTo(s * 0.7, s * 0.85));
        for (final cx in [0.22, 0.78]) {
          drawWob(Path()
            ..moveTo(s * (cx - 0.13), s * 0.35)
            ..lineTo(s * (cx + 0.13), s * 0.35)
            ..lineTo(s * cx, s * 0.55)
            ..close());
          drawWob(Path()
            ..moveTo(s * cx, s * 0.25)
            ..lineTo(s * cx, s * 0.35));
        }
        break;
      case DoodleKind.pencil:
        drawWob(Path()
          ..moveTo(s * 0.15, s * 0.85)
          ..lineTo(s * 0.85, s * 0.15)
          ..lineTo(s * 0.95, s * 0.25)
          ..lineTo(s * 0.25, s * 0.95)
          ..close());
        break;
      case DoodleKind.cup:
        drawWob(Path()
          ..moveTo(s * 0.20, s * 0.30)
          ..lineTo(s * 0.25, s * 0.85)
          ..lineTo(s * 0.75, s * 0.85)
          ..lineTo(s * 0.80, s * 0.30)
          ..close());
        Wobble.drawCircle(canvas, Offset(s * 0.82, s * 0.55), s * 0.10,
            stroke: color);
        drawWob(Path()
          ..moveTo(s * 0.4, s * 0.20)
          ..cubicTo(
              s * 0.5, s * 0.05, s * 0.35, s * 0.10, s * 0.45, s * -0.05));
        break;
      case DoodleKind.drop:
        drawWob(Path()
          ..moveTo(s * 0.5, s * 0.1)
          ..cubicTo(s * 0.85, s * 0.50, s * 0.85, s * 0.85, s * 0.5, s * 0.90)
          ..cubicTo(s * 0.15, s * 0.85, s * 0.15, s * 0.50, s * 0.5, s * 0.1));
        break;
      case DoodleKind.globe:
        Wobble.drawCircle(canvas, Offset(s * 0.5, s * 0.5), s * 0.4,
            stroke: color);
        drawWob(Path()
          ..moveTo(s * 0.10, s * 0.5)
          ..lineTo(s * 0.90, s * 0.5));
        drawWob(Path()
          ..moveTo(s * 0.5, s * 0.1)
          ..cubicTo(s * 0.25, s * 0.5, s * 0.25, s * 0.5, s * 0.5, s * 0.9));
        drawWob(Path()
          ..moveTo(s * 0.5, s * 0.1)
          ..cubicTo(s * 0.75, s * 0.5, s * 0.75, s * 0.5, s * 0.5, s * 0.9));
        break;
      case DoodleKind.heart:
        drawWob(Path()
          ..moveTo(s * 0.5, s * 0.85)
          ..cubicTo(s * 0.1, s * 0.55, s * 0.15, s * 0.20, s * 0.5, s * 0.35)
          ..cubicTo(s * 0.85, s * 0.20, s * 0.9, s * 0.55, s * 0.5, s * 0.85));
        break;
      case DoodleKind.saw:
        drawWob(Path()
          ..moveTo(s * 0.1, s * 0.7)
          ..lineTo(s * 0.9, s * 0.7));
        final teeth = Path()..moveTo(s * 0.1, s * 0.7);
        for (int i = 0; i < 7; i++) {
          final x1 = s * (0.15 + i * 0.115);
          final x2 = s * (0.21 + i * 0.115);
          teeth.lineTo(x1, s * 0.40);
          teeth.lineTo(x2, s * 0.70);
        }
        drawWob(teeth);
        break;
      case DoodleKind.pin:
        drawWob(Path()
          ..moveTo(s * 0.35, s * 0.15)
          ..lineTo(s * 0.65, s * 0.15)
          ..lineTo(s * 0.60, s * 0.45)
          ..lineTo(s * 0.75, s * 0.55)
          ..lineTo(s * 0.25, s * 0.55)
          ..lineTo(s * 0.40, s * 0.45)
          ..close());
        drawWob(Path()
          ..moveTo(s * 0.5, s * 0.55)
          ..lineTo(s * 0.5, s * 0.92));
        break;
      case DoodleKind.arrow:
        drawWob(Path()
          ..moveTo(s * 0.10, s * 0.5)
          ..lineTo(s * 0.90, s * 0.5));
        drawWob(Path()
          ..moveTo(s * 0.70, s * 0.30)
          ..lineTo(s * 0.90, s * 0.5)
          ..lineTo(s * 0.70, s * 0.70));
        break;
      case DoodleKind.swap:
        drawWob(Path()
          ..moveTo(s * 0.15, s * 0.35)
          ..lineTo(s * 0.85, s * 0.35));
        drawWob(Path()
          ..moveTo(s * 0.75, s * 0.20)
          ..lineTo(s * 0.85, s * 0.35)
          ..lineTo(s * 0.75, s * 0.50));
        drawWob(Path()
          ..moveTo(s * 0.85, s * 0.65)
          ..lineTo(s * 0.15, s * 0.65));
        drawWob(Path()
          ..moveTo(s * 0.25, s * 0.50)
          ..lineTo(s * 0.15, s * 0.65)
          ..lineTo(s * 0.25, s * 0.80));
        break;
      case DoodleKind.bolt:
        drawWob(Path()
          ..moveTo(s * 0.55, s * 0.10)
          ..lineTo(s * 0.20, s * 0.55)
          ..lineTo(s * 0.45, s * 0.55)
          ..lineTo(s * 0.40, s * 0.90)
          ..lineTo(s * 0.80, s * 0.40)
          ..lineTo(s * 0.55, s * 0.40)
          ..close());
        break;
      case DoodleKind.star:
        final star = Path();
        const pts = 5;
        const cx = 0.5, cy = 0.5, r1 = 0.42, r2 = 0.18;
        for (int i = 0; i < pts * 2; i++) {
          final angle = -math.pi / 2 + i * math.pi / pts;
          final r = i.isEven ? r1 : r2;
          final x = cx + r * math.cos(angle);
          final y = cy + r * math.sin(angle);
          if (i == 0) {
            star.moveTo(x * s, y * s);
          } else {
            star.lineTo(x * s, y * s);
          }
        }
        star.close();
        drawWob(star);
        break;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
