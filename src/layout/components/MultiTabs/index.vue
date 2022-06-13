<template>
  <div :class="!fixed ? 'bg-white p-1 layout-multi-tab' : 'bg-white p-1 fixed-header'">
    <Draggable :list="tabsList" animation="200" ghost-class="ghost" item-key="fullPath" class="flex space-x-1">
      <template #item="{ element }">
        <a-button
          :type="element.fullPath === activeKey ? 'outline' : undefined"
          @click.stop="selectTab(element.fullPath)"
        >
          {{ element.meta.title }}
          <icon-close @click.stop="removeTab(element.fullPath)" />
        </a-button>
      </template>
    </Draggable>

    <!-- <a-tabs
      type="text"
      :active-key="activeKey"
      :animation="true"
      :editable="true"
      @delete="removeTab"
      @change="selectTab"
    >
      <a-tab-pane v-for="item of tabsList" :key="item.fullPath" :title="item.meta.title" :closable="true"> </a-tab-pane>
    </a-tabs> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, computed } from 'vue'
  import Draggable from 'vuedraggable'
  import type { RouteItem } from '@/store/modules/tabbar'
  import useTabbarStore from '@/store/modules/tabbar'
  import { useRoute, useRouter } from 'vue-router'
  import { NAV_MODE, PageEnum } from '@/enums/pageEnum'
  import { storage } from '@/utils/Storage'
  import { TABS_ROUTES } from '@/store/mutation-types'
  import { Message } from '@arco-design/web-vue'
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
  import { useGo } from '@/hooks/web/usePage'
  import { IHeaderHeightOption } from '@/settings/projectSetting'

  const go = useGo()

  const props = defineProps<{ fixed: boolean; headerHeight: IHeaderHeightOption; navMode: NAV_MODE }>()

  const headerHeightCssValue = computed(() => {
    console.log('props.headerHeight.cssValue', props.headerHeight.cssValue)
    return props.headerHeight.cssValue
  })

  // MultiTabs 白名单 (这些路由不进 MultiTabs)
  const whiteList: string[] = [PageEnum.BASE_LOGIN_NAME, PageEnum.REDIRECT_NAME, PageEnum.ERROR_PAGE_NAME]

  const asyncRouteStore = useAsyncRouteStore()
  const tabbarStore = useTabbarStore()
  const router = useRouter()
  const route = useRoute()

  // 获取简易的路由对象
  const getSimpleRoute = (route): RouteItem => {
    const { fullPath, meta, name } = route
    return { fullPath, meta, name }
  }

  let cacheRoutes: RouteItem[] = []
  const simpleRoute = getSimpleRoute(route)
  try {
    const routesInStorage = storage.get(TABS_ROUTES)
    cacheRoutes = routesInStorage.length ? routesInStorage : [simpleRoute]
  } catch (e) {
    cacheRoutes = [simpleRoute]
  }

  // 将最新的路由信息同步到 localStorage 中
  const routes = router.getRoutes()
  cacheRoutes.forEach((cacheRoute: RouteItem) => {
    const route = routes.find((route) => route.path === cacheRoute.path)
    if (route) {
      cacheRoute.meta = route.meta || cacheRoute.meta
      cacheRoute.name = (route.name || cacheRoute.name) as string
    }
  })

  // 初始化标签页
  tabbarStore.initTabs(cacheRoutes)

  const tabsList = computed<RouteItem[]>(() => tabbarStore.tabsList)

  const activeKey = ref(route.fullPath)

  watch(
    () => route.fullPath,
    (to) => {
      if (whiteList.includes(route.name as string)) return
      activeKey.value = to

      console.log('activeKey', activeKey)
      tabbarStore.addTab(getSimpleRoute(route as RouteItem))
      // updateNavScroll(true)
    },
    { immediate: true }
  )

  // 移除缓存组件名称
  const delKeepAliveCompName = () => {
    const components = asyncRouteStore.keepaliveComponents
    console.log('🚀 ~ file: index.vue ~ line 76 ~ delKeepAliveCompName ~ components', components)
  }

  // 删除标签页
  const removeTab = (fullPath: string) => {
    if (tabsList.value.length && tabsList.value.length === 1) {
      return Message.warning('需保留一个标签页')
    }
    const routeInfo = tabsList.value.find((item) => item.fullPath === fullPath)
    routeInfo && tabbarStore.closeCurrentTab(routeInfo)
    delKeepAliveCompName()

    // 如果关闭的是当前页
    if (activeKey.value === fullPath) {
      const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)]
      activeKey.value = currentRoute.fullPath
      router.push(currentRoute)
    }
  }

  /**
   * 选择标签，跳转到标签页面
   */
  const selectTab = (fullPath: string) => {
    if (fullPath === route.fullPath) return
    activeKey.value = fullPath
    go(fullPath, true)
  }
</script>

<style scoped lang="less">
  .fixed-header {
    margin-top: v-bind(headerHeightCssValue);
  }

  .ghost {
    opacity: 0.5;
  }
</style>
