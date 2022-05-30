import { resultSuccess } from '../_util'

const menuList = () => {
  const result: any[] = [
    {
      label: '首页',
      key: 'dashboard',
      type: 1,
      subtitle: 'dashboard',
      openType: 1,
      auth: 'dashboard',
      path: '/dashboard',
      children: [
        {
          label: '仪表盘',
          key: 'DashboardIndex',
          type: 1,
          subtitle: 'dashboardIndex',
          openType: 1,
          auth: 'dashboardIndex',
          path: '/dashboard/index',
        },
        {
          label: '工作台',
          key: 'workplace',
          type: 1,
          subtitle: 'workplace',
          openType: 1,
          auth: 'workplace',
          path: '/dashboard/workplace',
        },
      ],
    },
    {
      label: '订单管理',
      key: 'Order',
      type: 1,
      subtitle: 'order',
      openType: 1,
      auth: 'order',
      path: '/order',
      children: [
        {
          label: '订单列表',
          key: 'OrderIndex',
          type: 1,
          subtitle: 'orderList',
          openType: 1,
          auth: '/orderList',
          path: '/order/index',
        },
      ],
    },
    {
      label: '系统设置',
      key: 'System',
      type: 1,
      subtitle: 'system',
      openType: 1,
      auth: 'system',
      path: '/system',
      children: [
        {
          label: '菜单权限管理',
          key: 'SystemMenu',
          type: 1,
          subtitle: 'systemMenu',
          openType: 1,
          auth: 'systemMenu',
          path: '/system/menu/menu',
        },
      ],
    },
  ]

  return result
}

export default [
  {
    url: '/api/menu/list',
    timeout: 1000,
    method: 'get',
    response: () => {
      const list = menuList()
      return resultSuccess({
        list,
      })
    },
  },
]
