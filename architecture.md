# Smidge Architecture

This document describes the current architecture of Smidge. The Flutter app in `flutter_app/` is the primary implementation. The root-level React/Babel app is a prototype that mirrors the same product model for fast iteration.

## System Overview

Smidge is a client-only app. UI screens call a small state layer, the state layer calls pure conversion helpers, and persisted preferences are stored locally. There is no backend in the current repository.

```mermaid
flowchart TD
    User["User"]
    FlutterApp["Flutter app"]
    RootPrototype["React/Babel prototype"]
    Screens["Screens"]
    AppState["AppState ChangeNotifier"]
    ConversionData["Conversion data and helpers"]
    DesignSystem["Design widgets and painters"]
    LocalPrefs["shared_preferences"]
    LocalStorage["localStorage"]

    User --> FlutterApp
    User --> RootPrototype
    FlutterApp --> Screens
    Screens --> AppState
    Screens --> ConversionData
    Screens --> DesignSystem
    AppState --> ConversionData
    AppState --> LocalPrefs
    RootPrototype --> LocalStorage
```

## Runtime Targets

The Flutter implementation supports the platforms scaffolded under `flutter_app/`: Android, iOS, and web. The prototype can be served as static files from the repository root.

```mermaid
flowchart LR
    Repo["smidge repository"]
    Repo --> Flutter["flutter_app"]
    Repo --> Prototype["root prototype"]

    Flutter --> Android["android"]
    Flutter --> IOS["ios"]
    Flutter --> Web["web"]

    Prototype --> Html["index.html"]
    Prototype --> JsState["app.js"]
    Prototype --> JsData["data.js"]
    Prototype --> JsDesign["design.js"]
    Prototype --> JsScreens["screens.js"]
```

## Flutter Module Map

The Flutter code is split into entrypoint, state, data, design, and screens. Data modules are deliberately pure or nearly pure so conversion behavior remains easy to test.

```mermaid
flowchart TD
    Main["lib/main.dart"]
    State["lib/state/app_state.dart"]
    Units["lib/data/units.dart"]
    Convert["lib/data/convert.dart"]
    Format["lib/data/format.dart"]
    Screens["lib/screens/*"]
    Design["lib/design/*"]
    Prefs["shared_preferences"]

    Main --> State
    Main --> Screens
    Main --> Design
    State --> Units
    State --> Convert
    State --> Format
    State --> Prefs
    Screens --> State
    Screens --> Units
    Screens --> Convert
    Screens --> Format
    Screens --> Design
    Convert --> Units
```

## App Startup

`main.dart` initializes Flutter bindings, sets the system UI overlay, builds `SmidgeApp`, loads `AppState`, checks onboarding status, and then chooses either onboarding screens or the home converter.

```mermaid
flowchart TD
    Start["main"]
    Bindings["WidgetsFlutterBinding.ensureInitialized"]
    SystemUi["Set transparent status bar"]
    RunApp["runApp SmidgeApp"]
    Root["_Root creates AppState"]
    LoadState["AppState.load"]
    CheckOnboarding["AppState.isOnboarded"]
    Splash["ScrSplash"]
    Onboarding["Onboarding flow"]
    Home["ScrHome"]

    Start --> Bindings
    Bindings --> SystemUi
    SystemUi --> RunApp
    RunApp --> Root
    Root --> LoadState
    LoadState --> CheckOnboarding
    CheckOnboarding -->|"unknown or waiting"| Splash
    CheckOnboarding -->|"false"| Onboarding
    CheckOnboarding -->|"true"| Home
```

## Onboarding Flow

Onboarding collects category interest, default measurement system, and three pinned conversions. The persisted outputs are onboarding completion, selected system, and pins.

