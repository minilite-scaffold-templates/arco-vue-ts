declare global {
  type Nullable<T> = T | null

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  // type NonNullable<T> = T extends null | undefined ? never : T
  type Recordable<T = any> = Record<string, T>
  type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  type Indexable<T = any> = {
    [key: string]: T
  }
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>

  interface ChangeEvent extends Event {
    target: HTMLInputElement
  }

  interface WheelEvent {
    path?: EventTarget[]
  }

  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  interface ViteEnv {
    VITE_PORT: number
    VITE_USE_MOCK: boolean
    VITE_PUBLIC_PATH: string
    VITE_GLOB_APP_TITLE: string
    VITE_GLOB_APP_SHORT_NAME: string
    VITE_GLOB_COPYRIGHT: string
    VITE_GLOB_LOGO: string
    VITE_GLOB_FAVICON: string
    VITE_GLOB_QINIU_DIR: string
    VITE_DROP_CONSOLE: boolean
    VITE_GLOB_PROD_MOCK: boolean
    VITE_GLOB_IMG_URL: string
    VITE_PROXY: [string, string][]
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  }

  function parseInt(s: string | number, radix?: number): number

  function parseFloat(string: string | number): number
}

export {}
