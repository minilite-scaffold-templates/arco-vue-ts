// 页面枚举类型
export enum PageEnum {
  // 登录
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',

  // 重定向
  REDIRECT = '/redirect',
  REDIRECT_NAME = 'Redirect',

  // 首页
  BASE_HOME = '/dashboard',
  // 首页跳转默认路由
  BASE_HOME_REDIRECT = '/dashboard/index',

  // 错误
  ERROR_PAGE_NAME = 'ErrorPage',
}

export enum FIXED_STYLE {
  ABSOLUTE = 'absolute',
  STATIC = 'static',
}

// 导航模式: 居左，居右和顶部水平
export enum NAV_MODE {
  LEFT = 'left',
  RIGHT = 'right',
  HORIZONTAL = 'horizontal',
}

// 导航主题风格: 仅有两种: 浅色 和 深色
export enum NAV_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

// 布局宽度
export enum LAYOUT_WIDTH {
  FLUID = 'fluid',
  BOXED = 'boxed',
}

// 菜单布局
export enum MENU_MODE {
  POP = 'pop',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  POPBUTTON = 'popButton',
  UNDEFINED = 'undefined',
}
