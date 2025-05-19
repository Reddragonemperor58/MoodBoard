// This is a utility file that conditionally imports test-related modules
// based on the environment to prevent build errors

export function conditionalTestImport<T>(module: T): T {
  // In production builds, return an empty object that matches the expected shape
  if (import.meta.env.VITE_SKIP_TESTS === 'true') {
    return {} as T;
  }
  return module;
}
