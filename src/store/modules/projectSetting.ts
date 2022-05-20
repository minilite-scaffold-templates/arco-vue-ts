import { defineStore } from 'pinia'
import { store } from '@/store'
import projectSetting from '@/settings/projectSetting'
import { NAV_THEME, NAV_MODE, LAYOUT_WIDTH } from '@/enums/pageEnum'

interface ProjectSettingState {
  navMode: NAV_MODE // 导航模式
  navTheme: NAV_THEME // 导航主题
  toolIconSize: number // 工具图标大小
  showFooter: boolean
  layoutWidth: LAYOUT_WIDTH // 布局宽度
}

const { navMode, navTheme, toolIconSize, showFooter, layoutWidth } = projectSetting

const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode,
    navTheme,
    toolIconSize,
    showFooter,
    layoutWidth,
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
    getFooterShowing(): boolean {
      return this.showFooter
    },
    getLayoutWidth(): LAYOUT_WIDTH {
      return this.layoutWidth
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
      this.showFooter = value
    },

    setLayoutWidth(value: LAYOUT_WIDTH) {
      this.layoutWidth = value
    },
  },
})

export default useProjectSettingStore

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store)
}
