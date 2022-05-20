import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

/**
 * Mock插件配置
 * @param {boolean} isBuild
 * @param {boolean }prodMock
 * @returns
 */
export default function configMockPlugin(isBuild: boolean, prodMock: boolean) {
  return viteMockServe({
    ignore: /^_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild && prodMock,
    injectCode: `
    import setupProdMockServer  from '../mock/_createProductionServer'
    setupProdMockServer()
    `,
    injectFile: resolve('src/main.ts'),
  })
}
