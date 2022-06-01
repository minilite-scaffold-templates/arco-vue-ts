<template>
  <a-layout-sider
    :theme="navTheme"
    :default-collapsed="false"
    :width="sidebarWidth"
    :collapsed-width="80"
    :collapsed="collapsed"
    :collapsible="true"
    :hide-trigger="true"
    class=""
    :class="navMode === NAV_MODE.LEFT ? ' ' : ''"
  >
    <!-- LOGO -->
    <div class="flex flex-col justify-center" :class="headerHeight.value">
      <div
        class="flex flex-row items-center p-3 space-x-3 cursor-pointer"
        :class="collapsed ? 'justify-center' : 'justify-start'"
        @click="go('/')"
      >
        <Logo />
        <div v-if="!collapsed" :class="navTheme === NAV_THEME.DARK ? 'text-white' : ''"> {{ title }}</div>
      </div>
    </div>

    <!-- MENU -->
    <AppMenu :collapsed="collapsed" :nav-mode="navMode" :mode="MENU_MODE.VERTICAL" />
  </a-layout-sider>
</template>

<script lang="ts" setup>
  import { ComputedRef, ref } from 'vue'
  import AppMenu from '@/layout/components/Menu'
  import Logo from '@/components/Logo'
  import { NAV_MODE, NAV_THEME, MENU_MODE } from '@/enums/pageEnum'
  import { IHeaderHeightOption } from '@/settings/projectSetting'
  import { useGlobSetting } from '@/hooks/setting'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'

  const { title } = useGlobSetting()

  const { getSidebarWidth } = useProjectSetting()

  const sidebarWidth = ref<ComputedRef<number>>(getSidebarWidth)

  defineProps<{
    collapsed: boolean
    navMode: NAV_MODE
    navTheme: NAV_THEME
    headerHeight: IHeaderHeightOption
    go: any
  }>()
</script>

<style scoped lang="less"></style>
