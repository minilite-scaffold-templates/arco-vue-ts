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

// 订单路由
const orderRoute: RouteRecordRaw = {
  path: '/order',
  name: 'Order',
  component: Layout,
  meta: {
    title: '订单管理',
    locale: 'menu.order',
    requiresAuth: true,
    icon: 'icon-list',
    hidden: false,
    order: 1,
  },
  children: [
    {
      path: 'index',
      name: 'OrderIndex',
      component: () => import('@/views/order/index.vue'),
      meta: {
        title: '订单列表',
        locale: 'menu.order.index',
        requiresAuth: true,
        roles: ['*'],
        keepalive: true,
      },
    },
  ],
}

export default orderRoute
