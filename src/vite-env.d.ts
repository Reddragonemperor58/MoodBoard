/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SKIP_TESTS: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Ensure TypeScript understands module imports
declare module '*.tsx' {
  import type { ComponentType } from 'react';
  const component: ComponentType;
  export default component;
}

declare module '*.js' {
  const value: any;
  export default value;
}
