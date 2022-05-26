import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// interface RouteMeta {
//     title?: string
//     roles?: string[] // Controls roles that have access to the page
//     requiresAuth?: boolean // Whether login is required to access the current page (every route must declare)
//     icon?: string // The icon show in the side menu
//     locale?: string // The locale name show in side menu and breadcrumb
//     hideInMenu?: boolean // If true, it is not displayed in the side menu
//     hideChildrenInMenu?: boolean // if set true, the children are not displayed in the side menu
//     order?: number // Sort routing menu items. If set key, the higher the value, the more forward it is
//     noAffix?: boolean // if set true, the tag will not affix in the tab-bar
//     ignoreCache?: boolean // if set true, the page will not be cached
// }
// 扩展Meta类型
export interface Meta extends RouteMeta {
  // 名称
  title: string
  // 是否忽略权限
  ignoreAuth?: boolean

  // 权限集
  permissions?: string[]

  // 是否不缓存
  noKeepAlive?: boolean

  // 是否固定在tab上
  affix?: boolean

  // tab上的图标
  icon?: any

  // 跳转地址
  frameSrc?: string

  // 外链跳转地址
  externalLink?: string

  // 隐藏
  hidden?: boolean

  // 隐藏面包屑
  hideBreadcrumb?: boolean
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  path: string
  name: string
  meta: Meta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
  redirect?: string
  hidden?: Meta.hidden
}
