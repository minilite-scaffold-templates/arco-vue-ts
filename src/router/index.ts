import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { RedirectRoute } from './base'
import { Layout } from './constant'
import { createRouterGuard } from './guard'

import appRoutes from './routes'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
    requiresAuth: true,
  },
}

export const UserRoute: RouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: Layout,
  meta: {
    title: '我的',
    requiresAuth: true,
    keepalive: false,
  },
  children: [
    {
      path: '/user/profile',
      name: 'UserProfile',
      component: () => import('@/views/user/profile.vue'),
      meta: {
        title: '个人中心',
        requiresAuth: true,
        keepalive: false,
      },
    },
  ],
}

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/auth/login.vue'),
  meta: {
    title: '登录',
    requiresAuth: true,
    keepalive: false,
  },
}

// 需要验证权限
export const asyncRoutes = []

// 普通路由 无需验证权限
export const constantRoutes: any[] = [RootRoute, LoginRoute, RedirectRoute, UserRoute, ...appRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuard(router)
}

export default router
