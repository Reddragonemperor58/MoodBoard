// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
  ],
  // Use relative paths for GitHub Pages
  base: './',
  build: {
    outDir: 'dist',
    // Prevent test files from being included in the build
    rollupOptions: {
      external: [
        /vitest/,
        /@testing-library/,
      ],
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          dnd: ['@dnd-kit/core', '@dnd-kit/sortable'],
        },
      },
    }
  },
  resolve: {
    alias: {
      // Create an empty module for test imports when in production
      'vitest': path.resolve(__dirname, 'src/utils/empty-module.js'),
      '@testing-library/react': path.resolve(__dirname, 'src/utils/empty-module.js'),
      '@testing-library/jest-dom': path.resolve(__dirname, 'src/utils/empty-module.js')
    }
  },
  // Handle SPA fallback for GitHub Pages
  server: {
    historyApiFallback: true,
  },
});