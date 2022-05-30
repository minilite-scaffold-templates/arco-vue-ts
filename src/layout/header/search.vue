<template>
  <a-input :style="{ width: '200px' }" placeholder="请输入想搜索内容" allow-clear @focus="openSearchModal">
    <template #prefix>
      <icon-search />
    </template>
  </a-input>
  <!--打开搜索对话框-->
  <a-modal v-model:visible="searchParam.visible" closable :footer="false">
    <template #title>
      <div class="text-left">
        <a-input :style="{ width: '200px' }" placeholder="请输入想搜索内容" size="large" allow-clear>
          <template #prefix>
            <icon-search />
          </template>
        </a-input> </div
    ></template>
    <a-result status="404">
      <template #subtitle> 暂无内容 </template>
    </a-result>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'

  interface SearchParam {
    visible: boolean
  }
  const searchParam = reactive<SearchParam>({
    visible: false,
  })
  const openSearchModal = () => {
    console.log('click1')
    searchParam.visible = true
    console.log('click2')
  }
</script>
