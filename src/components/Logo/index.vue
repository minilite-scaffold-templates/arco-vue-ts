<template>
  <a-image :src="Logo" alt="logo" :width="width" :height="height" :preview="false" />
</template>

<script lang="ts" setup>
  import {} from 'vue'
  import Logo from '@/assets/logo.png'
  import setting from '@/settings/projectSetting'

  const width = setting.logoSize
  const height = setting.logoSize
</script>

<style scoped lang="less"></style>
