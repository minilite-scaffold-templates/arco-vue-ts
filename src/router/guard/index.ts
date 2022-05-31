import type { RouteRecordRaw, Router } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
// import { useUserStoreWidthOut } from '@/store/modules/user'
import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { ErrorPageRoute } from '@/router/base'
import { setRouteEmitter } from '../listener'

const LOGIN_PATH = `${PageEnum.BASE_LOGIN}`

const whitePathList = [LOGIN_PATH] // no redirect

export function createRouterGuard(router: Router) {
  // const userStore = useUserStoreWidthOut()
  router.beforeEach(async (to, from, next) => {
    console.log('🚀 ~ file: index.ts ~ line 17 ~ router.beforeEach ~ from', from)
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
    const asyncRouteStore = useAsyncRouteStoreWidthOut()
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepaliveComponents

    const currentComName: any = to.matched.find((item) => item.name === to.name)?.name
    console.log('🚀 ~ file: index.ts ~ line 67 ~ router.afterEach ~ currentComName', currentComName)

    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepalive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName)
    } else if (!to.meta?.keepalive || to.name === 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepaliveComponents.findIndex((name) => name === currentComName)
      if (index !== -1) {
        keepAliveComponents.splice(index, 1)
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents)

    console.log('keepAliveComponents', keepAliveComponents)
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
