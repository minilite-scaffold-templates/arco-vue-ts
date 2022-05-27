<template>
  <div :class="navMode !== NAV_MODE.HORIZONTAL && headerFixed ? 'layout-breadcrumb-with-header-fixed' : ''"></div>
  <section class="z-5 shadow shadow-gray-200 h-8 p-5 flex flex-row justify-between items-center bg-white">
    <div>
      {{ routeItems[routeItems.length - 1].meta.title }}
    </div>
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(i, index) in routeItems" :key="index">
        <span v-if="index === routeItems.length - 1"> {{ i.meta.title }} </span>
        <span v-else class="cursor-pointer" @click="go(i.path)"> {{ i.meta.title }} </span>
      </a-breadcrumb-item>
      <template #separator>
        <icon-right />
      </template>
    </a-breadcrumb>
  </section>
</template>

<script lang="ts" setup>
  import { NAV_MODE } from '@/enums/pageEnum'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { IHeaderHeightOption } from '@/settings/projectSetting'
  import { computed, ref, ComputedRef } from 'vue'
  import type { RouteLocationMatched } from 'vue-router'
  import { useRoute, useRouter } from 'vue-router'

  const { getHeaderHeight, getHeaderFixed } = useProjectSetting()

  const headerHeight = ref<ComputedRef<IHeaderHeightOption>>(getHeaderHeight)
  const headerHeightCssValue = headerHeight.value.cssValue

  const headerFixed = ref<ComputedRef<boolean>>(getHeaderFixed)

  defineProps<{ navMode: NAV_MODE }>()

  const route = useRoute()
  const router = useRouter()

  const go = (path: string) => {
    router.push(path)
  }

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
</script>

<style scoped lang="less">
  .layout-breadcrumb {
    &-with-header-fixed {
      margin-top: v-bind(headerHeightCssValue);
    }
  }
</style>
