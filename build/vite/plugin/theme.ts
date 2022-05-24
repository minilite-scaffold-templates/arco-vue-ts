import type { Plugin } from 'vite'
import vitePluginForArco from '@arco-plugins/vite-vue'

export default function configArcoTheme(): Plugin {
  return vitePluginForArco({
    theme: '@arco-themes/vue-velzon-theme',
  })
}