```mermaid
flowchart TD
    Splash["ScrSplash"]
    Welcome["ScrWelcome"]
    PickCats["ScrPickCats"]
    Pref["ScrPref"]
    PinThree["ScrPinThree"]
    SetSystem["AppState.setSystem"]
    SetPins["AppState.setPins"]
    SetDone["AppState.setOnboarded"]
    Home["ScrHome"]

    Splash --> Welcome
    Welcome --> PickCats
    PickCats --> Pref
    Pref --> PinThree
    PinThree --> SetSystem
    PinThree --> SetPins
    PinThree --> SetDone
    SetDone --> Home
```

## Screen Navigation

The Flutter app uses `Navigator.push` and `MaterialPageRoute` directly. The home screen is the hub for library, pins, unit picker, multi-unit view, and vertical calculators.

```mermaid
flowchart TD
    Home["ScrHome"]
    Pins["ScrPins"]
    Library["ScrLibrary"]
    UnitPickerFrom["ScrUnitPicker from"]
    UnitPickerTo["ScrUnitPicker to"]
    Multi["ScrMulti"]
    Cooking["ScrCooking"]
    Medical["ScrMedical"]
    Trades["ScrTrades"]
    Currency["ScrCurrency"]

    Home --> Pins
    Home --> Library
    Home --> UnitPickerFrom
    Home --> UnitPickerTo
    Home --> Multi
    Home --> Cooking
    Home --> Medical
    Home --> Trades
    Home --> Currency
    Library --> Cooking
    Library --> Medical
    Library --> Trades
    Library --> Currency
    Pins --> Cooking
    Pins --> Medical
    Pins --> Home
```

## State Model

`AppState` is a `ChangeNotifier` that stores the active conversion, input expression, focused side, user pins, preferred system, and decimal setting. Mutating methods update memory, notify listeners, and persist.

```mermaid
classDiagram
    class AppState {
        +String category
        +String fromUnit
        +String toUnit
        +String expression
        +bool exprMode
        +InputSide inputSide
        +List pins
        +String system
        +int decimals
        +load()
        +persist()
        +onKey(String k)
        +swap()
        +setSide(InputSide side)
        +setCategory(String cat)
        +setUnit(InputSide side, String unit)
        +toggleExpr()
        +setSystem(String s)
        +setPins(List list)
        +String fromDisplay
        +String toDisplay
    }

    class UnitCategory {
        +String id
        +String name
        +DoodleKind icon
        +Color color
        +String defaultFrom
        +String defaultTo
        +bool special
        +Map units
    }

    class Unit {
        +String name
        +String sym
        +double factor
    }

    AppState --> UnitCategory
    UnitCategory --> Unit
```

## State Update Flow

The state layer keeps UI updates and persistence in one path. Screens do not write directly to local storage.

```mermaid
sequenceDiagram
    participant User
    participant Screen
    participant AppState
    participant Convert as Conversion helpers
    participant Prefs as shared_preferences

    User->>Screen: Tap key, swap, category, or unit
    Screen->>AppState: Call action method
    AppState->>Convert: Evaluate or convert when needed
    Convert-->>AppState: Numeric result
    AppState->>AppState: Mutate fields
    AppState->>Screen: notifyListeners
    AppState->>Prefs: persist JSON state
    Screen-->>User: Rebuild with new display
```

## Conversion Flow

General categories convert through a base-unit factor. Temperature uses custom formulas. Specialist calculators call dedicated helpers.

```mermaid
flowchart TD
    Input["Input value"]
    Category["Category key"]
    IsSpecial{"Category special?"}
    Temp["convertTemp"]
    Linear["value * from.factor / to.factor"]
    Cooking["cookingConvert"]
    Glucose["convertGlucose and glucoseRange"]
    Trades["mmToFtInFrac"]
    Currency["amount / fromRate * toRate"]
    Format["fmt"]
    Output["Display output"]

    Input --> Category
    Category --> IsSpecial
    IsSpecial -->|"yes"| Temp
    IsSpecial -->|"no"| Linear
    Input --> Cooking
    Input --> Glucose
    Input --> Trades
    Input --> Currency
    Temp --> Format
    Linear --> Format
    Cooking --> Format
    Glucose --> Format
    Trades --> Format
    Currency --> Format
    Format --> Output
```

