<template>
  <section class="space-y-1">
    <div class="py-1"> 欢迎回来, {{ username }}</div>
    <div class="space-x-2">
      <a-link :hoverable="false">修改密码</a-link>
      <a-link :hoverable="false">绑定手机号</a-link>
      <a-link :hoverable="false">绑定电子邮箱</a-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import useUserStore from '@/store/modules/user'
  import {} from 'vue'

  const userStore = useUserStore()
  const { info } = userStore

  const { username } = info
</script>

<style scoped lang="less"></style>
