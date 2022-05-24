import { createVNode } from 'vue'
import * as $Icon from '@arco-design/web-vue/es/icon'

export const Icon = (props: { icon: string }) => {
  const { icon } = props
  const Icon: { [key: string]: any } = $Icon
  return createVNode(Icon[icon], {}, () => {
    return 'default'
  })
}
