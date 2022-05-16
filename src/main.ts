import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.less'

async function boot() {
  const app = createApp(App)
  app.use(ArcoVue)
  app.mount('#app', true)
}

void boot()
