/*
 * @Author: your name
 * @Date: 2021-12-06 15:32:50
 * @LastEditTime: 2021-12-30 11:32:08
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \pc-financial-intelligence-admin\src\utils\http\axios\types.ts
 */
import { AxiosRequestConfig } from 'axios'
import { AxiosTransform } from '../src/utils/http/axios'

export interface RequestOptions {
  // 请求参数拼接到url
  joinParamsToUrl?: boolean
  // 格式化请求参数时间
  formatDate?: boolean
  // 是否显示提示信息
  isShowMessage?: boolean
  // 是否解析成JSON
  isParseToJson?: boolean
  // 成功的文本信息
  successMessageText?: string
  // 是否显示成功信息
  isShowSuccessMessage?: boolean
  // 是否显示失败信息
  isShowErrorMessage?: boolean
  // 错误的文本信息
  errorMessageText?: string
  // 是否加入url
  joinPrefix?: boolean
  // 接口地址， 不填则使用默认apiUrl
  apiUrl?: string
  // 错误消息提示类型
  errorMessageMode?: 'none' | 'modal'
  // 是否添加时间戳
  joinTime?: boolean
  // 不进行任何处理，直接返回
  isTransformResponse?: boolean
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean
}
export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export interface Result<T = any> {
  code: string | number
  type?: 'success' | 'error' | 'warning'
  msg: string
  data?: T
  errCode?: string | number
}
