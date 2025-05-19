// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MoodBoard/', // Base path for GitHub Pages - IMPORTANT: Matches the correct repo name
  build: {
    // Prevent test files from being included in the build
    rollupOptions: {
      external: [
        /vitest/,
        /@testing-library/,
        /\.test\.tsx?$/,
        /\.spec\.tsx?$/,
        'src/setupTests.ts'
      ]
    }
  },
  resolve: {
    alias: {
      // Create an empty module for test imports when in production
      'vitest': process.env.NODE_ENV === 'production' ? resolve(__dirname, 'src/utils/empty-module.js') : 'vitest',
      '@testing-library/react': process.env.NODE_ENV === 'production' ? resolve(__dirname, 'src/utils/empty-module.js') : '@testing-library/react',
      '@testing-library/jest-dom': process.env.NODE_ENV === 'production' ? resolve(__dirname, 'src/utils/empty-module.js') : '@testing-library/jest-dom'
    }
  }
})