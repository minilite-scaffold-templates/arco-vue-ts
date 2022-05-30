import { PageEnum } from '@/enums/pageEnum'
// import { useUserStoreWidthOut } from '@/store/modules/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { Router, RouteRecordRaw } from 'vue-router'
import { ErrorPageRoute } from '../base'
import { setRouteEmitter } from '../listener'

const LOGIN_PATH = `${PageEnum.BASE_LOGIN}`

const whitePathList = [LOGIN_PATH] // no redirect

export function createRouterGuard(router: Router) {
  // const userStore = useUserStoreWidthOut()

  router.beforeEach(async (to, from, next) => {
    setRouteEmitter(to)

    console.log('to', to)

    const token = storage.get(ACCESS_TOKEN)
    console.log('token', token)
    if (token) {
      if (to.path === '/login') {
        next(PageEnum.BASE_HOME)
      } else {
        // await userStore.getInfo()

        // 添加404
        const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name)

        if (isErrorPage === -1) {
          router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw)
        }

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
  })

  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
