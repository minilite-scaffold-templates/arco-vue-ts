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

      <a-form layout="vertical" :model="form" :rules="rules" @submit="handleSubmit">
        <a-form-item field="username" :hide-label="true">
          <a-input v-model="form.username" placeholder="输入用户名" autocomplete="off">
            <template #prefix> <icon-user /> </template
          ></a-input>
        </a-form-item>
        <a-form-item field="password" :hide-label="true">
          <a-input v-model="form.password" placeholder="输入密码" type="password" autocomplete="off">
            <template #prefix> <icon-lock /> </template
          ></a-input>
        </a-form-item>
        <a-form-item field="confirmPassword" :hide-label="true">
          <a-input v-model="form.confirmPassword" placeholder="再次确认密码" type="password" autocomplete="off">
            <template #prefix> <icon-lock /> </template
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary" long>注册新用户</a-button>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-model:checked="form.agree">
            <span class="text-sm text-gray-800">同意 <a class="font-bold text-black">本站协议</a> 注册新用户</span>
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

  const rules = {
    username: {
      required: true,
      message: '请输入用户名',
    },
    password: {
      required: true,
      message: '请输入密码',
    },
    confirmPassword: {
      required: true,
      message: '请再次输入密码',
    },
  }

  const handleSubmit = () => {
    console.log('注册')
  }
</script>

<style scoped lang="less"></style>
