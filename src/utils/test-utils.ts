// This is a utility file that conditionally imports test-related modules
// based on the environment to prevent build errors

/**
 * Conditionally imports a test module based on the VITE_SKIP_TESTS environment variable
 * This prevents test modules from being included in production builds
 */
export function conditionalTestImport<T>(module: T): T {
  // Check if we're running in a production build with tests skipped
  const skipTests = import.meta.env?.VITE_SKIP_TESTS === 'true';
  
  // In production builds, return an empty object that matches the expected shape
  if (skipTests) {
    return {} as T;
  }
  return module;
}
