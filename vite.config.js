/// <reference types="vitest" />
import path from 'path';
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const PACKAGE_ROOT = process.cwd();

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'docx-math-converter',
      formats: ['esm', 'cjs'],
      fileName: (format, entryName) => `docx-math-converter.${format}.js`,
    },
    minify: false,
  },
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
  define: { 
    'import.meta.vitest': 'undefined', 
  }, 
  plugins: [
    dts({ rollupTypes: true }),
    externalizeDeps({
      deps: true,
      devDeps: false,
      nodeBuiltins: true,
      optionalDeps: true,
      peerDeps: true,
      useFile: path.resolve(PACKAGE_ROOT, 'package.json'),
    }),
  ],
})