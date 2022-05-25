import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export default function usePermission() {
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth || !route.meta?.roles || route.meta?.roles?.includes('*')
        // route.meta?.roles?.includes(userStore.role)
      )
    },
  }
}
