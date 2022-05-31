import { computed } from 'vue'
import useProjectSettingStore from '@/store/modules/projectSetting'

export function useProjectSetting() {
  const projectStore = useProjectSettingStore()

  const getNavMode = computed(() => projectStore.navMode)

  const getNavTheme = computed(() => projectStore.navTheme)

  const getSidebarWidth = computed(() => projectStore.sidebarWidth)

  const getMultiTabsSetting = computed(() => projectStore.multiTabsSetting)

  const getToolIconSize = computed(() => projectStore.toolIconSize)

  const getFooterDisplay = computed(() => projectStore.footerDisplay)

  const getLayoutWidth = computed(() => projectStore.layoutWidth)

  const getHeaderHeight = computed(() => projectStore.headerHeight)

  const getHeaderFixed = computed(() => projectStore.getHeaderFixed)

  const getPermissionMode = computed(() => projectStore.permissionMode)

  const getIsPageAnimate = computed(() => projectStore.isPageAnimate)

  const getPageAnimateType = computed(() => projectStore.pageAnimateType)

  return {
    getNavMode,
    getNavTheme,
    getSidebarWidth,
    getMultiTabsSetting,
    getToolIconSize,
    getFooterDisplay,
    getLayoutWidth,
    getHeaderHeight,
    getHeaderFixed,
    getPermissionMode,
    getIsPageAnimate,
    getPageAnimateType,
  }
}
