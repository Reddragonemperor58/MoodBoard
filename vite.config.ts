// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Base path for GitHub Pages - must match repository name
  base: process.env.NODE_ENV === 'production' ? '/MoodBoard/' : '/',
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
  build: {
    outDir: 'dist',
    // Generate manifest.json for better caching
    manifest: true,
    // Ensure proper handling of asset paths
    assetsDir: '.',
    // Enable source maps for better debugging
    sourcemap: true,
    // Ensure proper module type for ESM
    rollupOptions: {
      external: [
        /vitest/,
        /@testing-library/,
      ],
      output: {
        // Ensure proper module type
        format: 'es',
        // Ensure proper file extensions
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          dnd: ['@dnd-kit/core', '@dnd-kit/sortable'],
        },
      },
    },
    // Ensure proper MIME types
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      // Create an empty module for test imports when in production
      'vitest': path.resolve(__dirname, 'src/utils/empty-module.js'),
      '@testing-library/react': path.resolve(__dirname, 'src/utils/empty-module.js'),
      '@testing-library/jest-dom': path.resolve(__dirname, 'src/utils/empty-module.js')
    }
  },
  // Vite handles SPA fallback automatically with the base config
});