const setting = {
  // 导航模式 left 左侧菜单模式 horizontal 顶部菜单模式
  navMode: 'left',
  // 导航风格 dark 暗色侧边栏 light 白色侧边栏 header-dark 暗色顶栏
  // navTheme: 'dark',
  navTheme: 'light',
  // 顶部
  headerSetting: {
    // 背景色
    bgColor: '#fff',
    // 固定顶部
    fixed: false,
    // 显示重载按钮
    isReload: true,
  },
  // 页脚
  showFooter: true,
  // 多标签
  multiTabsSetting: {
    // 背景色
    bgColor: '#fff',
    // 是否显示
    show: true,
    // 固定多标签
    fixed: true,
    cache: false,
  },

  // 工具图标
  toolIcon: {
    size: 18,
  },

  // 菜单
  menuSetting: {
    // 最小宽度
    minMenuWidth: 80,
    // 菜单宽度
    menuWidth: 200,
    // 固定菜单
    fixed: true,
    // 分割菜单
    mixMenu: false,

    collapsed: false,
  },
  // 面包屑
  breadCrumbSetting: {
    // 是否显示
    show: true,
    // 显示图标
    showIcon: false,
  },
  // 菜单权限模式 FIXED 前端固定路由  BACK 动态获取
  permissionMode: 'FIXED',
  // 是否开启路由动画
  isPageAnimate: true,
  // 路由动画类型
  pageAnimateType: 'zoom-fade',
}
export default setting
