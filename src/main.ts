import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import Markdown from 'vue3-markdown-it'
import SvgIcon from '@/components/Svg' // 引入组件
import PageContent from '@/components/PageContent'

import App from './App.vue'
// import '@arco-design/web-vue/dist/arco.less'
import '@/assets/style/global.less'
import 'animate.css'

import { setupStore } from './store'
import router, { setupRouter } from './router'

async function boot() {
  const app = createApp(App)
  app.use(ArcoVue)
  app.use(ArcoVueIcon)
  app.use(Markdown)

  app.component('SvgIcon', SvgIcon)
  app.component('PageContent', PageContent)

  // 挂载路由
  setupRouter(app)

  // 挂载状态管理
  setupStore(app)

  await router.isReady()

  app.mount('#app', true)
}

boot()
