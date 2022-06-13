<template>
  <a-layout-header
    class="border-b border-gray-100 z-10 bg-white px-5"
    :class="fixed ? `${headerHeight} fixed width-without-sidebar` : `${headerHeight} w-full`"
  >
    <div v-if="navMode === NAV_MODE.HORIZONTAL" class="w-full flex flex-row justify-between items-center h-full">
      <div class="flex flex-row justify-start items-center space-x-3 w-full">
        <Logo />
        <div> {{ title }} </div>
      </div>
      <div class="flex flex-row justify-end items-center space-x-8 w-full">
        <!--搜索框-->
        <Search />
        <!--中英切换-->
        <Language />
        <!--全屏-->
        <FullScreen />
        <Notification />
        <Profile :nav-mode="navMode" />
      </div>
    </div>

    <div v-if="navMode === NAV_MODE.LEFT" class="w-full flex flex-row justify-between items-center h-full">
      <div class="cursor-pointer text-gray-500 space-x-8" @click="onCollapse">
        <IconArrowRight v-if="collapsed" :size="toolIconSize" />
        <IconAlignLeft v-else :size="toolIconSize" />
      </div>

      <div class="flex flex-row justify-end items-center space-x-8">
        <Search />
        <!--中英切换-->
        <Language />
        <!--全屏-->
        <FullScreen />
        <Notification />
        <!-- <a-button @click="logout">退出</a-button> -->
        <Profile :nav-mode="navMode" />
      </div>
    </div>

    <section
      v-if="navMode === NAV_MODE.RIGHT"
      class="w-full flex flex-row justify-end items-center space-x-8"
      :class="headerHeight.value"
    >
      <!-- 引入我的 -->

      <!--搜索框-->
      <Search />
      <!--中英切换-->
      <Language />
      <!--全屏-->
      <FullScreen />
      <!--消息弹窗-->
      <Notification />
      <!--个人中心-->

      <Profile :nav-mode="navMode" />
      <div class="cursor-pointer text-gray-500" @click="onCollapse">
        <IconArrowLeft v-if="collapsed" :size="toolIconSize" />
        <IconAlignRight v-else :size="toolIconSize" />
      </div>
    </section>
  </a-layout-header>
</template>

<script lang="ts" setup>
  import { ComputedRef, ref, unref, computed } from 'vue'
  import type { IHeaderHeightOption } from '@/settings/projectSetting'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { useGlobSetting } from '@/hooks/setting'
  import { IconAlignLeft, IconAlignRight, IconArrowRight, IconArrowLeft } from '@arco-design/web-vue/es/icon'
  import { NAV_MODE } from '@/enums/pageEnum'
  import Logo from '@/components/Logo'

  import Profile from './profile.vue'
  import Notification from './notification.vue'

  import Language from './language.vue'
  import Search from './search.vue'
  import FullScreen from './fullScreen.vue'

  const { title } = useGlobSetting()
  const { getToolIconSize, getSidebarWidth } = useProjectSetting()
  console.log('🚀 ~ file: index.vue ~ line 95 ~ getSidebarWidth', getSidebarWidth)

  const sidebarWidth = unref<ComputedRef<any>>(getSidebarWidth)
  const sidebarWidthString = `${sidebarWidth}px`
  console.log('🚀 ~ file: index.vue ~ line 92 ~ sidebarWidthString', sidebarWidthString)

  const toolIconSize = ref<ComputedRef<number>>(getToolIconSize)

  const props = defineProps<{
    navMode: NAV_MODE
    collapsed: boolean
    headerHeight: IHeaderHeightOption
    fixed: boolean
  }>()

  const headerHeight = computed(() => {
    return props.headerHeight.value
  })

  const emits = defineEmits(['update-collapsed'])

  const onCollapse = () => {
    emits('update-collapsed', !props.collapsed)
  }
</script>

<style scoped lang="less">
  .header-fixed-with-sidebar {
  }

  .width-without-sidebar {
    width: calc(100% - v-bind(sidebarWidthString));
  }
</style>
