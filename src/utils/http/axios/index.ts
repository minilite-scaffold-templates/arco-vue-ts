// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import axios, { AxiosResponse } from 'axios'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { PageEnum } from '@/enums/pageEnum'

import { useGlobSetting } from '@/hooks/setting'

import { isString } from '@/utils/is/'
import { setObjToUrlParams } from '@/utils/urlUtils'

import { useUserStoreWidthOut } from '@/store/modules/user'

import router from '@/router'
import { storage } from '@/utils/Storage'
import { RequestOptions, Result } from './types'
import { joinTimestamp, formatRequestDate } from './helper'
import { checkStatus } from './checkStatus'
import { AxiosTransform } from './axiosTransform'
import { VAxios } from './Axios'

const globSetting = useGlobSetting()
const urlPrefix = globSetting.urlPrefix || ''

let messageReactive: any = null

const removeMessage = () => {
  console.log('123123131231232', messageReactive)
  if (messageReactive) {
    messageReactive?.destroy()
    messageReactive = null
  }
}

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    // @ts-ignore
    const { $message: Message, $dialog: Modal } = window

    const {
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse,
    } = options

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }

    const { data } = res

    //  这里 code，data，msg为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data: result, msg: message, errCode } = data
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      if (errCode === '401') {
        const LoginName = PageEnum.BASE_LOGIN_NAME
        if (router.currentRoute.value.name === LoginName) return
        // 到登录页
        // const timeoutMsg = '登录超时,请重新登录!'
        Modal.warning({
          title: '提示',
          closable: false,
          content: '登录身份已失效，请重新登录!',
          positiveText: '确定',
          onPositiveClick: () => {
            storage.clear()
            router.replace({
              name: LoginName,
              // query: {
              //   redirect: router.currentRoute.value.fullPath,
              // },
            })
            window.location.reload()
            return true
          },
        })
        return
      }

      return res ? res.data : { code: '0', data: '' }
    }

    const reject = Promise.reject

    if (!data) {
      // return '[HTTP] Request has no return value';
      return reject(data)
    }

    // 请求成功
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    // 是否显示提示信息
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        // 是否显示自定义信息提示
        Message.success(successMessageText || message || '操作成功！')
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        // 是否显示自定义信息提示
        Message.error(message || errorMessageText || '操作失败！')
      } else if (!hasSuccess && options.errorMessageMode === 'modal') {
        // errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        Modal.info({
          title: '提示',
          content: message,
          positiveText: '确定',
          onPositiveClick: () => {},
        })
      }
    }
    // console.log('code', code)
    console.log('result', result)
    console.log('hasSuccess', hasSuccess)

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return result
    }
    // 接口请求错误，统一提示错误信息
    if (code === ResultEnum.ERROR && errCode !== '401') {
      if (message) {
        Message.error(data.msg)
        Promise.reject(new Error(message))
      } else {
        const msg = '操作失败,系统异常!'
        Message.error(msg)
        Promise.reject(new Error(msg))
      }
      return reject()
    }

    // 登录超时
    if (code === ResultEnum.TIMEOUT || errCode === '401') {
      const LoginName = PageEnum.BASE_LOGIN_NAME
      if (router.currentRoute.value.name === LoginName) return
      // 到登录页
      // const timeoutMsg = '登录超时,请重新登录!'
      Modal.warning({
        title: '提示',
        closable: false,
        content: '登录身份已失效，请重新登录!',
        positiveText: '确定',
        onPositiveClick: () => {
          storage.clear()
          router.replace({
            name: LoginName,
            // query: {
            //   redirect: router.currentRoute.value.fullPath,
            // },
          })
          window.location.reload()
          return true
        },
      })
      return false
    }
    // 这里逻辑可以根据项目进行修改
    if (!hasSuccess) {
      return Promise.reject(new Error(message))
    }

    return result
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      if (!config.url?.includes('http')) {
        config.url = `${apiUrl}${config.url}`
      }
    }
    const params = config.params || {}
    const data = config.data || false
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else if (!isString(params)) {
      formatDate && formatRequestDate(params)
      if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length) {
        config.data = data
        config.params = params
      } else {
        config.data = params
        config.params = undefined
      }
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(config.url as string, { ...config.params, ...config.data })
      }
    } else {
      // 兼容restful风格
      config.url += params
      config.params = undefined
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config: any) => {
    // 请求之前处理config
    const userStore = useUserStoreWidthOut()
    const token = userStore.getToken
    if (token) {
      // jwt token
      config.headers.Authorization = token
      config.headers['Accept-Language'] = 'zh-CN'
    }
    return config
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $message: Message, $dialog: Modal } = window
    const { response, code, message } = error || {}
    console.log('error', error)
    // TODO 此处要根据后端接口返回格式修改
    const msg: string = response && response.data && response.data.message ? response.data.message : ''
    const err: string = error.toString()
    console.log('err', err)

    const createMessage = () => {
      if (messageReactive) {
        removeMessage()
        console.log('0000000000')
      }
      messageReactive = Message.warning('网络异常,请检查您的网络连接是否正常!', {
        duration: 2000,
      })
    }
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        Message.error('接口请求超时,请刷新页面重试!')
        return
      }
      console.log('123123131231232')
      if (err && err.includes('Network Error')) {
        // Modal.info({
        //   title: '网络异常',
        //   content: '请检查您的网络连接是否正常!',
        //   positiveText: '确定',
        //   onPositiveClick: () => {},
        // })
        createMessage()
        return
      }
    } catch (error: any) {
      throw new Error(error)
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error)
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg)
    } else {
      console.warn(error, '请求被取消！')
    }
    return error
  },
}

const Axios = new VAxios({
  timeout: 10 * 1000,
  // 接口前缀
  prefixUrl: urlPrefix,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  // 数据处理方式
  transform,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 默认将prefix 添加到url
    joinPrefix: true,
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 格式化提交参数时间
    formatDate: true,
    // 消息提示类型
    errorMessageMode: 'none',
    // 接口地址
    apiUrl: globSetting.apiUrl as string,
  },
  withCredentials: false,
})

export default Axios
