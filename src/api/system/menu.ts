import Axios from '@/utils/http/axios'

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return Axios.request({
    url: 'api/menus',
    method: 'GET',
  })
}

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params?) {
  return Axios.request({
    url: 'api/menu/list',
    method: 'GET',
    params,
  })
}
