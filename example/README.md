# capacitor-map-launcher example

A minimal Vite + Vue 3 app for trying out the plugin on a device or simulator. It is a
workspace package of the repository and uses the plugin source from the repository root.

## Setup

Run these from the repository root (Node 22+, pnpm):

```bash
pnpm install
pnpm run build                    # build the plugin
pnpm --filter capacitor-app build # build the example web app
```

## Web

```bash
pnpm --filter capacitor-app start
```

## Native

From `example/`:

```bash
pnpm exec cap sync
pnpm exec cap open ios      # or: android
```

Run `cap sync` again after changing the plugin or the web app.

### iOS signing

The Xcode project has no development team configured. The simulator works without one. To
run on a device, select your own team under *Signing & Capabilities* of the `App` target.
If the bundle identifier `com.razorness.plugins.map-launcher.example` is already taken,
change it to one of your own there. Please don't commit those changes.
