// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd())
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true'
  
  return {
    plugins: [react()],
    base: isVercel ? '/' : '/MoodBoard/', // Use root path for Vercel
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
        'vitest': mode === 'production' ? resolve(__dirname, 'src/utils/empty-module.js') : 'vitest',
        '@testing-library/react': mode === 'production' ? resolve(__dirname, 'src/utils/empty-module.js') : '@testing-library/react',
        '@testing-library/jest-dom': mode === 'production' ? resolve(__dirname, 'src/utils/empty-module.js') : '@testing-library/jest-dom'
      }
    }
  }
})