<template>
  <a-layout-header
    class="flex flex-row justify-between items-center border-b border-gray-100 bg-white"
    :class="headerHeight.value"
  >
    <section v-if="navMode === NAV_MODE.LEFT" class="flex flex-row justify-start items-center">
      <div class="cursor-pointer pl-5 text-gray-500" @click="onCollapse">
        <IconArrowRight v-if="collapsed" :size="toolIconSize" />
        <IconAlignLeft v-else :size="toolIconSize" />
      </div>
    </section>

    <!-- 引入我的 -->
    <section :class="navMode === NAV_MODE.LEFT ? 'pr-5' : 'pl-5'" class="flex flex-row justify-center items-center">
      <Profile :nav-mode="navMode" />
    </section>

    <section v-if="navMode === NAV_MODE.RIGHT" class="flex flex-row justify-start items-center">
      <div class="cursor-pointer pr-5 text-gray-500" @click="onCollapse">
        <IconArrowLeft v-if="collapsed" :size="toolIconSize" />
        <IconAlignRight v-else :size="toolIconSize" />
      </div>
    </section>
    <!--个人中心-->
    <section class="flex flex-row items-center space-x-4">
      <div><Notification /></div>
    </section>
  </a-layout-header>
</template>

<script lang="ts" setup>
  import { ComputedRef, ref } from 'vue'
  import type { IHeaderHeightOption } from '@/settings/projectSetting'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { IconAlignLeft, IconAlignRight, IconArrowRight, IconArrowLeft } from '@arco-design/web-vue/es/icon'
  import { NAV_MODE } from '@/enums/pageEnum'
  import Profile from './profile.vue'
  import Notification from './notification.vue'

  const { getToolIconSize } = useProjectSetting()

  const toolIconSize = ref<ComputedRef<number>>(getToolIconSize)

  const props = defineProps<{ navMode: NAV_MODE; collapsed: boolean; headerHeight: IHeaderHeightOption }>()

  const emits = defineEmits(['update-collapsed'])

  const onCollapse = () => {
    emits('update-collapsed', !props.collapsed)
  }
</script>

<style scoped lang="less"></style>
