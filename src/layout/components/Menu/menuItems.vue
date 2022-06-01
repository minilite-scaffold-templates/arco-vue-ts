<template>
  <template v-for="i in dataList">
    <a-sub-menu v-if="i.children && i.children.length" :key="i.name">
      <template #icon><Icon :icon="i.meta.icon" /></template>
      <template #title>{{ i.meta.title }}</template>
      <MenuItems :data-list="i.children" />
    </a-sub-menu>
    <template v-else>
      <a-menu-item :key="i.name" class="w-full m-auto" @click="goto(i)">{{ i.meta.title }}</a-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
  import Icon from '@/components/Icon/index.vue'
  import { RouteRecordRaw, useRouter } from 'vue-router'
  import MenuItems from './menuItems.vue'

  const router = useRouter()

  defineProps<{ dataList: any[] }>()

  const goto = (item: RouteRecordRaw) => {
    router.push({ name: item.name })
  }
</script>

<style scoped lang="less"></style>
