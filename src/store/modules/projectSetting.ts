import { defineStore } from 'pinia'
import { store } from '@/store'
import projectSetting, { IHeaderHeightOption } from '@/settings/projectSetting'
import { NAV_THEME, NAV_MODE, LAYOUT_WIDTH } from '@/enums/pageEnum'

interface ProjectSettingState {
  navMode: NAV_MODE // 导航模式
  navTheme: NAV_THEME // 导航主题
  toolIconSize: number // 工具图标大小
  footerDisplay: boolean // 显示页脚
  layoutWidth: LAYOUT_WIDTH // 布局宽度
  headerHeight: IHeaderHeightOption
}

const { navMode, navTheme, toolIconSize, footerDisplay, layoutWidth, headerHeight } = projectSetting

const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode,
    navTheme,
    toolIconSize,
    footerDisplay,
    layoutWidth,
    headerHeight,
  }),
  getters: {
    getNavMode(): NAV_MODE {
      return this.navMode
    },
    getNavTheme(): NAV_THEME {
      return this.navTheme
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
  },
  actions: {
    setNavMode(value: NAV_MODE): void {
      this.navMode = value
    },

    setNavTheme(value: NAV_THEME): void {
      this.navTheme = value
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
  },
})

export default useProjectSettingStore

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store)
}
