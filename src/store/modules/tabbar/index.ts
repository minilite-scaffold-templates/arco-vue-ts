import { defineStore } from 'pinia'
import { RouteLocationNormalized, RouteMeta } from 'vue-router'
import { storage } from '@/utils/Storage'
import { TABS_ROUTES } from '@/store/mutation-types'

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'login']

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string
  path?: string
  name: string
  meta: Partial<RouteMeta>
}

export type ITabsListState = {
  tabsList: RouteItem[] // 标签页
}

const useTabbarStore = defineStore({
  id: 'app-tabbar',
  state: (): ITabsListState => ({
    tabsList: [],
  }),
  actions: {
    initTabs(routes: RouteItem[]) {
      // 初始化标签页
      this.tabsList = routes
    },

    // 添加标签页
    addTab(route: RouteItem): boolean {
      if (whiteList.includes(route.name)) return false

      const isExists = this.tabsList.some((item) => item.fullPath === route.fullPath)
      if (!isExists) {
        this.tabsList.push(route)
        // 保存到storage
        storage.set(TABS_ROUTES, this.tabsList)
      }
      return true
    },

    // 关闭当前标签
    closeCurrentTab(route: RouteItem) {
      // 关闭当前页
      const index = this.tabsList.findIndex((item) => item.fullPath === route.fullPath)
      this.tabsList.splice(index, 1)
    },
  },
})

export default useTabbarStore
