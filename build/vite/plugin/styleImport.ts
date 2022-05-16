import styleImport from 'vite-plugin-style-import'

export default function configStyleImportPlugin() {
  const styleImportPlugin = styleImport({
    libs: [
      {
        libraryName: '@arco-design/web-vue',
        esModule: true,
        resolveStyle: (name) => {
          // css
          // return `@arco-design/web-vue/es/${name}/style/css.js`
          // less
          return `@arco-design/web-vue/es/${name}/style/index.js`
        },
      },
    ],
  })

  return styleImportPlugin
}
