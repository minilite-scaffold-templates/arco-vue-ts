<template>
  <a-menu :default-open-keys="['1']" :default-selected-keys="['0_3']" :style="{ width: '100%' }" :mode="modeValue">
    <a-menu-item key="0_1" disabled>
      <IconHome />
      Menu 1
    </a-menu-item>
    <a-menu-item key="0_2">
      <IconCalendar />
      Menu 2
    </a-menu-item>
    <a-menu-item key="0_3">
      <IconCalendar />
      Menu 3
    </a-menu-item>
    <a-sub-menu key="1">
      <template #title>
        <span><IconCalendar />Navigation 1</span>
      </template>
      <a-menu-item key="1_1">Menu 1</a-menu-item>
      <a-menu-item key="1_2">Menu 2</a-menu-item>
      <a-sub-menu key="2" title="Navigation 2">
        <a-menu-item key="2_1">Menu 1</a-menu-item>
        <a-menu-item key="2_2">Menu 2</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="3" title="Navigation 3">
        <a-menu-item key="3_1">Menu 1</a-menu-item>
        <a-menu-item key="3_2">Menu 2</a-menu-item>
        <a-menu-item key="3_3">Menu 3</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="4">
      <template #title>
        <span><IconCalendar />Navigation 4</span>
      </template>
      <a-menu-item key="4_1">Menu 1</a-menu-item>
      <a-menu-item key="4_2">Menu 2</a-menu-item>
      <a-menu-item key="4_3">Menu 3</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts" setup>
  import { onMounted, defineProps, ref } from 'vue'
  import { IconHome, IconCalendar } from '@arco-design/web-vue/es/icon'

  const props = defineProps({
    mode: {
      type: String,
      default: '',
    },
  })

  const modeValue = ref<any>('')

  // 数据在下面定义
  // const collapsed = ref(false);

  // 函数写在这下面
  const checkModeValue = () => {
    if (props.mode === 'left') {
      modeValue.value = 'vertical'
    } else {
      modeValue.value = 'horizontal'
    }
  }

  onMounted(() => {
    checkModeValue()
  })
</script>

<style lang="less" scoped></style>
