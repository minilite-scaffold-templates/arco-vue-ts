import { h } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

export function renderIcon(icon: any, size = 20) {
  return () => h(ArcoVueIcon, { size }, { default: () => h(icon) })
}

/**
 *  找到对应的节点
 * */
let result = null
export function getTreeItem(data: any[], key?: string | number): any {
  // eslint-disable-next-line array-callback-return
  data.map((item) => {
    if (item.key === key) {
      result = item
    } else if (item.children && item.children.length) {
      getTreeItem(item.children, key)
    }
  })
  return result
}
