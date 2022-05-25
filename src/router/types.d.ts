import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

declare global {
  type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

  // 扩展Meta类型
  interface Meta extends RouteMeta {
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

  interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
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
}

export {}
