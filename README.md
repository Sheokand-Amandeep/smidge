# Smidge

Smidge is a tiny, careful unit converter focused on fast, readable conversions. The main implementation is a Flutter app for mobile and web. A React/Babel prototype is kept at the repository root as a design and interaction reference.

The app is intentionally local-first: conversion tables, specialist calculators, preferences, onboarding state, and pinned conversions all live on-device. There is no backend service in the current implementation.

## Features

- Bidirectional unit conversion with editable "from" and "to" values.
- Inline calculator mode for expressions like `3*250+50`.
- Searchable unit library and unit picker.
- Multi-unit view that converts one input across the full active category.
- Pinned quick conversions for common workflows.
- Density-aware cooking conversions from US cups to weight or volume.
- Medical glucose conversion with fasting-range context.
- Trades calculator for millimetres to feet, inches, and fractions.
- Static currency converter using bundled snapshot rates.
- Persistent preferences using `shared_preferences`.
- Hand-drawn visual system built from Flutter custom painters.

## Repository Layout

```text
.
|-- README.md
|-- architecture.md
|-- research.md
|-- index.html
|-- app.js
|-- data.js
|-- design.js
|-- screens.js
`-- flutter_app/
    |-- pubspec.yaml
    |-- lib/
    |   |-- main.dart
    |   |-- state/
    |   |-- data/
    |   |-- design/
    |   `-- screens/
    |-- android/
    |-- ios/
    `-- web/
```

## Primary App: Flutter

The Flutter app lives in `flutter_app/`.

### Requirements

- Flutter `>= 3.10.0`
- Dart `>= 3.0.0 < 4.0.0`

### Install Dependencies

```sh
cd flutter_app
flutter pub get
```

### Run

```sh
flutter run
```

For a browser target:

```sh
flutter run -d chrome
```

### Analyze

```sh
flutter analyze
```

### Test

```sh
flutter test
```

## Prototype

The root-level web prototype uses React, ReactDOM, and Babel from CDN scripts in `index.html`.

Serve it from the repository root:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

The prototype mirrors the Flutter app's interaction model and conversion data, but the Flutter app is the production target.

## Architecture

See [architecture.md](architecture.md) for the app architecture, data flow, screen map, and Mermaid diagrams.

## Data Notes

- General unit categories are static tables in `flutter_app/lib/data/units.dart`.
- Conversion logic is in `flutter_app/lib/data/convert.dart`.
- Number formatting and expression parsing are in `flutter_app/lib/data/format.dart`.
- Currency rates are static snapshot values bundled with the app.
- Medical ranges are educational context only and are not a diagnosis or dosing tool.

## Privacy

Smidge currently stores only local app preferences and onboarding state. The Flutter app uses `shared_preferences`; the root prototype uses `localStorage`. No analytics, accounts, or remote data services are present in this repository.
