<template>
  <div class="border-gray-100" :class="layoutWidth === LAYOUT_WIDTH.BOXED ? 'm-auto container' : ''">
    <a-layout
      class="h-screen"
      :class="layoutWidth === LAYOUT_WIDTH.BOXED ? 'container border-gray-100 border-r border-l' : ''"
    >
      <!-- 侧边栏 -->
      <a-layout-sider
        v-if="navMode === NAV_MODE.LEFT"
        :theme="navTheme"
        :default-collapsed="false"
        :width="220"
        :collapsed-width="80"
        :collapsed="collapsed"
        :collapsible="true"
        :hide-trigger="true"
        class="border-r border-gray-100"
      >
        <!-- LOGO -->
        <div class="flex flex-col justify-center" :class="headerHeight.value">
          <div
            class="flex flex-row items-center p-3 space-x-3 cursor-pointer"
            :class="collapsed ? 'justify-center' : 'justify-start'"
            @click="go('/')"
          >
            <Logo :width="32" :height="32" />
            <div v-if="!collapsed" :class="navTheme === NAV_THEME.DARK ? 'text-white' : ''"> {{ title }}</div>
          </div>
        </div>

        <!-- MENU -->
        <AppMenu :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <Header
          :header-height="headerHeight"
          :nav-mode="navMode"
          :collapsed="collapsed"
          @update-collapsed="updateCollapsedFromHeader"
        />

        <div v-if="navMode === NAV_MODE.HORIZONTAL">
          <!-- MENU -->
          <AppMenu :mode="NAV_MODE.HORIZONTAL" :collapsed="collapsed" />
        </div>
        <Breadcrumb :go="go" />

        <a-layout-content class="p-5 bg-gray-100">
          <router-view />
        </a-layout-content>
        <Footer v-if="footerDisplay" />
      </a-layout>

      <a-layout-sider
        v-if="navMode === NAV_MODE.RIGHT"
        :theme="navTheme"
        :default-collapsed="false"
        :width="220"
        :collapsed-width="60"
        :collapsed="collapsed"
        :collapsible="true"
        :hide-trigger="true"
        class="border-l border-gray-100"
      >
        <div class="flex flex-col justify-center" :class="headerHeight.value">
          <div
            class="flex flex-row items-center p-3 space-x-3 cursor-pointer"
            :class="collapsed ? 'justify-center' : 'justify-start'"
            @click="go('/')"
          >
            <Logo :width="32" :height="32" />
            <div v-if="!collapsed" :class="navTheme === NAV_THEME.DARK ? 'text-white' : ''"> {{ title }}</div>
          </div>
        </div>
        <!-- MENU -->
        <AppMenu :mode="NAV_MODE.RIGHT" :collapsed="collapsed" />
      </a-layout-sider>

      <!-- 自定义主题 -->
      <CustomizeThemeSetting />

      <!-- 回到顶部 -->
      <a-back-top />
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import { ComputedRef, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { LAYOUT_WIDTH, NAV_MODE, NAV_THEME } from '@/enums/pageEnum'
  import { IHeaderHeightOption } from '@/settings/projectSetting'
  import { useGlobSetting } from '@/hooks/setting'
  import Logo from '@/components/Logo'
  import AppMenu from '@/layout/components/Menu/menu.vue'
  import Header from './header'
  import Breadcrumb from './breadcrumb/index.vue'
  import Footer from './footer'
  import CustomizeThemeSetting from './customizeThemeSetting'

  const router = useRouter()

  const go = (path: string) => {
    router.push(path)
  }

  const { title } = useGlobSetting()

  const { getNavTheme, getNavMode, getLayoutWidth, getHeaderHeight, getFooterDisplay } = useProjectSetting()

  const headerHeight = ref<ComputedRef<IHeaderHeightOption>>(getHeaderHeight)

  const navMode = ref<ComputedRef<NAV_MODE>>(getNavMode)
  console.log('🚀 ~ file: index.vue ~ line 30 ~ navMode', navMode)

  const navTheme = ref<ComputedRef<NAV_THEME>>(getNavTheme)

  const layoutWidth = ref<ComputedRef<LAYOUT_WIDTH>>(getLayoutWidth)

  const footerDisplay = ref<ComputedRef<boolean>>(getFooterDisplay)

  const collapsed = ref(false)

  const updateCollapsedFromHeader = (val: boolean) => {
    collapsed.value = val
  }
</script>

<style lang="less"></style>
