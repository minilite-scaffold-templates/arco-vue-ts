<template>
  <div class="border-gray-100" :class="layoutWidth === LAYOUT_WIDTH.BOXED ? 'm-auto container' : ''">
    <a-layout
      class="h-screen"
      :class="layoutWidth === LAYOUT_WIDTH.BOXED ? 'container border-gray-100 border-r border-l' : ''"
    >
      <!-- 侧边栏 -->
      <template v-if="navMode === NAV_MODE.LEFT">
        <Sider
          :nav-mode="navMode"
          :nav-theme="navTheme"
          :collapsed="collapsed"
          :header-height="headerHeight"
          :go="go"
        />
      </template>

      <a-layout>
        <Header
          :header-height="headerHeight"
          :nav-mode="navMode"
          :collapsed="collapsed"
          @update-collapsed="updateCollapsedFromHeader"
        />

        <div v-if="navMode === NAV_MODE.HORIZONTAL" class="border-b border-gray-100">
          <!-- MENU -->
          <AppMenu :mode="NAV_MODE.HORIZONTAL" :collapsed="collapsed" />
        </div>
        <Breadcrumb :go="go" />
        <Content />
        <Footer v-if="footerDisplay" />
      </a-layout>

      <template v-if="navMode === NAV_MODE.RIGHT">
        <Sider
          :nav-mode="navMode"
          :nav-theme="navTheme"
          :collapsed="collapsed"
          :header-height="headerHeight"
          :go="go"
        />
      </template>

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
  import AppMenu from '@/layout/components/Menu'
  import Header from './header'
  import Sider from './sider'
  import Breadcrumb from './breadcrumb/index.vue'
  import Content from './content'
  import Footer from './footer'
  import CustomizeThemeSetting from './customizeThemeSetting'

  const router = useRouter()

  type GoFuncType = (path: string) => void

  const go: GoFuncType = (path: string) => {
    router.push(path)
  }

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
