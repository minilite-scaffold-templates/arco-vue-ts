import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const systemRoute: RouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: Layout,
  meta: {
    title: '系统设置',
    icon: 'icon-tool',
    hidden: false,
    requiresAuth: true,
    order: 2,
  },
  children: [
    {
      path: 'menu',
      name: 'SystemMenu',
      meta: {
        title: '菜单权限管理',
        requiresAuth: true,
        locale: 'menu.system.menu.index',
      },
      component: () => import('@/views/system/menu/menu.vue'),
    },
  ],
}

export default systemRoute
