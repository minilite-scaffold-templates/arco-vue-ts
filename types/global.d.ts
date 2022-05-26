import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy

    interface ElementAttributesProperty {
      $props: any
    }

    interface IntrinsicElements {
      [elem: string]: any
    }

    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }

  // vue
  declare type PropType<T> = VuePropType<T>
  declare type VueNode = VNodeChild | JSX.Element

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  declare type Nullable<T> = T | null
  declare type NonNullable<T> = T extends null | undefined ? never : T
  declare type Recordable<T = any> = Record<string, T>
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  declare type Indexable<T = any> = {
    [key: string]: T
  }
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare type IntervalHandle = ReturnType<typeof setInterval>

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement
  }

  declare interface WheelEvent {
    path?: EventTarget[]
  }

  declare interface ViteEnv {
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
  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  declare function parseInt(s: string | number, radix?: number): number

  declare function parseFloat(string: string | number): number

  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}
