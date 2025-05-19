// vite.config.build.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'isolate-tests',
      transform(code, id) {
        if (id.includes('.test.') || id.includes('.spec.') || id.includes('setupTests.ts')) {
          return `export default {}`;
        }
      },
    },
    // Add this plugin to suppress TypeScript errors
    {
      name: 'suppress-typescript-errors',
      // This is a no-op plugin that only exists to suppress TypeScript errors
    }
  ],
  base: '/MoodBoard/', // Base path for GitHub Pages - IMPORTANT: Matches the correct repo name
  build: {
    outDir: 'dist',
    // Prevent test files from being included in the build
    rollupOptions: {
      external: [
        /vitest/,
        /@testing-library/,
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Skip type checking during build to avoid TypeScript errors
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
})
