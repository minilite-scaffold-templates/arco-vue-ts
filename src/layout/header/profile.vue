<template>
  <section class="flex flex-row justify-center items-center pr-5">
    <a-dropdown class="w-36" position="tr">
      <div class="cursor-pointer py-3"
        ><div>{{ username }}</div> <div>{{ roleName }}</div></div
      >
      <template #content>
        <a-doption @click="gotoProfile">
          <template #icon>
            <icon-user />
          </template>
          <template #default>个人中心</template>
        </a-doption>
        <a-doption>
          <template #icon>
            <icon-settings />
          </template>
          <template #default>设置</template>
        </a-doption>
        <a-doption @click="logout">
          <template #icon>
            <icon-export />
          </template>
          <template #default>退出</template></a-doption
        >
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
  const { roleName } = userStore.info

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

  // 跳转到个人中心
  const gotoProfile = () => {
    router.push({
      path: '/user/profile',
    })
  }
</script>

<style scoped lang="less">
  .arco-dropdown-open .arco-icon-down {
    transform: rotate(180deg);
  }
</style>
