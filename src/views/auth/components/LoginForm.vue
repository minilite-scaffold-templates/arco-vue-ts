<template>
  <div :class="register ? 'normal-login-hidden' : 'normal-login-show'">
    <div class="space-y-5">
      <div class="font-extrabold text-xl flex flex-row justify-between items-center">
        <span class="">登录</span>
        <span class="cursor-pointer hidden md:block" @click="close">
          <icon-close />
        </span>
      </div>
      <a-form layout="vertical" :model="form" @submit="handleSubmit">
        <a-form-item field="username">
          <a-input v-model="form.username" placeholder="输入用户名">
            <template #prefix> <icon-user /> </template
          ></a-input>
        </a-form-item>
        <a-form-item field="password">
          <a-input v-model="form.password" placeholder="输入密码" type="password">
            <template #prefix> <icon-lock /> </template
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary" long>登录</a-button>
        </a-form-item>
      </a-form>

      <section>
        <!-- 跳转注册链接和忘记密码 -->
        <div class="text-center space-x-2">
          <span>
            还没有账号?
            <a href="#" class="font-bold text-black" @click="showRegister">立即注册</a></span
          >
          <!-- <span class="text-xs text-gray-200">|</span>
          <a href="#" class="font-bold text-black">忘记密码</a> -->
        </div>
      </section>
    </div></div
  >
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'

  defineProps<{ register: boolean }>()

  const emits = defineEmits(['close', 'show-register'])

  interface LoginParams {
    username: string
    password: string
  }

  const form = reactive<LoginParams>({
    username: '',
    password: '',
  })

  // 提交登录
  const handleSubmit = (val: any) => {
    console.log('val', val)
  }

  // 关掉登录框
  const close = () => {
    emits('close')
  }

  const showRegister = () => {
    emits('show-register')
  }
</script>

<style scoped lang="less"></style>
