/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
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
})