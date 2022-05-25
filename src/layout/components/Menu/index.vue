<template>
  <a-menu
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    :style="{ width: '100%', margin: 'auto' }"
    :mode="modeValue"
    :collapsed="collapsed"
    @menu-item-click="onClickMenuItem"
  >
    <!-- <template v-for="v in routerMenuList">
      <a-sub-menu v-if="v?.children?.length" :key="v.path">
        <template #title>
          <span :style="{ marginLeft: collapsed ? '12px' : '0' }"> <Icon :icon="v.meta.icon" />{{ v.meta.title }}</span>
        </template>
        <a-menu-item v-for="v1 in v.children" :key="v1.path">
          <span>
            {{ v1.meta.title }}
          </span>
        </a-menu-item>
      </a-sub-menu>
    </template> -->
  </a-menu>
</template>

<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router'
  import { onMounted, ref, watch } from 'vue'
  // import { routerMenuList } from '@/router/index'
  // import { Icon } from '@/utils/icons'
  import { MENU_MODE } from '@/enums/pageEnum'

  const props = defineProps({
    mode: {
      type: String,
      default: '',
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  })

  const modeValue = ref<any>('')

  // 数据在下面定义
  // const collapsed = ref(false);
  const route = useRoute()
  const router = useRouter()
  const selectedKeys = ref<string[]>([])

  const openKeys = ref<string[]>([])

  // 函数写在这下面
  const checkModeValue = () => {
    if (props.mode === MENU_MODE.VERTICAL) {
      modeValue.value = 'vertical'
    } else if (props.mode === MENU_MODE.HORIZONTAL) {
      modeValue.value = 'horizontal'
    }
  }

  // 点击菜单 路由跳转
  const onClickMenuItem = (key: string) => {
    router.push(key)
  }

  const menuChange = () => {
    if (route.fullPath.split('/').length === 3) {
      openKeys.value = [`/${route.fullPath.split('/')[1]}`]
    }
    selectedKeys.value = [route.fullPath]
  }

  watch(route, () => menuChange())

  onMounted(() => {
    checkModeValue()
    menuChange()
  })
</script>

<style lang="less" scoped></style>
