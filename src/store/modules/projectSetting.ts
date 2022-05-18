import { defineStore } from 'pinia'
import { store } from '@/store'
import projectSetting from '@/settings/projectSetting'
import type { IheaderSetting, ImenuSetting, ImultiTabsSetting, IBreadCrumbSetting } from '/#/config'

const { navMode, navTheme, headerSetting, showFooter, menuSetting, multiTabsSetting, breadCrumbSetting, permissionMode, isPageAnimate, pageAnimateType } = projectSetting

interface ProjectSettingState {
  navMode: string // 导航模式
  navTheme: string // 导航风格
  headerSetting: IheaderSetting // 顶部设置
  showFooter: boolean // 页脚
  menuSetting: ImenuSetting // 多标签
  multiTabsSetting: ImultiTabsSetting // 多标签
  breadCrumbSetting: IBreadCrumbSetting // 面包屑
  permissionMode: string // 权限模式
  isPageAnimate: boolean // 是否开启路由动画
  pageAnimateType: string // 路由动画类型
}

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode,
    navTheme,
    headerSetting,
    showFooter,
    menuSetting,
    multiTabsSetting,
    breadCrumbSetting,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode
    },
    getNavTheme(): string {
      return this.navTheme
    },
    getHeaderSetting(): object {
      return this.headerSetting
    },
    getShowFooter(): boolean {
      return this.showFooter
    },
    getMenuSetting(): object {
      return this.menuSetting
    },
    getMultiTabsSetting(): object {
      return this.multiTabsSetting
    },
    getBreadCrumbSetting(): object {
      return this.breadCrumbSetting
    },
    getPermissionMode(): string {
      return this.permissionMode
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate
    },
    getPageAnimateType(): string {
      return this.pageAnimateType
    },
  },
  actions: {
    setNavTheme(value: string): void {
      this.navTheme = value
    },
  },
})

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store)
}
