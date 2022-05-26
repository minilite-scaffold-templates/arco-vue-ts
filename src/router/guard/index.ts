import { PageEnum } from '@/enums/pageEnum'
import { useUserStoreWidthOut } from '@/store/modules/user'
// import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { Router } from 'vue-router'
import { setRouteEmitter } from '../listener'

const LOGIN_PATH = `${PageEnum.BASE_LOGIN}`

const whitePathList = [LOGIN_PATH] // no redirect

export function createRouterGuard(router: Router) {
  const userStore = useUserStoreWidthOut()
  // const asyncRouteStore = useAsyncRouteStoreWidthOut()
  router.beforeEach(async (to, from, next) => {
    console.log('from', from)
    console.log('to', to)

    setRouteEmitter(to)

    const token = storage.get(ACCESS_TOKEN)
    console.log('token', token)
    if (token) {
      if (to.path === '/login') {
        next(PageEnum.BASE_HOME)
      } else {
        // await userStore.getInfo()
        next()
      }
    } else {
      if (whitePathList.includes(to.path)) {
        next()
      } else if (to.meta.ignoreAuth) {
        next()
      }

      // 重定向到登录页
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
    }

    // if (asyncRouteStore.getIsDynamicAddedRoute) {
    //   next()
    //   return
    // }

    const userInfo = await userStore.getInfo()
    console.log('🚀userInfo', userInfo)

    // const routes = await asyncRouteStore.generateRoutes(userInfo)

    // 动态添加可访问路由表
    // routes.forEach((item) => {
    //   router.addRoute(item as unknown as RouteRecordRaw)
    // })
  })

  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title
  })
}
