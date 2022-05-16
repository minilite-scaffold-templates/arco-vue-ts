import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import configStyleImportPlugin from './styleImport'
import { configCompressPlugin } from './compress'

// 创建Vite插件
export function createVitePlugins(
  viteEnv: ViteEnv,
  isBuild: boolean,
  prodMock: boolean
) {
  const {
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // 在vue3.2的script中添加name
    vueSetupExtend(),
  ]

  // configStyleImportPlugin
  vitePlugins.push(configStyleImportPlugin)

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      )
    )
  }

  return vitePlugins
}
