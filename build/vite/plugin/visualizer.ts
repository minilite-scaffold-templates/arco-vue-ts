import type { Plugin } from 'vite'
import visualizer from 'rollup-plugin-visualizer'

/**
 * Generation packaging analysis
 * 生成打包分析
 */
export default function configVisualizerPlugin(): Plugin {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  })
}
