import type { Plugin, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import windiCSS from 'vite-plugin-windicss'
import configStyleImportPlugin from './styleImport'
import configCompressPlugin from './compress'
import configHtmlPlugin from './html'
import configVisualizerPlugin from './visualizer'
import { isReportMode } from '../../utils'

// 创建Vite插件
export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } =
    viteEnv

  const vitePlugins: (Plugin | Plugin[] | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // 在vue3.2的script中添加name
    vueSetupExtend(),

    // vite-plugin-windicss
    windiCSS(),
  ]

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // configStyleImportPlugin
  vitePlugins.push(configStyleImportPlugin())

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      )
    )
  }

  if (isReportMode()) {
    console.log('is report')
    vitePlugins.push(configVisualizerPlugin())
  }

  return vitePlugins
}
