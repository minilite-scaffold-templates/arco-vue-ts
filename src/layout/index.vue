<template>
  <div class="border-r border-l border-gray-200" :class="layoutWidth === LAYOUT_WIDTH.BOXED ? 'm-auto container' : ''">
    <a-layout class="h-screen" :class="layoutWidth === LAYOUT_WIDTH.BOXED ? 'container' : ''">
      <a-layout-sider
        v-if="navMode === NAV_MODE.LEFT"
        :theme="navTheme"
        :default-collapsed="false"
        :width="220"
        :collapsed-width="80"
        :collapsed="collapsed"
        :collapsible="true"
        :hide-trigger="true"
        class="border-r border-gray-200"
      >
      </a-layout-sider>
      <a-layout>
        <Header :nav-mode="navMode" :collapsed="collapsed" @update-collapsed="updateCollapsedFromHeader" />
        <section class="border-b h-8 p-5 border-b-gray-200 flex flex-row justify-between items-center">
          <div>
            {{ routeItems[routeItems.length - 1].meta.title }}
          </div>
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(i, index) in routeItems" :key="index">
              <span v-if="index === routeItems.length - 1"> {{ i.meta.title }} </span>
              <span v-else class="cursor-pointer" @click="gotoPage(i.path)"> {{ i.meta.title }} </span>
            </a-breadcrumb-item>
            <template #separator>
              <icon-right />
            </template>
          </a-breadcrumb>
        </section>

        <a-layout-content class="p-5">
          <router-view />
        </a-layout-content>
        <Footer />
      </a-layout>

      <a-layout-sider
        v-if="navMode === NAV_MODE.RIGHT"
        :theme="navTheme"
        :default-collapsed="false"
        :width="220"
        :collapsed-width="60"
        :collapsed="collapsed"
        :collapsible="true"
        :hide-trigger="true"
        class="border-l border-gray-200"
      >
      </a-layout-sider>

      <!-- 自定义主题 -->
      <CustomizeThemeSetting />

      <!-- 回到顶部 -->
      <a-back-top />
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import { LAYOUT_WIDTH, NAV_MODE, NAV_THEME } from '@/enums/pageEnum'
  import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { ComputedRef, ref, computed } from 'vue'

  import Header from './header'
  import Footer from './footer'
  import CustomizeThemeSetting from './customizeThemeSetting'

  const route = useRoute()
  const router = useRouter()

  const gotoPage = (path: string) => {
    console.log('🚀 ~ file: index.vue ~ line 62 ~ gotoPage ~ path', path)
    router.push({
      path,
    })
  }

  const { getNavTheme, getNavMode, getLayoutWidth } = useProjectSetting()

  const navMode = ref<ComputedRef<NAV_MODE>>(getNavMode)
  console.log('🚀 ~ file: index.vue ~ line 30 ~ navMode', navMode)

  const navTheme = ref<ComputedRef<NAV_THEME>>(getNavTheme)

  const layoutWidth = ref<ComputedRef<LAYOUT_WIDTH>>(getLayoutWidth)

  const collapsed = ref(false)

  const updateCollapsedFromHeader = (val: boolean) => {
    collapsed.value = val
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

<style></style>
