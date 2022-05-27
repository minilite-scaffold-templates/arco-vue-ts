<template>
  <a-card :bordered="false" :title="title" class="news-card">
    <template #extra>
      <a-link>查看更多</a-link>
    </template>
    <a-list :bordered="false" :hoverable="true" size="small">
      <a-list-item v-for="(i, index) in dataList" :key="index" class="cursor-pointer">
        <a-list-item-meta :title="i.title" :description="i.description">
          <template v-if="i.avatar" #avatar>
            <a-avatar shape="square">
              <img alt="avatar" :src="i.avatar" />
            </a-avatar>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script lang="ts" setup>
  import {} from 'vue'

  defineProps<{ title: string; dataList: any[] }>()
</script>

<style scoped lang="less"></style>
