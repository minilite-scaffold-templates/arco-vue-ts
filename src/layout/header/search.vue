<template>
  <a-input :style="{ width: '150px' }" placeholder="请输入想搜索内容" allow-clear @click="openSearchModal">
    <template #prefix>
      <icon-search />
    </template>
  </a-input>
  <!--打开搜索对话框-->
  <a-modal>
    <template #title>
      <a-input :style="{ width: '210px' }" placeholder="请输入想搜索内容" allow-clear></a-input>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import {} from 'vue'

  const openSearchModal = () => {}
</script>
