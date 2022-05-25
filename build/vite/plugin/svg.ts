import type { Plugin } from 'vite'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function configSvgIcon(): Plugin {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [resolve(process.cwd(), 'src/assets/images/svg')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  })
}
