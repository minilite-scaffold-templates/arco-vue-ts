<script setup lang="ts">
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
</script>
<script lang="ts">
export default {
  name: 'App',
}
</script>

<template>
  <a-config-provider :locale="zhCN">
    <a-pagination :total="50" show-total show-jumper show-page-size />
  </a-config-provider>

  <a-button type="primary">hello</a-button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
