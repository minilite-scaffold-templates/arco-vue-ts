export interface IBodySetting {
  fixed: boolean
}

export interface IHeaderSetting {
  bgColor?: string
  fixed?: boolean
  isReload?: boolean
}

export interface IMenuSetting {
  minMenuWidth: number
  menuWidth: number
  fixed: boolean
  mixMenu: boolean
  collapsed: boolean
}

export interface IBreadCrumbSetting {
  show: boolean
  showIcon: boolean
}

export interface IMultiTabsSetting {
  bgColor: string
  fixed: boolean
  show: boolean
}
export interface GlobConfig {
  title: string
  apiUrl: string
  shortName: string
  copyright: string
  logo: string
  qiniuDir: string
  urlPrefix?: string
  uploadUrl?: string
  prodMock: boolean
  imgUrl?: string
}

export interface GlobEnvConfig {
  // 标题
  VITE_GLOB_APP_TITLE: string
  // 接口地址
  VITE_GLOB_API_URL: string
  // 接口前缀
  VITE_GLOB_API_URL_PREFIX?: string
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string
  // Project copyright
  VITE_GLOB_COPYRIGHT: string
  // Logo
  VITE_GLOB_LOGO: string
  // qiniuDir
  VITE_GLOB_QINIU_DIR: string
  // 图片上传地址
  VITE_GLOB_UPLOAD_URL?: string
  // 图片前缀地址
  VITE_GLOB_IMG_URL?: string
  // 生产环境开启mock
  VITE_GLOB_PROD_MOCK: boolean
}

export interface ProjectSettingState {
  // 导航模式
  navMode: string
  // 导航风格
  navTheme: string
  // 顶部设置
  headerSetting: IHeaderSetting
  // 页脚
  showFooter: boolean
  // 菜单设置
  menuSetting: IMenuSetting
  // 多标签
  multiTabsSetting: IMultiTabsSetting
  // 权限模式
  permissionMode: string
  // 面包屑设置
  breadCrumbSetting: IBreadCrumbSetting
  // 是否开启路由动画
  isPageAnimate: boolean
  // 动画类型
  pageAnimateType
}
