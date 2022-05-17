import type { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default function configHtmlPlugin(
  env: ViteEnv,
  isBuild: boolean
): PluginOption[] {
  const { VITE_GLOB_APP_TITLE } = env

  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
    },
  })
  return htmlPlugin
}
