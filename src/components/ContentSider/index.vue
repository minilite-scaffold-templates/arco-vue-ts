<template>
  <div :style="style" class="border-l border-dashed bg-white">
    <slot name="body"></slot>
  </div>
</template>

<script lang="ts" setup>
  import { ref, ComputedRef, watch } from 'vue'

  import setting, { IHeaderHeightOption } from '@/settings/projectSetting'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'

  const { footerHeight, breadcrumbHeight, multiTabsHeight } = setting

  // 获取header, breadcrumb, footer高度配置
  const { getHeaderHeight, getFooterDisplay } = useProjectSetting()

  const headerHeight = ref<ComputedRef<IHeaderHeightOption>>(getHeaderHeight)
  const headerHeightCssValue = headerHeight.value.cssValue

  let activeFooterHeight = `${footerHeight}px`
  const style = ref({
    'min-height': `calc(100vh - ${headerHeightCssValue} - ${multiTabsHeight} - ${activeFooterHeight} - ${breadcrumbHeight}px)`,
  })

  watch(getFooterDisplay, (val) => {
    activeFooterHeight = val ? `${footerHeight}px` : '0px'
    style.value = {
      'min-height': `calc(100vh - ${headerHeightCssValue} - ${multiTabsHeight} -${activeFooterHeight} - ${breadcrumbHeight}px)`,
    }
  })

  watch(getHeaderHeight, (val) => {
    style.value = {
      'min-height': `calc(100vh - ${val.cssValue} - ${multiTabsHeight} - ${activeFooterHeight} - ${breadcrumbHeight}px)`,
    }
  })
</script>

<style scoped lang="less"></style>
