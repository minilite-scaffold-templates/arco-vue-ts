import { computed } from 'vue'
import useProjectSettingStore from '@/store/modules/projectSetting'

export function useProjectSetting() {
  const projectStore = useProjectSettingStore()

  const getNavMode = computed(() => projectStore.navMode)

  const getNavTheme = computed(() => projectStore.navTheme)

  // 获取全局的工具图标大小
  const getToolIconSize = computed(() => projectStore.toolIconSize)

  const showFooter = computed(() => projectStore.showFooter)

  const getLayoutWidth = computed(() => projectStore.layoutWidth)

  return {
    getNavMode,
    getNavTheme,
    getToolIconSize,
    showFooter,
    getLayoutWidth,
  }
}
