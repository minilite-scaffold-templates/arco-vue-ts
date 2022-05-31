<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition :name="getTransitionName" mode="out-in" appear>
        <keep-alive v-if="keepaliveComponents" :include="keepaliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" /> </transition
    ></template>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute'

  const { getIsPageAnimate, getPageAnimateType } = useProjectSetting()

  const asyncRouteStore = useAsyncRouteStore()

  // 需要缓存的路由组件
  const keepaliveComponents = computed(() => asyncRouteStore.keepaliveComponents)

  const getTransitionName = computed(() => {
    return unref(getIsPageAnimate) ? unref(getPageAnimateType) : ''
  })
</script>

<style scoped lang="less">
  .layout-content {
  }
</style>
