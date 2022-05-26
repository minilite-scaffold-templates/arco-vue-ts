import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

interface RouteMeta {
  title?: string
  roles?: string[]
  requiresAuth?: boolean
  icon?: string
  locale?: string
  hideInMenu?: boolean
  hideChildrenInMenu?: boolean
  order?: number
  noAffix?: boolean
  ignoreCache?: boolean
}
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
  icon?: string

  // 跳转地址
  frameSrc?: string

  // 外链跳转地址
  externalLink?: string

  // 隐藏
  hidden?: boolean

  // 隐藏面包屑
  hideBreadcrumb?: boolean

  roles?: string[] // 控制对页具有访问权限的角色

  requiresAuth?: boolean // 是否需要登录才能访问当前页面(每个路由都必须声明)

  locale?: string // 区域名称显示在边菜单和面包屑中

  hideInMenu?: boolean // 如果为true，则不会显示在侧边菜单中

  hideChildrenInMenu?: boolean // 如果设置为true，子菜单不会显示在侧边菜单中

  order?: number // 排序路由菜单项。如果set key，值越高，越正向

  noAffix?: boolean // 如果设置为true，标签将不会添加到选项卡栏中

  ignoreCache?: boolean // 如果设置为true，页面将不会被缓存
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
