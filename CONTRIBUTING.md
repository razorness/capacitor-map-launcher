# Contributing

This guide provides instructions for contributing to this Capacitor plugin.

## Developing

### Local Setup

1. Fork and clone the repo.
1. Install the dependencies with [pnpm](https://pnpm.io) (version pinned via `packageManager` in `package.json`, e.g. `corepack enable`). This also installs the example app in `example/`, which is part of the pnpm workspace.

    ```shell
    pnpm install
    ```

1. For Android, install a JDK 21 (e.g. Temurin). The Gradle daemon JVM is pinned in `android/gradle/gradle-daemon-jvm.properties`, so Gradle picks a locally installed JDK 21 regardless of `JAVA_HOME`; it does not download one.
1. Install SwiftLint if you're on macOS.

    ```shell
    brew install swiftlint
    ```

### Scripts

#### `pnpm run build`

Build the plugin web assets and generate plugin API documentation using [`@capacitor/docgen`](https://github.com/ionic-team/capacitor-docgen).

It type-checks `src/` with `tsc` and bundles it with [tsdown](https://tsdown.dev) into `dist/index.js` plus type declarations in `dist/index.d.ts`. The package is published as ESM only — there is no CommonJS or `<script>`-tag build.

#### `pnpm test`

Run the unit tests with [Vitest](https://vitest.dev). They snapshot the deep link generated for every map type and check that the map lists in TypeScript, Swift, Kotlin, the Android manifest and the README stay in sync. Update snapshots with `pnpm exec vitest run -u` and review the diff.

#### `pnpm run verify`

Build and validate the web and native projects.

This is useful to run in CI to verify that the plugin builds for all platforms.

#### `pnpm run lint` / `pnpm run fmt`

Check formatting and code quality, autoformat/autofix if possible.

The project uses ESLint and SwiftLint. There is intentionally no Prettier: the TypeScript sources use a hand-aligned tab style.

## Publishing

Releases are published to npm by GitHub Actions (`.github/workflows/release.yml`) using npm trusted publishing — no npm token is stored in the repository.

1. Bump `version` in `package.json` and commit.
1. Push a matching tag, e.g. `v1.2.3` (or create a GitHub release with that tag):

    ```shell
    git tag v1.2.3
    git push origin v1.2.3
    ```

The workflow runs the full CI (workflow security check, web, Android, iOS), checks that the tag matches the `package.json` version, builds and packs the tarball in an unprivileged job and publishes it from a separate job in the `npm` environment, which is the only one allowed to request an npm publish token. Tags with a prerelease suffix (e.g. `v1.3.0-beta.1`) are published under the `next` dist-tag.

> **Note**: The [`files`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#files) array in `package.json` specifies which files get published. If you rename files/directories or add files elsewhere, you may need to update it.
