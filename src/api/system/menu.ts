import Axios from '@/utils/http/axios/index'

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return Axios.request({
    url: '/menus',
    method: 'GET',
  })
}
