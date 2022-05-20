export interface Result<T = any> {
  code: string | number
  type?: 'success' | 'error' | 'warning'
  msg: string
  data?: T
  errCode?: string | number
}
