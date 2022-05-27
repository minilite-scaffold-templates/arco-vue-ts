import { Layout } from '@/router/constant'
import { RouteRecordRaw } from 'vue-router'

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.requiresAuth 只有登录才能有权限
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.order 排序越小越排前
 * @param meta.roles 控制页面具有访问权限的角色
 *
 * */

// 首页仪表盘
const dashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  meta: {
    title: '首页',
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    hidden: false,
    order: 0,
  },
  children: [
    {
      path: 'index',
      name: 'DashboardIndex',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '仪表盘',
        locale: 'menu.dashboard.index',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'workplace',
      name: 'DashboardWorkplace',
      component: () => import('@/views/dashboard/workplace.vue'),
      meta: {
        title: '工作台',
        locale: 'menu.dashboard.index',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default dashboardRoute
