<template>
  <a-layout class="h-screen">
    <a-layout-sider
      v-if="mode === 'left'"
      :theme="novTheme"
      :default-collapsed="false"
      :width="220"
      :collapsed-width="60"
      :collapsed="collapsed"
      :collapsible="true"
      :hide-trigger="true"
    >
      <div class="logo" />
      <AppMenu :mode="mode" />
      <template #trigger>
        <div class="text-right w-full flex flex-row justify-end items-center px-5">
          <div class="cursor-pointer" @click="updateCollapsed">
            <IconMenuUnfold v-if="collapsed" :size="toolIconSize" />
            <IconMenuFold v-else :size="toolIconSize" />
          </div>
        </div>
      </template>
    </a-layout-sider>
    <a-layout>
      <Header :collapsed="collapsed" @update-collapsed="updateCollapsedFromHeader" />
      <a-layout>
        <a-layout-content class="bg-white p-5">
          <router-view />
        </a-layout-content>
        <Footer />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { NAV_MODE, NAV_THEME } from '@/enums/pageEnum'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-vue/es/icon'
  import { ComputedRef, ref } from 'vue'

  import { AppMenu } from './components/Menu'
  import Header from './header'
  import Footer from './footer'

  const { getNavTheme, getNavMode, getToolIconSize } = useProjectSetting()

  const toolIconSize = ref<ComputedRef<number>>(getToolIconSize)

  const navMode = ref<ComputedRef<NAV_MODE>>(getNavMode)
  console.log('🚀 ~ file: index.vue ~ line 30 ~ navMode', navMode)

  const novTheme = ref<ComputedRef<NAV_THEME>>(getNavTheme)

  const collapsed = ref(false)
  const mode = 'left'

  const updateCollapsed = () => {
    collapsed.value = !collapsed.value
  }
  const updateCollapsedFromHeader = (val: boolean) => {
    collapsed.value = val
  }
</script>

<style scoped>
  .logo {
    height: 37px;
    margin: 12px 8px;
    background: rgba(0, 0, 0, 0.2);
  }
</style>
