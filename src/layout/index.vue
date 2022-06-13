<template>
  <div class="" :class="layoutWidth === LAYOUT_WIDTH.BOXED ? 'm-auto container' : ''">
    <a-layout
      class="h-screen overflow-x-hidden"
      :class="layoutWidth === LAYOUT_WIDTH.BOXED ? 'container border-gray-100' : ''"
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
          :fixed="headerFixed"
          @update-collapsed="updateCollapsedFromHeader"
        />

        <!-- 水平方向显示 MENU -->
        <div
          v-if="navMode === NAV_MODE.HORIZONTAL"
          class="border-b border-gray-100"
          :class="headerFixed ? 'layout-menu-with-header-fixed' : ''"
        >
          <AppMenu :mode="MENU_MODE.HORIZONTAL" :collapsed="collapsed" />
        </div>

        <MultiTabs :fixed="headerFixed" :nav-mode="navMode" :header-height="headerHeight" />
        <Breadcrumb :nav-mode="navMode" />
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
  import { LAYOUT_WIDTH, NAV_MODE, NAV_THEME, MENU_MODE } from '@/enums/pageEnum'
  import { IHeaderHeightOption } from '@/settings/projectSetting'
  import Header from './header'
  import Sider from './sider'
  import Breadcrumb from './breadcrumb'
  import Content from './content'
  import Footer from './footer'
  import CustomizeThemeSetting from './customizeThemeSetting'
  import AppMenu from './components/Menu'
  import MultiTabs from './components/MultiTabs'

  const router = useRouter()

  type GoFuncType = (path: string) => void

  const go: GoFuncType = (path: string) => {
    router.push(path)
  }

  const { getNavTheme, getNavMode, getLayoutWidth, getHeaderHeight, getFooterDisplay, getHeaderFixed } =
    useProjectSetting()

  const headerHeight = ref<ComputedRef<IHeaderHeightOption>>(getHeaderHeight)
  const headerHeightCssValue = headerHeight.value.cssValue

  const headerFixed = ref<ComputedRef<boolean>>(getHeaderFixed)

  const navMode = ref<ComputedRef<NAV_MODE>>(getNavMode)

  const navTheme = ref<ComputedRef<NAV_THEME>>(getNavTheme)

  const layoutWidth = ref<ComputedRef<LAYOUT_WIDTH>>(getLayoutWidth)

  const footerDisplay = ref<ComputedRef<boolean>>(getFooterDisplay)

  const collapsed = ref(false)

  const updateCollapsedFromHeader = (val: boolean) => {
    collapsed.value = val
  }
</script>

<style lang="less">
  .layout-menu {
    &-with-header-fixed {
      margin-top: v-bind(headerHeightCssValue);
    }
  }
</style>
