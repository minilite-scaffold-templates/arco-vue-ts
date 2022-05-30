import { Layout } from '@/router/constant'
import { RouteRecordRaw } from 'vue-router'

// 首页仪表盘
const dashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  redirect: '/dashboard/index',
  meta: {
    title: '首页',
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-home',
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
  ],
}

export default dashboardRoute
