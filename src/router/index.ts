import { PageEnum } from '@/enums/pageEnum'
import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { IconApps, IconBook } from '@arco-design/web-vue/es/icon'
import { renderIcon } from '@/utils'
import { RedirectRoute } from './base'
import { Layout } from './constant'
import { createRouterGuard } from './guard'

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}

export const DashboardRoute: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  meta: {
    title: '首页',
    icon: 'IconBook',
  },
  children: [
    {
      path: '/dashboard/index',
      name: 'DashboardIndex',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '仪表盘',
        hidden: true,
      },
    },
  ],
}
export const AccontsRoute: AppRouteRecordRaw = {
  path: '/acconts',
  name: 'Acconts',
  component: Layout,
  meta: {
    title: '美丽的人儿多自在',
    icon: 'IconApps',
  },
  children: [
    {
      path: '/acconts/index',
      name: 'AccontsIndex',
      component: () => import('@/views/acconts/index.vue'),
      meta: {
        title: '账号管理',
      },
    },
  ],
}

export const routerMenuList = [DashboardRoute, AccontsRoute]

export const routerList: any[] = [DashboardRoute]

export const UserRoute: AppRouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: Layout,
  meta: {
    title: '我的',
  },
  children: [
    {
      path: '/user/profile',
      name: 'UserProfile',
      component: () => import('@/views/user/profile.vue'),
      meta: {
        title: '个人中心',
      },
    },
  ],
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/auth/login.vue'),
  meta: {
    title: '登录',
  },
}

// 普通路由 无需验证权限
export const constantRouter: any[] = [
  RootRoute,
  LoginRoute,
  RedirectRoute,
  DashboardRoute,
  UserRoute,
  ...routerMenuList,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuard(router)
}

export default router
