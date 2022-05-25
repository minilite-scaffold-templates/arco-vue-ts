import { h } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

export function renderIcon(icon: any, size = 20) {
  return () => h(ArcoVueIcon, { size }, { default: () => h(icon) })
}
