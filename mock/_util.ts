import type { Result } from '/#/http'

/**
 * 请求成功的返回类型
 * @param data
 * @param param1
 * @returns
 */
export function resultSuccess<T = Recordable>(data: T, { msg = 'ok' } = {}): Result<T> {
  return {
    code: 1,
    data,
    msg,
    type: 'success',
  }
}

/**
 * 请求分页数据的返回类型
 * @param page
 * @param pageSize
 * @param list
 * @param param3
 * @returns
 */
export function resultPageSuccess<T>(page: number, pageSize: number, list: T[], { msg = 'ok' } = {}) {
  return {
    ...resultSuccess({
      page,
      pageSize,
      list,
    }),
    msg,
  }
}

/**
 * 请求失败的返回类型
 * @param message
 * @param param1
 * @returns
 */
export function resultError(msg: 'Request failed', { code = 0, data = null } = {}): Result<null> {
  return {
    code,
    data,
    msg,
    type: 'error',
  }
}

/**
 * 从 list 中截取分页数据
 * @param page
 * @param pageSize
 * @param list
 * @returns
 */
export function pagination<T>(page: number, pageSize: number, list: T[]): T[] {
  const offset = (page - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(pageSize))
  return ret
}

/**
 * 请求参数类型
 */
export interface requestParams {
  method: string
  timeout?: number
  body: any
  headers?: { token?: string }
  query: any
}

/**
 * 本函数用于从request数据中获取token，请根据项目的实际情况修改
 * @param {headers:{token?:string}}
 * @returns {string|undefined}
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.token
}
