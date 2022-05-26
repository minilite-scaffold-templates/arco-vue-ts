import { NAV_THEME, NAV_MODE, LAYOUT_WIDTH } from '@/enums/pageEnum'

// 状态栏高度选项列表
export interface IHeaderHeightOption {
  text: string
  value: string
  cssValue: string
}
export const headerHeightOptions: IHeaderHeightOption[] = [
  {
    text: '小',
    value: 'h-12',
    cssValue: '3rem',
  },
  {
    text: '中',
    value: 'h-16',
    cssValue: '4rem',
  },
  {
    text: '大',
    value: 'h-20',
    cssValue: '5rem',
  },
]

const setting = {
  breadcrumbHeight: 40,
  footerHeight: 41,

  logoSize: 28,

  // 导航模式
  navMode: NAV_MODE.LEFT,
  // 导航主题
  navTheme: NAV_THEME.LIGHT,
  // 布局宽度
  layoutWidth: LAYOUT_WIDTH.FLUID,
  // 默认的工具图标大小
  toolIconSize: 18,

  // 状态栏高度
  headerHeightOptions,
  headerHeight: headerHeightOptions[1],

  // 是否显示页脚
  footerDisplay: true,

  // 菜单权限模式 FIXED 前端固定路由  BACK 动态获取
  permissionMode: 'FIXED',
}
export default setting
