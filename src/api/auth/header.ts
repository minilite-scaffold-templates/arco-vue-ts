import axios from 'axios'

/**
 * 获取消息列表
 * @param {info}params
 * @returns
 *
 */

export const getMessageList = () => {
  return axios.post('/api/auth/layout/header/message')
}
