<script lang="tsx">
  import { compile, defineComponent, ref, h } from 'vue'
  import { listenerRouteChange } from '@/router/listener'
  import { RouteRecordRaw, useRouter } from 'vue-router'
  import useMenuTree from './useMenuTree'

  export default defineComponent({
    props: {
      collapsed: {
        type: Boolean,
        default: false,
      },
      mode: {
        type: String,
      },
    },
    setup(props) {
      console.log('props', props)

      const router = useRouter()

      const { menuTree } = useMenuTree()

      const selectedKey = ref<string[]>([])

      const goto = (item: RouteRecordRaw) => {
        router.push({ name: item.name })
      }

      listenerRouteChange((newRoute) => {
        if (newRoute.meta.requiresAuth && !newRoute.meta.hideInMenu) {
          const key = newRoute.matched[newRoute.matched.length - 1]?.name as string
          selectedKey.value = [key]
        }
      }, true)

      // 根据渲染菜单树
      const renderSubMenu = () => {
        function travel(_routes: RouteRecordRaw[], nodes = []) {
          _routes &&
            _routes.forEach((element: RouteRecordRaw) => {
              const icon = element?.meta?.icon ? () => h(compile(`<${element?.meta?.icon}/>`)) : null

              const node =
                element?.children && element?.children.length !== 0 ? (
                  <a-sub-menu
                    class=""
                    key={element?.name}
                    v-slots={{
                      icon,
                      title: () => element?.meta?.title,
                    }}
                  >
                    {travel(element?.children)}
                  </a-sub-menu>
                ) : (
                  <a-menu-item
                    key={element?.name}
                    class="w-full m-auto "
                    v-slots={{ icon }}
                    onClick={() => goto(element)}
                  >
                    {element?.meta?.title}
                  </a-menu-item>
                )

              nodes.push(node as never)
            })

          return nodes
        }

        return travel(menuTree.value)
      }

      return () => (
        <a-menu mode={props.mode} class="m-auto" level-indent={30} auto-open={true} selected-keys={selectedKey.value}>
          {renderSubMenu()}
        </a-menu>
      )
    },
  })
</script>

<style lang="less">
  .arco-menu-dark .arco-menu-inline-header.arco-menu-selected {
    color: #fff;
    .arco-icon {
      color: #fff;
    }
  }
  // .arco-menu-dark .arco-menu-inline-header.arco-menu-selected .arco-icon {
  //   color: #fff;
  // }
</style>
