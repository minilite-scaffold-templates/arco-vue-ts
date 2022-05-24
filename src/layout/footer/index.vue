<template>
  <a-layout-footer class="p-3 flex flex-row justify-end items-center">
    <div class="text-xs text-gray-600">{{ COPYRIGHT }}</div></a-layout-footer
  >
</template>

<script lang="ts" setup>
  import { useGlobSetting } from '@/hooks/setting'
  import { computed } from 'vue'

  const { copyright } = useGlobSetting()

  // 格式化版权信息
  const COPYRIGHT = computed(() => {
    return copyright && copyright.toUpperCase() // 转大写
  })
</script>

<style scoped lang="less"></style>
