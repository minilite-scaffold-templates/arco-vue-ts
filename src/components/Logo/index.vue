<template>
  <div class="animate__animated animate__fadeIn">
    <a-image :src="Logo" alt="logo" :width="width" :height="height" :preview="false" />
  </div>
</template>

<script lang="ts" setup>
  import {} from 'vue'
  import Logo from '@/assets/logo.png'
  import setting from '@/settings/projectSetting'
  import 'animate.css'

  const width = setting.logoSize
  const height = setting.logoSize
</script>

<style scoped lang="less"></style>
