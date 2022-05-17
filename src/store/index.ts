import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useTabbarStore from './modules/tabbar'
import useUserStore from './modules/user'

const pinia = createPinia()

export { useAppStore, useUserStore, useTabbarStore }

export default pinia
