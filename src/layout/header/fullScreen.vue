<template>
  <a-button class="nav-btn" :shape="'circle'" @click="toggleFullScreen">
    <template #icon>
      <icon-fullscreen-exit v-if="isFullscreen" />
      <icon-fullscreen v-else />
    </template> </a-button
></template>

<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core'

  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
</script>
