import usePermission from '@/hooks/permission'
import { computed } from 'vue'
import { RouteRecordNormalized, RouteRecordRaw, useRouter } from 'vue-router'

const permission = usePermission()

export default function useMenuTree() {
  const router = useRouter()

  const appRoute = computed(() => {
    return router.getRoutes().filter((el) => el.meta.requiresAuth && el.meta.order !== undefined)
  })

  const menuTree = computed(() => {
    const copyRouter = JSON.parse(JSON.stringify(appRoute.value))

    // 对路由列表进行排序
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return (a.meta.order || 0) - (b.meta.order || 0)
    })

    function travel(_routes: RouteRecordRaw[], layer: number): any[] {
      if (!_routes) return []

      const collector = _routes.map((element) => {
        // no access
        if (!permission.accessRouter(element)) {
          return []
        }

        // leaf node
        if (element.meta?.hideChildrenInMenu || !element.children) {
          return element
        }

        // route filter hideInMenu true
        element.children = element.children.filter((x) => x.meta?.hideInMenu !== true)

        // Associated child node
        const subItem = travel(element.children, layer + 1)

        if (subItem.length) {
          element.children = subItem
          return element
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem
          return element
        }

        if (element.meta?.hideInMenu === false) {
          return element
        }
        return []
      })
      return collector.filter(Boolean)
    }

    return travel(copyRouter, 0)
  })

  return {
    menuTree,
  }
}
