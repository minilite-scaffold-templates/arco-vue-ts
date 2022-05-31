import { defineStore } from 'pinia'
import { store } from '@/store'
import projectSetting, { IHeaderHeightOption } from '@/settings/projectSetting'
import { NAV_THEME, NAV_MODE, LAYOUT_WIDTH } from '@/enums/pageEnum'

type MultiTabsSetting = {
  show: boolean
}

interface ProjectSettingState {
  navMode: NAV_MODE // 导航模式
  navTheme: NAV_THEME // 导航主题
  sidebarWidth: number // 侧边栏宽度
  multiTabsSetting: MultiTabsSetting
  toolIconSize: number // 工具图标大小
  footerDisplay: boolean // 显示页脚
  layoutWidth: LAYOUT_WIDTH // 布局宽度
  headerHeight: IHeaderHeightOption
  headerFixed: boolean // 状态栏是否固定
  permissionMode: string // 权限模式
  isPageAnimate: boolean // 是否开启动画
  pageAnimateType: string // 路由动画类型
}

const {
  navMode,
  navTheme,
  sidebarWidth,
  toolIconSize,
  footerDisplay,
  layoutWidth,
  headerHeight,
  headerFixed,
  permissionMode,
  multiTabsSetting,
  isPageAnimate,
  pageAnimateType,
} = projectSetting

const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode,
    navTheme,
    sidebarWidth,
    multiTabsSetting,
    toolIconSize,
    footerDisplay,
    layoutWidth,
    headerHeight,
    headerFixed,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
  }),
  getters: {
    getNavMode(): NAV_MODE {
      return this.navMode
    },
    getNavTheme(): NAV_THEME {
      return this.navTheme
    },
    getSidebarWidth(): number {
      return this.sidebarWidth
    },
    getMultiTabsSetting(): object {
      return this.multiTabsSetting
    },
    getToolIconSize(): number {
      return this.toolIconSize
    },
    getFooterDisplay(): boolean {
      return this.footerDisplay
    },
    getLayoutWidth(): LAYOUT_WIDTH {
      return this.layoutWidth
    },
    getHeaderHeight(): IHeaderHeightOption {
      return this.headerHeight
    },
    getHeaderFixed(): boolean {
      return this.headerFixed
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate
    },
    getPageAnimateType(): string {
      return this.pageAnimateType
    },
  },
  actions: {
    setNavMode(value: NAV_MODE): void {
      this.navMode = value
    },

    setNavTheme(value: NAV_THEME): void {
      this.navTheme = value
    },

    setSidebarWidth(value: number) {
      this.sidebarWidth = value
    },

    setToolIconSize(value: number) {
      this.toolIconSize = value
    },

    setFooterDisplay(value: boolean) {
      this.footerDisplay = value
    },

    setLayoutWidth(value: LAYOUT_WIDTH) {
      this.layoutWidth = value
    },

    setHeaderHeight(value: IHeaderHeightOption) {
      this.headerHeight = value
    },

    setHeaderFixed(value: boolean) {
      this.headerFixed = value
    },

    setMultiTabsSetting(value: MultiTabsSetting) {
      this.multiTabsSetting = value
    },

    getPermissionMode(): string {
      return this.permissionMode
    },
  },
})

export default useProjectSettingStore

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store)
}
