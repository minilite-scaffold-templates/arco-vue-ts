<template>
  <a-layout-footer class="p-3 flex flex-row justify-between items-center border-t border-gray-200">
    <div class="text-xs text-gray-600">
      Powered by
      <a-link class="underline" href="https://arco.design/vue/docs/start" target="_blank">Arco-Design</a-link>,
      <a-link class="underline" href="https://staging-cn.vuejs.org/" target="_blank">Vue3.2</a-link>,
      <a-link class="underline" href="https://www.typescriptlang.org/zh/docs/" target="_blank">TypeScript</a-link> &
      <a-link class="underline" href="https://cn.vitejs.dev/" target="_blank">Vite</a-link>
    </div>
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
