<script setup lang="ts">
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
</script>
<script lang="ts">
  export default {
    name: 'App',
  }
</script>

<template>
  <a-config-provider :locale="zhCN">
    <div class="m-auto">
      <router-view />
    </div>
  </a-config-provider>
</template>
