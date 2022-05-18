import { PageEnum } from '@/enums/pageEnum'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'
import { Router } from 'vue-router'

const LOGIN_PATH = PageEnum.BASE_LOGIN

const whitePathList = [LOGIN_PATH] // no redirect whitelist

export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (from.path === LOGIN_PATH && to.name === 'ErrorPage') {
      next(PageEnum.BASE_HOME)
      return
    }

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }

    const token = storage.get(ACCESS_TOKEN)

    // 如果不存在token(未登录)
    if (!token) {
      // 如果在路由中设置 meta.ignoreAuth, 可在忽略权限下访问页面
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // 跳转到 login 页面, 并携带重定向参数
      const redirectData: {
        path: string
        replace: boolean
        query?: Recordable<string>
      } = {
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

    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect }
    next(nextData)
  })

  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title
  })
}
