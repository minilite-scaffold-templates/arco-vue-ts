import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'

import pkg from './package.json'
const { dependencies, devDependencies, name, version } = pkg

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  const {
    VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE,
    VITE_PORT,
    VITE_GLOB_PROD_MOCK,
    VITE_PROXY,
  } = viteEnv

  const prodMock = VITE_GLOB_PROD_MOCK
  const isBuild = command === 'build'

  return {
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
      ],
      dedupe: ['vue'],
    },

    plugins: createVitePlugins(viteEnv, isBuild, prodMock),

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'arcoblue-6': '#3a49a8',
          },
          javascriptEnabled: true,
        },
      },
    },
  }
}
