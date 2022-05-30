<template>
  <a-drawer v-model:show="isDrawer" :width="width" placement="right">
    <a-drawer-content :title="title" closable>
      <a-form ref="formRef" :model="formParams" :rules="rules" label-placement="left" :label-width="100">
        <a-form-item label="类型" path="type">
          <span>{{ formParams.type === 1 ? '侧边栏菜单' : '' }}</span>
        </a-form-item>
        <a-form-item label="标题" path="label">
          <a-input v-model:value="formParams.label" placeholder="请输入标题" />
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
        <a-form-item label="隐藏侧边栏" path="hidden">
          <a-switch v-model:value="formParams.hidden" />
        </a-form-item>
      </a-form>

      <template #footer>
        <a-space>
          <a-button type="primary" :loading="subLoading" @click="formSubmit">提交</a-button>
          <a-button @click="handleReset">重置</a-button>
        </a-space>
      </template>
    </a-drawer-content>
  </a-drawer>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue'
  import { Message } from '@arco-design/web-vue'

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
  export default defineComponent({
    name: 'CreateDrawer',
    components: {},
    props: {
      title: {
        type: String,
        default: '添加顶级菜单',
      },
      width: {
        type: Number,
        default: 450,
      },
    },
    setup() {
      const formRef: any = ref(null)
      const defaultValueRef = () => ({
        label: '',
        type: 1,
        subtitle: '',
        openType: 1,
        auth: '',
        path: '',
        hidden: false,
      })

      const state = reactive({
        isDrawer: false,
        subLoading: false,
        formParams: defaultValueRef(),
        placement: 'right',
        alertText:
          '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。',
      })

      function openDrawer() {
        state.isDrawer = true
      }

      function closeDrawer() {
        state.isDrawer = false
      }

      function handleReset() {
        formRef.value.restoreValidation()
        state.formParams = Object.assign(state.formParams, defaultValueRef())
      }

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            Message.success('添加成功')
            handleReset()
            closeDrawer()
          } else {
            Message.error('请填写完整信息')
          }
        })
      }

      return {
        ...toRefs(state),
        formRef,
        rules,
        formSubmit,
        handleReset,
        openDrawer,
        closeDrawer,
      }
    },
  })
</script>
