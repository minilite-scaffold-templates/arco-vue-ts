<template>
  <a-dropdown trigger="click">
    <a-button :shape="'circle'">
      <template #icon>
        <icon-language :size="toolIconSize" />
      </template>
    </a-button>
    <template #content>
      <a-doption v-for="item in LOCALE_OPTIONS" :key="item.value" :value="item.value">
        {{ item.label }}
      </a-doption>
    </template>
  </a-dropdown></template
>

<script lang="ts" setup>
  import { ComputedRef, ref } from 'vue'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'

  const LOCALE_OPTIONS = [
    { label: '中文', value: 'zh-CN' },
    { label: 'English', value: 'en-US' },
  ]

  const { getToolIconSize } = useProjectSetting()

  const toolIconSize = ref<ComputedRef<number>>(getToolIconSize)
</script>

<style scoped lang="less"></style>
