<template>
  <a-layout-header
    class="flex flex-row h-15 justify-between items-center bg-white border-b border-gray-100 shadow-lg shadow-gray-700"
  >
    <section class="flex flex-row justify-start items-center">
      <div class="cursor-pointer pl-5" @click="onCollapse">
        <IconMenuUnfold v-if="collapsed" :size="toolIconSize" />
        <IconMenuFold v-else :size="toolIconSize" />
      </div>
    </section>

    <Profile />
  </a-layout-header>
  <a-page-header
    :show-back="false"
    :title="routeItems[0].meta.title"
    :subtitle="routeItems[1].meta.title"
    class="bg-white"
  >
    <template #extra>
      <!-- <a-radio-group type="button">
        <a-radio value="mini">Mini</a-radio>
        <a-radio value="small">Small</a-radio>
        <a-radio value="large">Large</a-radio>
      </a-radio-group> -->
    </template>
  </a-page-header>
</template>

<script lang="ts" setup>
  import { computed, ComputedRef, ref } from 'vue'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-vue/es/icon'
  import { RouteLocationMatched, useRoute } from 'vue-router'
  import Profile from './profile.vue'

  const route = useRoute()

  // 生成当前菜单项
  const generatorCurrentRouteItems: any = (routerMap: RouteLocationMatched[]) => {
    return routerMap.map((item) => {
      const currentItem = {
        ...item,
        label: item.meta.title,
        key: item.name,
        disabled: item.path === '/',
      }
      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        // Recursion
        currentItem.children = generatorCurrentRouteItems(item.children, currentItem)
      }
      return currentItem
    })
  }

  const routeItems = computed(() => {
    return generatorCurrentRouteItems(route.matched)
  })

  const { getToolIconSize } = useProjectSetting()

  const toolIconSize = ref<ComputedRef<number>>(getToolIconSize)

  const props = defineProps({
    collapsed: {
      type: Boolean,
    },
  })

  const emits = defineEmits(['update-collapsed'])

  const onCollapse = () => {
    emits('update-collapsed', !props.collapsed)
  }
</script>

<style scoped lang="less"></style>
