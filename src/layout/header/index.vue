<template>
  <a-layout-header class="flex flex-row h-16 justify-between items-center border-b border-gray-100">
    <section class="flex flex-row justify-start items-center">
      <div class="cursor-pointer pl-5 text-gray-500" @click="onCollapse">
        <IconArrowRight v-if="collapsed" :size="toolIconSize" />
        <IconAlignLeft v-else :size="toolIconSize" />
      </div>
    </section>

    <Profile />
  </a-layout-header>
</template>

<script lang="ts" setup>
  import { ComputedRef, ref } from 'vue'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { IconAlignLeft, IconArrowRight } from '@arco-design/web-vue/es/icon'
  import Profile from './profile.vue'

  // const route = useRoute()

  // 生成当前菜单项
  // const generatorCurrentRouteItems: any = (routerMap: RouteLocationMatched[]) => {
  //   return routerMap.map((item) => {
  //     const currentItem = {
  //       ...item,
  //       label: item.meta.title,
  //       key: item.name,
  //       disabled: item.path === '/',
  //     }
  //     // 是否有子菜单，并递归处理
  //     if (item.children && item.children.length > 0) {
  //       // Recursion
  //       currentItem.children = generatorCurrentRouteItems(item.children, currentItem)
  //     }
  //     return currentItem
  //   })
  // }

  // const routeItems = computed(() => {
  //   return generatorCurrentRouteItems(route.matched)
  // })

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
