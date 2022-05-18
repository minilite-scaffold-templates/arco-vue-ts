import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'
import '@/assets/style/global.less'
import '@arco-design/web-vue/dist/arco.less'
import store from './store'
import router, { setupRouter } from './router'

async function boot() {
  const app = createApp(App)
  app.use(ArcoVue)

  app.use(store)

  // 挂载路由
  setupRouter(app)

  await router.isReady()

  app.mount('#app', true)
}

boot()
