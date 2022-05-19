import { defineStore } from 'pinia'
import { store } from '@/store'
import projectSetting from '@/settings/projectSetting'
import { NAV_THEME, NAV_MODE } from '@/enums/pageEnum'

interface ProjectSettingState {
  navMode: NAV_MODE // 导航模式
  navTheme: NAV_THEME // 导航主题
  toolIconSize: number // 工具图标大小
  showFooter: boolean
}

const { navMode, navTheme, toolIconSize, showFooter } = projectSetting

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode,
    navTheme,
    toolIconSize,
    showFooter,
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
  },
})

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store)
}
