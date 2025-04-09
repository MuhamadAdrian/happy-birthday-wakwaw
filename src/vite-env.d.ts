/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BIRTHDAY_PERSON_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}