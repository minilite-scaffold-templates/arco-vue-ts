import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'
import createVitePlugins from './build/vite/plugin'
import modifyVars from './build/theme/arco/modifyVars'
import OUTPUT_DIR from './build/constant'

function pathResolve(dir: string): string {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PORT } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: `${pathResolve('types')}/`,
        },
        {
          find: '@',
          replacement: `${pathResolve('src')}/`,
        },
      ],
      dedupe: ['vue'],
    },

    server: {
      host: false,
      port: VITE_PORT,
    },

    //  Vite插件
    plugins: createVitePlugins(viteEnv, isBuild),

    // Css预处理
    css: {
      preprocessorOptions: {
        less: {
          modifyVars,
          javascriptEnabled: true,
        },
      },
    },

    // 打包配置
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
    },
  }
}
