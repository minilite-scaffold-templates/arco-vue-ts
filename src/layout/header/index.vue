<template>
  <a-layout-header
    class="flex flex-row justify-between items-center border-b border-gray-100 bg-white"
    :class="headerHeight.value"
  >
    <section v-if="navMode === NAV_MODE.HORIZONTAL" class="p-5 flex flex-row items-center space-x-3">
      <Logo />
      <div>
        {{ title }}
      </div>
    </section>
    <section v-if="navMode === NAV_MODE.LEFT" class="flex flex-row justify-between items-center">
      <div class="cursor-pointer pl-5 text-gray-500" @click="onCollapse">
        <IconArrowRight v-if="collapsed" :size="toolIconSize" />
        <IconAlignLeft v-else :size="toolIconSize" />
      </div>
    </section>

    <!-- 状态栏组件列表 -->
    <section v-if="navMode === NAV_MODE.LEFT" class="pr-5 flex flex-row justify-center items-center space-x-5">
      <Notification />
      <Profile :nav-mode="navMode" />
    </section>

    <section v-if="navMode === NAV_MODE.RIGHT" class="w-full flex flex-row justify-end items-center space-x-5">
      <Notification />
      <Profile :nav-mode="navMode" />
      <div class="cursor-pointer pr-5 text-gray-500" @click="onCollapse">
        <IconArrowLeft v-if="collapsed" :size="toolIconSize" />
        <IconAlignRight v-else :size="toolIconSize" />
      </div>
    </section>
  </a-layout-header>
</template>

<script lang="ts" setup>
  import { ComputedRef, ref } from 'vue'
  import type { IHeaderHeightOption } from '@/settings/projectSetting'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { useGlobSetting } from '@/hooks/setting'
  import { IconAlignLeft, IconAlignRight, IconArrowRight, IconArrowLeft } from '@arco-design/web-vue/es/icon'
  import { NAV_MODE } from '@/enums/pageEnum'
  import Logo from '@/components/Logo'
  import Profile from './profile.vue'
  import Notification from './notification.vue'

  const { title } = useGlobSetting()
  const { getToolIconSize } = useProjectSetting()

  const toolIconSize = ref<ComputedRef<number>>(getToolIconSize)

  const props = defineProps<{ navMode: NAV_MODE; collapsed: boolean; headerHeight: IHeaderHeightOption }>()

  const emits = defineEmits(['update-collapsed'])

  const onCollapse = () => {
    emits('update-collapsed', !props.collapsed)
  }
</script>

<style scoped lang="less"></style>
