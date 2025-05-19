/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SKIP_TESTS: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
