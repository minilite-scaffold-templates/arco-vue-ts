<template>
  <a-menu :style="{ width: '100%' }" :mode="modeValue">
    <template v-for="v in routerMenuList">
      <a-sub-menu v-if="v?.children?.length" :key="v.path">
        <template #title>
          <span> <Icon :icon="v.meta.icon" />{{ v.meta.title }}</span>
        </template>
        <a-menu-item v-for="v1 in v.children" :key="v.path + v1.path">
          <span :style="{ marginLeft: '12px' }">
            {{ v1.meta.title }}
          </span>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
  import { onMounted, defineProps, ref } from 'vue'
  import { routerMenuList } from '@/router/index'
  // import { MenuList } from '@/store/modules/user/types'

  const props = defineProps({
    mode: {
      type: String,
      default: '',
    },
  })

  const modeValue = ref<any>('')

  console.log('121212111212121', routerMenuList)

  // 数据在下面定义
  // const collapsed = ref(false);

  // 函数写在这下面
  const checkModeValue = () => {
    if (props.mode === 'left') {
      modeValue.value = 'vertical'
    } else if (props.mode === 'horizontal') {
      modeValue.value = 'horizontal'
    } else {
      modeValue.value = 'right'
    }
  }

  onMounted(() => {
    checkModeValue()
  })
</script>

<style lang="less" scoped></style>
