<template>
  <!-- 登录页面布局 -->
  <div class="fixed top-0 left-0 z-0 flex flex-row w-full h-screen">
    <div class="hidden md:block w-2/3 bg-white flex flex-col justify-between h-full border-r">
      <div class="text-xs md:text-black w-full h-full flex flex-col justify-between">
        <div class="p-10 text-black text-lg font-mono">
          {{ title }}
        </div>
        <div class="text-right p-5 text-gray-500">
          {{ COPYRIGHT }}
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 flex flex-col justify-between md:items-end p-5 md:p-10">
      <div class="hidden md:block space-x-1"> <a-button type="primary" @click="showLoginForm">登录</a-button><a-button @click="showRegisterForm">注册</a-button> </div>
      <div class="p-12 m-10 bg-white block md:hidden">
        <LoginForm :register="registerDisplay" @close="closeLoginForm" />
      </div>
      <div class="block md:hidden text-gray-500 text-center"> {{ COPYRIGHT }}</div>
    </div>
  </div>

  <!-- 弹出登录框 -->
  <div class="fixed flex flex-col items-center justify-center w-full h-screen z-20" :class="loginInvisible">
    <div class="m-auto w-200 hidden md:block">
      <div class="bg-white shadow-lg border">
        <a-row>
          <a-col :span="12">
            <section class="h-full p-10 text-black font-bold space-y-3 font-mono">
              <div class="text-3xl">
                <a href="/">{{ title }}</a>
              </div>
              <div class="text-sm"> </div>
            </section>
          </a-col>
          <a-col :span="12" class="md:border-l">
            <div class="p-15 login-container">
              <LoginForm :register="registerDisplay" @show-register="showRegister" @close="closeLoginForm" />
              <RegisterForm :show="registerDisplay" @back-to-login="backToLogin" @close="closeLoginForm" />
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useGlobSetting } from '../../../hooks/setting'
  import LoginForm from './LoginForm.vue'
  import RegisterForm from './RegisterForm.vue'

  // 从全局设置中获取网站标题、版权信息
  const { title, copyright } = useGlobSetting()

  // 格式化版权信息
  const COPYRIGHT = computed(() => {
    return copyright.toUpperCase() // 转大写
  })

  const loginInvisible = ref('invisible')

  // 显示注册
  const registerDisplay = ref(false)

  const showLoginForm = () => {
    registerDisplay.value = false
    loginInvisible.value = loginInvisible.value === '' ? 'invisible' : ''
  }

  const showRegisterForm = () => {
    registerDisplay.value = true
    loginInvisible.value = loginInvisible.value === '' ? 'invisible' : ''
  }

  const closeLoginForm = () => {
    loginInvisible.value = 'invisible'
  }

  const backToLogin = () => {
    registerDisplay.value = false
  }

  const showRegister = () => {
    registerDisplay.value = true
  }
</script>

<style scoped lang="less">
  .login-container {
    overflow: hidden;
    min-height: 460px;
    width: 100%;
    position: relative;

    .normal-login-show {
      position: absolute;

      left: 0;
      margin: 0 auto;
      width: 100%;
      padding: 10px 60px;
      animation: normal-login-animation 0.3s alternate forwards;
    }
    .normal-login-hidden {
      position: absolute;
      animation: normal-login-hidden-animation 0.3s alternate forwards;
      width: 100%;
      padding: 10px 60px;
    }
    @keyframes normal-login-hidden-animation {
      0% {
        left: 0;
      }
      100% {
        left: -100%;
      }
    }

    .register-hidden,
    .forget-hidden,
    .third-login-hidden {
      position: absolute;
      animation: switch-hidden-animation 0.3s alternate forwards;
      width: 100%;
      padding: 10px 60px;
    }

    .register-show,
    .forget-show,
    .third-login-show {
      position: absolute;
      left: 0;
      margin: 0 auto;
      width: 100%;
      animation: switch-animation 0.3s alternate forwards;
      width: 100%;
      padding: 10px 60px;
    }

    @keyframes switch-animation {
      0% {
        left: 100%;
      }
      100% {
        left: 0;
      }
    }
    @keyframes switch-hidden-animation {
      0% {
        left: 0%;
      }
      100% {
        left: 100%;
      }
    }

    @keyframes normal-login-animation {
      0% {
        left: -100%;
      }
      100% {
        left: 0;
      }
    }
  }
</style>
