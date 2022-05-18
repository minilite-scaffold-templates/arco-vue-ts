import { resultSuccess } from 'mock/_util'
import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

const Random = Mock.Random
const token = Random.string('upper', 32, 32)

// 登录
const login = {
  url: '/api/auth/user/login',
  timeout: 1000,
  method: 'post',
  response: () => {
    return resultSuccess({ token })
  },
}

// 获取用户信息
const getUserInfo = {
  url: '/api/auth/user/info',
  timeout: 1000,
  method: 'post',
  response: () => {
    return resultSuccess({
      userId: '1',
      username: 'JackWong',
      realName: 'Admin',
      avatar: '',
      token,
      permissions: [
        {
          label: '仪表盘',
          value: 'dashboard-index',
        },
      ],
    })
  },
}

export default [login, getUserInfo] as MockMethod[]
