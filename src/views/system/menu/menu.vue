<template>
  <div class="p-4">
    <div>
      <a-card :bordered="false" title="菜单权限管理"> 页面数据为 Mock 示例数据，非真实数据。 </a-card>
    </div>
    <a-grid class="mt-4" :cols="3" :col-gap="12">
      <a-grid-item :span="1">
        <a-card :bordered="false" size="small">
          <template #title>
            <a-space>
              <a-dropdown trigger="hover" @select="selectAddMenu">
                <a-button ghost type="primary">
                  <icon-down />
                  添加菜单
                </a-button>
                <template #content>
                  <a-doption
                    :value="{
                      label: '添加顶级菜单',
                      key: 'home',
                      value: 'home',
                      disabled: false,
                    }"
                    >添加顶级菜单</a-doption
                  >
                  <a-doption
                    :value="{
                      label: '添加子菜单',
                      key: 'son',
                      value: 'son',
                      disabled: isAddSon,
                    }"
                    >添加子菜单</a-doption
                  >
                </template>
              </a-dropdown>
              <a-button ghost type="primary" @click="packHandle">
                <icon-list />
                全部{{ expandedKeys.length ? '收起' : '展开' }}
              </a-button>
            </a-space>
          </template>
          <div class="w-full menu">
            <a-input v-model:value="pattern" placeholder="输入菜单名称搜索">
              <template #suffix>
                <a-icon size="18" class="cursor-pointer">
                  <icon-search />
                </a-icon>
              </template>
            </a-input>
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <a-spin :size="10" />
                </div>
              </template>
              <template v-else>
                <a-tree
                  :checkable="true"
                  block-node
                  draggable
                  animation
                  default-expand-all
                  :data="treeData"
                  :expanded-keys="expandedKeys"
                  style="max-height: 650px; overflow: hidden"
                  @select="selectedTree"
                  @expand="onExpandedKeys"
                />
              </template>
            </div>
          </div>
        </a-card>
      </a-grid-item>
      <a-grid-item :span="2">
        <a-card :segmented="{ content: 'hard' }" :bordered="false" size="small">
          <template #title>
            <a-space>
              <a-icon size="18">
                <icon-edit />
              </a-icon>
              <span>编辑菜单{{ treeItemTitle ? `：${treeItemTitle}` : '' }}</span>
            </a-space>
          </template>
          <a-alert type="info" closable> 从菜单列表选择一项后，进行编辑</a-alert>
          <a-form
            v-if="isEditMenu"
            ref="formRef"
            :model="formParams"
            :rules="rules"
            label-placement="left"
            :label-width="100"
            class="py-4"
          >
            <a-form-item label="类型" path="type">
              <span>{{ formParams.type === 1 ? '侧边栏菜单' : '' }}</span>
            </a-form-item>
            <a-form-item label="标题" path="label">
              <a-input v-model:value="formParams.title" placeholder="请输入标题" />
            </a-form-item>
            <a-form-item label="副标题" path="subtitle">
              <a-input v-model:value="formParams.subtitle" placeholder="请输入副标题" />
            </a-form-item>
            <a-form-item label="路径" path="path">
              <a-input v-model:value="formParams.path" placeholder="请输入路径" />
            </a-form-item>
            <a-form-item label="打开方式" path="openType">
              <a-radio-group v-model:value="formParams.openType" name="openType">
                <a-space>
                  <a-radio :value="1">当前窗口</a-radio>
                  <a-radio :value="2">新窗口</a-radio>
                </a-space>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="菜单权限" path="auth">
              <a-input v-model:value="formParams.auth" placeholder="请输入权限，多个权限用，分割" />
            </a-form-item>
            <a-form-item path="auth" style="margin-left: 100px">
              <a-space>
                <a-button type="primary" :loading="subLoading" @click="formSubmit">保存修改</a-button>
                <a-button @click="handleReset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-card>
      </a-grid-item>
    </a-grid>
    <CreateDrawer ref="createDrawerRef" :title="drawerTitle" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive, onMounted, computed } from 'vue'
  import { getMenuList } from '@/api/system/menu'
  import { getTreeItem } from '@/utils'
  import { Message } from '@arco-design/web-vue'
  import CreateDrawer from './CreateDrawer.vue'

  const rules = {
    label: {
      required: true,
      message: '请输入标题',
      trigger: 'blur',
    },
    path: {
      required: true,
      message: '请输入路径',
      trigger: 'blur',
    },
  }

  const formRef: any = ref(null)
  const createDrawerRef = ref()
  const treeItemKey = ref([])

  const expandedKeys = ref([])

  const treeData = ref([])

  const loading = ref(true)
  const subLoading = ref(false)
  const isEditMenu = ref(false)
  const treeItemTitle = ref('')
  const pattern = ref('')
  const drawerTitle = ref('')

  const isAddSon = computed(() => {
    return !treeItemKey.value.length
  })

  const formParams = reactive({
    type: 1,
    title: '',
    subtitle: '',
    path: '',
    auth: '',
    openType: 1,
  })

  function openCreateDrawer() {
    const { openDrawer } = createDrawerRef.value
    openDrawer()
  }

  function selectAddMenu(key: string) {
    drawerTitle.value = key === 'home' ? '添加顶栏菜单' : `添加子菜单：${treeItemTitle.value}`
    openCreateDrawer()
  }

  function selectedTree(keys) {
    if (keys.length) {
      const treeItem = getTreeItem(unref(treeData), keys[0])
      treeItemKey.value = keys
      treeItemTitle.value = treeItem.title
      Object.assign(formParams, treeItem)
      isEditMenu.value = true
    } else {
      isEditMenu.value = false
      treeItemKey.value = []
      treeItemTitle.value = ''
    }
  }

  function handleReset() {
    const treeItem = getTreeItem(unref(treeData), treeItemKey.value[0])
    Object.assign(formParams, treeItem)
  }

  function formSubmit() {
    formRef.value.validate((errors: boolean) => {
      if (!errors) {
        Message.error('抱歉，您没有该权限')
      } else {
        Message.error('请填写完整信息')
      }
    })
  }

  function packHandle() {
    if (expandedKeys.value.length) {
      expandedKeys.value = []
    } else {
      expandedKeys.value = unref(treeData).map((item: any) => item.key as string) as []
    }
  }

  onMounted(async () => {
    const treeMenuList = await getMenuList()
    const keys = treeMenuList.list.map((item: any) => item.key)
    Object.assign(formParams, keys)
    treeData.value = treeMenuList.list
    loading.value = false
  })

  function onExpandedKeys(keys) {
    expandedKeys.value = keys
  }
</script>
