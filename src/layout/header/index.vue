<template>
  <a-layout-header
    class="border-b border-gray-100 flex flex-row justify-start items-center z-10 bg-white"
    :class="
      fixed
        ? navMode === NAV_MODE.HORIZONTAL
          ? `w-full fixed top-0`
          : `header-fixed-with-sidebar fixed top-0`
        : `w-full`
    "
  >
    <div
      v-if="navMode === NAV_MODE.HORIZONTAL"
      class="px-5 flex flex-row justify-between items-center w-full"
      :class="headerHeight.value"
    >
      <div class="flex flex-row justify-start items-center space-x-3">
        <Logo />
        <div> {{ title }} </div>
      </div>
      <div class="flex flex-row justify-end items-center space-x-8">
        <Notification />
        <Profile :nav-mode="navMode" />
      </div>
    </div>
    <section
      v-if="navMode === NAV_MODE.LEFT"
      class="flex flex-row justify-between items-center w-full px-5"
      :class="headerHeight.value"
    >
      <div class="cursor-pointer text-gray-500 space-x-8" @click="onCollapse">
        <IconArrowRight v-if="collapsed" :size="toolIconSize" />
        <IconAlignLeft v-else :size="toolIconSize" />
      </div>

      <div class="flex flex-row justify-end items-center space-x-8">
        <Search />
        <Notification />
        <!-- <a-button @click="logout">退出</a-button> -->
        <Profile :nav-mode="navMode" />
      </div>
    </section>

    <section
      v-if="navMode === NAV_MODE.RIGHT"
      class="w-full flex flex-row justify-end items-center space-x-8 px-5"
      :class="headerHeight.value"
    >
      <!-- 引入我的 -->

      <!--搜索框-->
      <Search />
      <!--中英切换-->
      <Language />
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
  import { ComputedRef, ref, unref } from 'vue'
  // import { Message } from '@arco-design/web-vue'
  // import { useRoute, useRouter } from 'vue-router'
  // import useUserStore from '@/store/modules/user'
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

  // const router = useRouter()
  // const route = useRoute()

  // const userStore = useUserStore()

  const { title } = useGlobSetting()
  const { getToolIconSize, getSidebarWidth } = useProjectSetting()

  const sidebarWidth = unref<ComputedRef<number>>(getSidebarWidth)
  const sidebarWidthCssValue = `${sidebarWidth}px`

  const toolIconSize = ref<ComputedRef<number>>(getToolIconSize)

  const props = defineProps<{
    navMode: NAV_MODE
    collapsed: boolean
    headerHeight: IHeaderHeightOption
    fixed: boolean
  }>()

  const headerHeightCssValue = unref(props.headerHeight).cssValue
  console.log('🚀 ~ file: index.vue ~ line 57 ~ headerHeightCssValue', headerHeightCssValue)

  const emits = defineEmits(['update-collapsed'])

  const onCollapse = () => {
    emits('update-collapsed', !props.collapsed)
  }

  // const logout = () => {
  //   userStore.logout().then(() => {
  //     Message.success({
  //       content: '退出成功!',
  //     })
  //     const redirect = route.path
  //     router.push({
  //       path: `/login`,
  //       query: { redirect },
  //     })
  //   })
  // }
</script>

<style scoped lang="less">
  // .layout-header {
  //   height: v-bind(headerHeightCssValue);
  // }

  .header-fixed-with-sidebar {
    width: calc(100% - v-bind(sidebarWidthCssValue));
  }
</style>
