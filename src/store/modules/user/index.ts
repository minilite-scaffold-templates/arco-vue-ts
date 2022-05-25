import { getUserInfo, login } from '@/api/auth/user'
import { removeRouteListener } from '@/router/listener'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { encryptBase64 } from '@/utils/encrypt'
import { createStorage, storage } from '@/utils/Storage'
import { defineStore } from 'pinia'

const Storage = createStorage({ storage: localStorage })

// 用户登录参数
export interface UserLoginParams {
  username: string
  password: string
}

// 用户信息
export interface IUserState {
  token: string
  username: string
  avatar: string
  permissions: any[]
  info: any
}

// 定义用户状态管理
const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    username: '',
    avatar: '',
    permissions: [],
    info: Storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getUserInfo(): object {
      return this.info
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(info: any) {
      this.info = info
    },

    // 登录
    // 调用登录接口, 保存返回的 token 到 Store
    async login(params: UserLoginParams) {
      try {
        const info = encryptBase64(JSON.stringify(params))
        const result = await login({ info })
        const { token } = result.data.data
        if (token) {
          const ex = 7 * 24 * 60 * 60 * 1000
          storage.set(ACCESS_TOKEN, token, ex)
          this.setToken(token)
          return Promise.resolve(result)
        }
      } catch (e) {
        return Promise.reject(e)
      }
      return null
    },

    // 获取用户信息, 保存用户信息到 Store
    getInfo() {
      // const that = this
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            console.log('res', res)
            this.setUserInfo(res.data.data)
            resolve(res.data.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    async logout() {
      this.setToken('')
      this.setUserInfo('')
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)

      removeRouteListener()
    },
  },
})

export default useUserStore

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}
