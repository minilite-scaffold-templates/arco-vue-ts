// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import axios, { AxiosResponse } from 'axios'
import { useGlobSetting } from '@/hooks/setting'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum'
import { isString } from '@/utils/is/'
import { setObjToUrlParams } from '@/utils/urlUtils'
import { AxiosTransform } from './axiosTransform'
import { VAxios } from './Axios'
import { checkStatus } from './checkStatus'
import { joinTimestamp, formatRequestDate } from './helper'
import { Result } from '/#/http'
import { RequestOptions } from './types'

const globSetting = useGlobSetting()
const urlPrefix = globSetting.urlPrefix || ''

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

    const { isShowMessage = true, isShowErrorMessage, isShowSuccessMessage, successMessageText, errorMessageText, isReturnNativeResponse } = options

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }

    const { data } = res

    //  这里 code，data，msg为 后台统一的字段，需要在 types/http.d.ts内修改为项目自己的接口返回格式
    const { code, data: result, msg, errCode } = data

    const { reject } = Promise

    if (!data) {
      return reject(data)
    }

    // 请求成功
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    // 是否显示提示信息
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        // 是否显示自定义信息提示
        Message.success(successMessageText || msg || '操作成功！')
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        // 是否显示自定义信息提示
        Message.error(msg || errorMessageText || '操作失败！')
      } else if (!hasSuccess && options.errorMessageMode === 'modal') {
        // errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        Modal.info({
          title: '提示',
          content: msg,
          okText: '确定',
          ok: () => {},
        })
      }
    }

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return result
    }
    // 接口请求错误，统一提示错误信息
    if (code === ResultEnum.ERROR && errCode !== '401') {
      if (msg) {
        Message.error(data.msg)
        Promise.reject(new Error(msg))
      } else {
        const msg = '操作失败,系统异常!'
        Message.error(msg)
        Promise.reject(new Error(msg))
      }
      return reject()
    }

    // 这里逻辑可以根据项目进行修改
    if (!hasSuccess) {
      return reject(new Error(msg))
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
      if (config.url?.includes('http')) {
        // eslint-disable-next-line no-self-assign
        config.url = config.url
      } else {
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
        config.url = `${config.url} + ${params}+${joinTimestamp(joinTime, true)}`
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
  requestInterceptors: (config) => {
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

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        Message.error('接口请求超时,请刷新页面重试!')
        return
      }
      if (err && err.includes('Network Error')) {
        Modal.info({
          title: '网络异常',
          content: '请检查您的网络连接是否正常!',
          positiveText: '确定',
          onPositiveClick: () => {},
        })
        // createMessage()
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