## General Converter Sequence

This is the main home-screen path for categories such as length, mass, volume, area, speed, time, data, pressure, and energy.

```mermaid
sequenceDiagram
    participant User
    participant Home as ScrHome
    participant State as AppState
    participant Eval as evalExpr
    participant Convert as convert
    participant Format as fmt

    User->>Home: Enter value on keypad
    Home->>State: onKey(k)
    State->>Eval: evalExpr(expression)
    Eval-->>State: Parsed number
    State-->>Home: notifyListeners
    Home->>Convert: convert(value, fromUnit, toUnit, category)
    Convert-->>Home: Raw number
    Home->>Format: fmt(raw)
    Format-->>Home: Display string
    Home-->>User: Shows from and to values
```

## Specialist Calculator Map

Specialist screens are intentionally separate from the general category system because they need domain-specific data, formatting, or interpretation.

```mermaid
flowchart TD
    Specialists["Specialist calculators"]
    Cooking["Cooking"]
    Medical["Medical"]
    Trades["Trades"]
    Currency["Currency"]

    Cooking --> Ingredients["Ingredient grams per US cup"]
    Cooking --> Targets["g, oz, lb, kg, mL"]

    Medical --> Glucose["mg/dL and mmol/L glucose"]
    Medical --> Ranges["Fasting range indicator"]

    Trades --> Millimetres["Millimetres"]
    Trades --> Fractions["ft, in, fraction denominator"]

    Currency --> Rates["Static USD-relative rates"]
    Currency --> OtherCurrencies["Other currency list"]
```

## Persistence

Flutter persistence is a JSON blob plus a separate onboarding marker in `shared_preferences`.

```mermaid
flowchart LR
    AppState["AppState"]
    Json["JSON state blob"]
    StateKey["smidge_state"]
    OnboardedKey["smidge_onboarded"]
    Prefs["shared_preferences"]

    AppState --> Json
    Json --> StateKey
    AppState --> OnboardedKey
    StateKey --> Prefs
    OnboardedKey --> Prefs
    Prefs --> AppState
```

## Design System

The UI uses a compact custom design system instead of a third-party component library. Shared widgets and painters keep the hand-drawn style consistent across screens.

```mermaid
flowchart TD
    Colors["colors.dart"]
    Wobble["wobble.dart"]
    Doodles["doodles.dart"]
    Widgets["sk_widgets.dart"]
    Screens["screens"]

    Colors --> Wobble
    Colors --> Doodles
    Colors --> Widgets
    Wobble --> Widgets
    Wobble --> Doodles
    Doodles --> Widgets
    Widgets --> Screens
    Doodles --> Screens
```

## Prototype Parity

The root prototype keeps a similar conceptual architecture using React state, reducer actions, static data helpers, and browser `localStorage`.

```mermaid
flowchart TD
    Html["index.html"]
    AppJs["app.js"]
    ScreensJs["screens.js"]
    DataJs["data.js"]
    DesignJs["design.js"]
    LocalStorage["localStorage"]

    Html --> DesignJs
    Html --> DataJs
    Html --> ScreensJs
    Html --> AppJs
    AppJs --> ScreensJs
    AppJs --> DataJs
    AppJs --> LocalStorage
    ScreensJs --> DataJs
    ScreensJs --> DesignJs
```

## Boundaries And Current Limitations

- The app is offline-first and has no network integration.
- Currency conversion uses static bundled rates, not live exchange rates.
- Medical context is educational and should not be treated as medical advice.
- Onboarding currently persists system preference, pins, and completion status; category interest is used during onboarding but is not stored as an active category filter.
- State management is intentionally simple and local to `AppState`; there is no dependency injection or repository layer.
