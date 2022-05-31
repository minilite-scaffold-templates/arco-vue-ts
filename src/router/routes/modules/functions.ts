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

// 功能模块路由
const functionsRoute: RouteRecordRaw = {
  path: '/functions',
  name: 'Functions',
  component: Layout,
  redirect: '/functions/index',
  meta: {
    title: '使用说明',
    locale: 'menu.order',
    requiresAuth: true,
    icon: 'icon-file',
    hidden: false,
    order: 1,
  },
  children: [
    {
      path: 'index',
      name: 'FunctionsIndex',
      component: () => import('@/views/functions/index.vue'),
      meta: {
        title: '总览',
        locale: 'menu.order.index',
        requiresAuth: true,
        roles: ['*'],
        keepalive: true,
      },
    },
    {
      path: 'project',
      name: 'FunctionsProject',
      component: () => import('@/views/functions/project.vue'),
      meta: {
        title: '目录结构',
        locale: 'menu.order.index',
        requiresAuth: true,
        roles: ['*'],
        keepalive: true,
      },
    },
    {
      path: 'config',
      name: 'FunctionsConfig',
      component: () => import('@/views/functions/config.vue'),
      meta: {
        title: '配置清单',
        locale: 'menu.order.index',
        requiresAuth: true,
        roles: ['*'],
        keepalive: true,
      },
    },
    {
      path: 'request',
      name: 'FunctionsRequest',
      component: () => import('@/views/functions/request.vue'),
      meta: {
        title: '请求封装',
        locale: 'menu.order.index',
        requiresAuth: true,
        roles: ['*'],
        keepalive: true,
      },
    },
    {
      path: 'router',
      name: 'FunctionsRouter',
      component: () => import('@/views/functions/router.vue'),
      meta: {
        title: '路由',
        locale: 'menu.order.index',
        requiresAuth: true,
        roles: ['*'],
        keepalive: true,
      },
    },
    {
      path: 'states',
      name: 'FunctionsStates',
      component: () => import('@/views/functions/states.vue'),
      meta: {
        title: '状态管理',
        locale: 'menu.order.index',
        requiresAuth: true,
        roles: ['*'],
        keepalive: true,
      },
    },
    {
      path: 'plugins',
      name: 'FunctionsPlugins',
      component: () => import('@/views/functions/plugins.vue'),
      meta: {
        title: '插件',
        locale: 'menu.order.index',
        requiresAuth: true,
        roles: ['*'],
        keepalive: true,
      },
    },
  ],
}

export default functionsRoute
