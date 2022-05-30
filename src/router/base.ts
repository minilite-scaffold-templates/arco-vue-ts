import { RouteRecordRaw } from 'vue-router'
import { Layout, Page404, RedirectName } from './constant'

// 重定向页面路由
export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  name: RedirectName,
  component: Layout,
  meta: {
    title: RedirectName,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: `${RedirectName}-index`,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideBreadcrumb: true,
      },
    },
  ],
}

// 错误页面路由
export const ErrorPageRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: '404',
  component: Layout,
  meta: {
    title: '404',
    hideBreadcrumb: true,
    keepalive: false,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: '404',
      component: Page404,
      meta: {
        title: '404',
        hideBreadcrumb: true,
      },
    },
  ],
}
