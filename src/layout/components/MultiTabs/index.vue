<template>
  <div>
    <a-tabs type="card-gutter" show-add-button auto-switch :editable="true" @delete="handleDelete">
      <a-tab-pane v-for="item of data" :key="item.key" :title="item.title" :closable="true">
        {{ item?.content }}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const data = ref([
    {
      key: '1',
      title: 'Tab 1',
      content: 'Content of Tab Panel 1',
    },
    {
      key: '2',
      title: 'Tab 2',
      content: 'Content of Tab Panel 2',
    },
    {
      key: '3',
      title: 'Tab 3',
      content: 'Content of Tab Panel 3',
    },
    {
      key: '4',
      title: 'Tab 4',
      content: 'Content of Tab Panel 4',
    },
  ])

  const handleDelete = (key: string) => {
    data.value = data.value.filter((item) => item.key !== key)
  }
</script>

<style scoped lang="less"></style>
