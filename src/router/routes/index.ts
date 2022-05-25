import { RouteRecordRaw } from 'vue-router'

const appRoutes: RouteRecordRaw[] = []

const modules = import.meta.globEager('./modules/*.ts')

Object.keys(modules).forEach((key) => {
  const defaultModule = modules[key].default
  if (!defaultModule) return
  const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
  appRoutes.push(...moduleList)
})

console.log('appRoutes', appRoutes)
export default appRoutes
