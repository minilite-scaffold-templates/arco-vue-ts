<script lang="tsx">
  import { compile, defineComponent, ref, h } from 'vue'
  import { RouteRecordRaw, useRouter } from 'vue-router'
  import { listenerRouteChange } from '@/router/listener'
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

      // const route = useRoute()

      const router = useRouter()
      const { menuTree } = useMenuTree()

      const selectedKey = ref<string[]>([])

      const goto = (item: RouteRecordRaw) => {
        router.push({
          name: item.name,
        })
      }

      // 监听当前路由变化
      // watch(route, (val) => {
      //   console.log('开始监听')
      //   if (val.meta.requiresAuth && !val.meta.hideInMenu) {
      //     const key = val.matched[val.matched.length - 1]?.name as string
      //     selectedKey.value = [key]

      //     // 更新menu
      //   }
      // })

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
        <a-menu mode={props.mode} class="m-auto" auto-open={true} selected-keys={selectedKey.value}>
          {renderSubMenu()}
        </a-menu>
      )
    },
  })
</script>

<style lang="less"></style>
