/// <reference types="vitest" />
import path from 'path';
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'docx-math-converter',
      fileName: 'docx-math-converter',
    },
  },
  test: {
    includeSource: ['src/**/*.{js,ts}'], 
  },
  define: { 
    'import.meta.vitest': 'undefined', 
  }, 
  plugins: [
    dts({ rollupTypes: true })
  ],
})