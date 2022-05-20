<template>
  <section class="px-5">
    <a-dropdown>
      <div class="cursor-pointer">{{ username }} <icon-down /></div>
      <template #content>
        <a-doption>个人中心</a-doption>
        <a-doption>设置</a-doption>
        <a-doption @click="logout">退出</a-doption>
      </template>
    </a-dropdown>
  </section>
</template>

<script lang="ts" setup>
  import {} from 'vue'
  import useUserStore from '@/store/modules/user'
  import { Message } from '@arco-design/web-vue'
  import { useRouter, useRoute } from 'vue-router'

  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()

  const { username } = userStore.info

  const logout = () => {
    userStore.logout().then(() => {
      Message.success({
        content: '退出成功!',
      })
      const redirect = route.path
      router.push({
        path: `/login`,
        query: { redirect },
      })
    })
  }
</script>

<style scoped lang="less">
  .arco-dropdown-open .arco-icon-down {
    transform: rotate(180deg);
  }
</style>
