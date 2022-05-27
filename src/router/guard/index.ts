import type { RouteRecordRaw, Router } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { useUserStoreWidthOut } from '@/store/modules/user'
import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { ErrorPageRoute } from '@/router/base'
import { setRouteEmitter } from '../listener'

const LOGIN_PATH = `${PageEnum.BASE_LOGIN}`

const whitePathList = [LOGIN_PATH] // no redirect

export function createRouterGuard(router: Router) {
  const userStore = useUserStoreWidthOut()
  const asyncRouteStore = useAsyncRouteStoreWidthOut()

  router.beforeEach(async (to, from, next) => {
    console.log('from', from)
    console.log('to', to)
    const Loading = window.$loading || null
    Loading && Loading.start()
    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      next(PageEnum.BASE_HOME)
      return
    }

    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }

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
      return
    }

    if (asyncRouteStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const userInfo = await userStore.getInfo()
    console.log('👮‍♀️userInfo', userInfo)

    const routes = await asyncRouteStore.generateRoutes(userInfo)

    // 动态添加可访问路由表
    routes.forEach((item) => {
      router.addRoute(item as unknown as RouteRecordRaw)
    })

    // 添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name)
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw)
    }

    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
    asyncRouteStore.setDynamicAddedRoute(true)
    next(nextData)
    Loading && Loading.finish()
  })

  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title
    const asyncRouteStore = useAsyncRouteStoreWidthOut()
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents
    const currentComName: any = to.matched.find((item) => item.name === to.name)?.name
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName)
    } else if (!to.meta?.keepAlive || to.name === 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name === currentComName)
      if (index !== -1) {
        keepAliveComponents.splice(index, 1)
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents)

    const Loading = window.$loading || null
    Loading && Loading.finish()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
