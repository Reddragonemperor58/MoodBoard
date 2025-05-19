import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());
  
  return {
    plugins: [react()],
    // Set the base path according to the environment
    base: '/',
    build: {
      // Prevent test files from being included in the build
      rollupOptions: {
        external: [/\.test\.tsx?$/, /\.spec\.tsx?$/],
      },
    },
    define: {
      // Make sure environment variables are properly exposed
      'process.env.VITE_SKIP_TESTS': JSON.stringify(env.VITE_SKIP_TESTS || 'true')
    }
  };
});
