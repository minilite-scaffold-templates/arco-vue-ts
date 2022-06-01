<template>
  <a-menu
    :collapsed="collapsed"
    :mode="mode"
    :level-indent="30"
    :selected-keys="selectedKey"
    :auto-open="true"
    class="m-auto"
  >
    <MenuItems :data-list="menuTree" />
  </a-menu>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { listenerRouteChange } from '@/router/listener'
  import { MENU_MODE } from '@/enums/pageEnum'
  import useMenuTree from './useMenuTree'
  import MenuItems from './menuItems.vue'

  defineProps<{ collapsed: boolean; mode: MENU_MODE }>()

  const { menuTree } = useMenuTree()

  const selectedKey = ref<string[]>([])

  listenerRouteChange((newRoute) => {
    if (newRoute.meta.requiresAuth && !newRoute.meta.hideInMenu) {
      const key = newRoute.matched[newRoute.matched.length - 1]?.name as string
      selectedKey.value = [key]
    }
  }, true)
</script>

<style scoped lang="less"></style>
