import axios from 'axios'

/**
 * 用户登录
 * @param {info}params
 * @returns
 */
export const login = (params: { info: string }): Promise<{ token: string }> => {
  return axios.post('/api/auth/user/login', params)
}

export const getUserInfo = () => {
  return axios.post('/api/auth/user/info')
}
