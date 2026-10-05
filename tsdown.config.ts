import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  platform: 'browser',
  target: 'es2017',
  outDir: 'dist',
  sourcemap: true,
  dts: { sourcemap: true },
  // `dist/` is cleaned by the `clean` script, so docgen output survives
  clean: false,
});
