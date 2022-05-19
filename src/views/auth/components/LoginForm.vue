<template>
  <div :class="register ? 'normal-login-hidden' : 'normal-login-show'">
    <div class="space-y-5">
      <div class="font-extrabold text-xl flex flex-row justify-between items-center">
        <span class="">登录</span>
        <span class="cursor-pointer hidden md:block" @click="close">
          <icon-close />
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
        <a-form-item>
          <a-button html-type="submit" type="primary" long :loading="loading">登录</a-button>
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
  import { reactive, ref } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import useUserStore from '@/store/modules/user'
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const userStore = useUserStore()

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

  // 表单效验规则
  const rules = {
    username: {
      required: true,
      message: '请输入用户名',
    },
    password: {
      required: true,
      message: '请输入密码',
    },
  }

  // 提交登录
  const loading = ref(false)
  const handleSubmit = async ({ values, errors }) => {
    console.log('values:', values, '\nerrors:', errors)
    if (!errors) {
      console.log('success')
      Message.loading({
        content: '登录中...',
        duration: 1000,
      })
      loading.value = true
      await userStore.login(values)

      const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
      console.log('🚀 ~ file: LoginForm.vue ~ line 89 ~ handleSubmit ~ toPath', toPath)
      Message.success({
        content: '登录成功!',
        duration: 1000,
      })
      router.replace(toPath).then(() => {
        if (route.name === 'login') {
          router.replace('/')
        }
      })
    }
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
