<template>
  <svg aria-hidden="true" class="svg-icon" :class="className">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    prefix: { type: String, default: 'icon' },
    iconClass: { type: String, required: true },
    color: { type: String, default: '' },
    className: { type: String, default: '' },
  })

  const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`)
</script>

<style scoped>
  .svg-icon {
    overflow: hidden;
    fill: currentColor;
  }
</style>
