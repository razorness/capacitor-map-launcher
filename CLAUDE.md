# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Capacitor 8 plugin (`capacitor-map-launcher`) that opens coordinates in native map apps (Google Maps, Waze, Apple Maps, OsmAnd, Baidu, …). Web layer in TypeScript (`src/`), native layers in Kotlin (`android/`) and Swift (`ios/`, distributed via both SPM `Package.swift` and CocoaPods `CapacitorMapLauncher.podspec`, iOS 15+, Android minSdk 24).

## Commands

Package manager is **pnpm** (version pinned in `packageManager`; Node 22+). `pnpm-workspace.yaml` makes `example/` a workspace package and sets `nodeLinker: hoisted` — keep it: Capacitor's `cap sync` resolves symlinks, so pnpm's default isolated layout writes versioned `node_modules/.pnpm/...` paths into the example's generated Gradle/Podfile files.

```bash
pnpm install
pnpm run build          # clean → docgen (rewrites README API section + dist/docs.json) → tsc --noEmit → tsdown
pnpm run watch          # tsdown --watch
pnpm test               # vitest run; update snapshots with `pnpm exec vitest run -u`
pnpm exec vitest run test/nativeParity.test.ts   # single test file
pnpm run eslint         # ESLint only (what CI runs on Linux)
pnpm run lint           # eslint + swiftlint (swiftlint is macOS only)
pnpm run fmt            # autofix all of the above
pnpm run verify:android # cd android && ./gradlew clean build test  (Java 21, runs Kotlin unit tests)
pnpm run verify:ios     # xcodebuild (macOS only)
```

- Pass extra args to scripts without `--` (`pnpm run eslint --fix`); pnpm forwards a literal `--` to the tool.
- No Prettier on purpose: `src/*.ts` use a deliberate hand-aligned tab style. Don't add a formatter or mass-reformat.
- Tests:
  - `test/urlGenerator.test.ts` snapshots every map type's URL on Android and iOS — review snapshot diffs deliberately, they *are* the URL contract.
  - `test/nativeParity.test.ts` parses Swift, Kotlin, AndroidManifest, README and the example `Info.plist` and asserts they agree with the TS `MapType` enum. It needs no native toolchain, so run it after any map-list change.
  - Native unit tests: `android/src/test/kotlin`, `ios/Tests` (only compile/run in CI or with Android SDK / Xcode).
- `dist/` is committed; rebuild it (`pnpm run build`) when changing `src/`.
- **ESM only** (`"type": "module"`, single bundle `dist/index.js` + `dist/index.d.ts` via `tsdown.config.ts`) — CommonJS/IIFE builds were dropped on purpose; don't reintroduce them. tsdown does not type-check, hence the separate `tsc --noEmit` (tsconfig has `noEmit: true`). Keep `"./package.json"` in `exports`: the Capacitor CLI resolves plugins through it.
- The README's `<docgen-index>` / `<docgen-api>` blocks are generated from JSDoc in `src/definitions.ts` — edit the source and rebuild, never hand-edit those blocks. `@capacitor/docgen` is pinned to exactly `0.3.0`: 0.3.1 emits `any` for all method return types.
- Example app (`example/`, Vite + Vue 3, depends on the plugin via `workspace:*`): `pnpm --filter capacitor-app start` for the web shell; from `example/`, `pnpm exec cap sync` / `pnpm exec cap open android|ios` for native.

## Releasing

`.github/workflows/release.yml` publishes to npm on a pushed `v*.*.*` tag via npm trusted publishing (OIDC, no token; provenance via `publishConfig`). The tag must equal `v` + `package.json` `version` or the job fails; prerelease tags (`v1.0.0-beta.1`) go to the `next` dist-tag. It first runs the full CI workflow (`ci.yml`: web, Android, iOS) via `workflow_call`. CI also fails if the committed `dist/` or README differ from a fresh build.

## Architecture

**URLs are generated in TypeScript, not natively.** The public entry point is the exported `showMarker(mapType, coords, title?, description?, zoom = 16)` in `src/index.ts`. It calls `generateMarkerUrl()` (`src/urlGenerator.ts`) — a big `switch` over `MapType` producing each app's deep link (branching on `Capacitor.getPlatform()` where iOS and Android schemes differ) — and passes the finished `url` plus `lat`/`lon`/`title` to the native `showMarker` method of the plugin registered as `CapacitorMapLauncher`.

- **Coordinates are `[lon, lat]`** (GeoJSON order): `coords[0]` = longitude, `coords[1]` = latitude.
- Native `showMarker` just checks the app is installed and opens the URL:
  - Android (`MapLauncherPlugin.kt`): `Intent.ACTION_VIEW` restricted via `setPackage()` to the map's package name.
  - iOS (`MapLauncher.swift`): `UIApplication.shared.open(url)` for every app, including Apple Maps (`https://maps.apple.com/` links, no MapKit). Capacitor calls plugin methods off the main thread, so `MapLauncherPlugin.swift` dispatches all UIKit work to `DispatchQueue.main`.
- Failures reject with `MAP_NOT_AVAILABLE`, `INVALID_URL` or `OPEN_FAILED` on both platforms (documented in the README).
- Installed-app detection: Android uses `getLaunchIntentForPackage(packageName)`; iOS uses `canOpenURL(urlPrefix)` (Apple Maps is always available). Consuming apps must declare the schemes in their iOS `LSApplicationQueriesSchemes`.

### Adding or changing a map app — touch every one of these

1. `src/definitions.ts` — `MapType` enum (string value is the cross-platform identifier).
2. `src/urlGenerator.ts` — URL case.
3. Android: `MapType.kt` (constant name must equal the TS string value), the `MAPS` list in `MapModel.kt` (package name), and a `<package>` entry under `<queries>` in `android/src/main/AndroidManifest.xml` (package visibility on Android 11+).
4. iOS: `MapType` in `MapModel.swift` (raw value = TS string value) and the `maps` list in `MapLauncher.swift` (URL scheme prefix). Add the scheme to the README's `LSApplicationQueriesSchemes` snippet and the example's `Info.plist`.
5. `assets/icons/<mapType>.svg`.
6. `pnpm exec vitest run -u`, review the new snapshots, then rebuild so README/dist update. `nativeParity.test.ts` fails if any step 1–4 is missing.

Platform-only maps (marked "Only available on …" in `definitions.ts`) are simply absent from the other platform's lists.

## Style

ESLint/SwiftLint configs come from `@ionic/*` presets (`eslint.config.mjs`, `package.json`). Existing TS/Swift files use tabs and aligned colons in object literals and `switch` blocks — match the surrounding file.
