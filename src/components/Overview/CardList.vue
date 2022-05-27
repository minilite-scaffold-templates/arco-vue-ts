<template>
  <a-grid :cols="{ xs: 1, sm: 2, md: 4 }" :col-gap="16" :row-gap="16">
    <a-grid-item v-for="(i, index) in dataList" :key="index" :span="1">
      <div class="p-5 border border-gray-100 bg-white space-y-3 rounded-md bg-success">
        <div class="text-gray-700">{{ i.name }}</div>
        <div class="flex flex-row justify-between items-center">
          <div class="space-y-2">
            <div class="font-semibold text-2xl"> {{ i.data }} </div>
            <div>
              <a-link :hoverable="false" :href="i.path">查看详情</a-link>
            </div>
          </div>
          <div class="rounded-lg bg-gray-100 p-3">
            <a-typography-text :type="i.type">
              <Icon :icon="i.icon" :size="i.iconSize" :type="i.type" />
            </a-typography-text>
          </div>
        </div>
      </div>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import {} from 'vue'
  import Icon from '@/components/Icon/index.vue'

  defineProps<{
    dataList: {
      data: number | string
      path: string
      name: string
      type: 'success' | 'danger' | 'primary' | ''
      icon: string
      iconSize: number
    }[]
  }>()
</script>

<style scoped lang="less"></style>
