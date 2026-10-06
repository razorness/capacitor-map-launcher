# capacitor-map-launcher example

A minimal Vite + Vue 3 app for trying out the plugin on a device or simulator. It is a
workspace package of the repository and uses the plugin source from the repository root.

## Setup

Run these from the repository root (Node 22+, pnpm):

```bash
pnpm install
pnpm run build # build the plugin
```

## Web

```bash
pnpm --filter capacitor-app start
```

## Native

From `example/`:

```bash
pnpm run sync               # build the web app and copy it into the native projects
pnpm exec cap open ios      # or: android
```

Run `pnpm run sync` again after changing the web app or the plugin's TypeScript (rebuild the
plugin first with `pnpm run build` in the repository root); `pnpm run sync ios` syncs only one
platform. A plain `cap sync` copies whatever is in `dist/`, which may be outdated. Native plugin
code is compiled from source, so Swift and Kotlin changes only need a rebuild in Xcode or
Android Studio.

### iOS signing

The Xcode project has no development team configured. The simulator works without one. To
run on a device, select your own team under *Signing & Capabilities* of the `App` target.
If the bundle identifier `com.razorness.plugins.map-launcher.example` is already taken,
change it to one of your own there. Please don't commit those changes.
