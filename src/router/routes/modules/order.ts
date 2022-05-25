import { Layout } from '@/router/constant'
import { RouteRecordRaw } from 'vue-router'

// 订单路由
const orderRoute: RouteRecordRaw = {
  path: '/order',
  name: 'Order',
  component: Layout,
  meta: {
    title: '订单',
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
      },
    },
  ],
}

export default orderRoute
