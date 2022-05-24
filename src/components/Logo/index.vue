<template>
  <a-image :src="Logo" alt="logo" :width="width" :height="height" :preview="false" />
</template>

<script lang="ts" setup>
  import {} from 'vue'
  import Logo from '@/assets/logo.png'

  defineProps<{ width: number; height: number }>()
</script>

<style scoped lang="less"></style>
