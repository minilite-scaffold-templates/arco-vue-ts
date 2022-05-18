<template>
  <div :class="show ? 'register-show' : 'register-hidden'">
    <div class="space-y-5">
      <div class="font-extrabold text-xl flex flex-row justify-between items-center">
        <span class="">注册</span>
        <span class="flex flex-row justify-end items-center space-x-2">
          <span class="cursor-pointer hidden md:block" @click="backToLogin()"> <icon-arrow-left /> </span>
          <span class="cursor-pointer hidden md:block" @click="close">
            <icon-close />
          </span>
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
        <a-form-item field="confirmPassword">
          <a-input v-model="form.confirmPassword" placeholder="再次确认密码" type="password">
            <template #prefix> <icon-lock /> </template
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary" long>注册新用户</a-button>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-model:checked="form.agree">
            <span class="text-sm text-gray-800">同意 <a class="font-bold text-black">本网站协议</a> 并注册新用户</span>
          </a-checkbox>
        </a-form-item>
      </a-form>
    </div></div
  >
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'

  defineProps<{ show: boolean }>()

  const emits = defineEmits(['back-to-login', 'close'])

  // 返回登录
  const backToLogin = () => {
    emits('back-to-login')
  }

  const close = () => {
    emits('close')
  }

  const form = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    agree: false,
  })

  const handleSubmit = () => {
    console.log('注册')
  }
</script>

<style scoped lang="less"></style>
