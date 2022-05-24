<template>
  <section class="fixed bottom-16 right-10 z-1">
    <div
      class="rounded-full bg-primary text-white w-10 h-10 flex justify-center items-center cursor-pointer"
      @click="openCustomizeThemeSettingDrawer"
    >
      <icon-settings class="setting-icon-rotate" :size="20" />
    </div>
  </section>

  <a-drawer
    :width="420"
    :footer="false"
    :unmount-on-close="false"
    :visible="visible"
    :mask-closable="true"
    @cancel="close"
  >
    <template #title> 自定义主题设置 </template>
    <section class="p-2 space-y-7">
      <!-- 布局方式 -->
      <section class="space-y-3">
        <div>
          <div class="font-bold">菜单布局方式 </div>
          <div class="text-xs text-gray-500"> 选择: 居左、居右 或 水平</div>
        </div>
        <div>
          <a-grid :cols="3" :col-gap="16" :row-gap="16">
            <a-grid-item
              v-for="(i, index) in navModeList"
              :key="index"
              class="space-y-1 cursor-pointer relative"
              @click="selectNavMode(i)"
            >
              <div
                :class="i === activeNavMode ? 'border-primary' : 'border-gray-200'"
                class="w-full border h-20 rounded flex flex justify-center items-center"
              >
                <p></p>
              </div>
              <p class="text-center font-bold">{{ i }}</p>
              <div v-if="i === activeNavMode" class="absolute w-5 h-5 right-1 top-0 text-primary">
                <icon-check-circle-fill :size="16" />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
      </section>

      <!-- 颜色主题 -->
      <section class="space-y-3">
        <div>
          <div class="font-bold">颜色主题 </div>
          <div class="text-xs text-gray-500"> 选择: light 或 dark</div>
        </div>
        <div>
          <a-grid :cols="3" :col-gap="16" :row-gap="16">
            <a-grid-item
              v-for="(i, index) in navThemeList"
              :key="index"
              class="space-y-1 cursor-pointer relative"
              @click="selectNavTheme(i)"
            >
              <div
                :class="i === activeNavTheme ? 'border-primary' : 'border-gray-200'"
                class="w-full border h-20 rounded flex flex justify-center items-center"
              >
                <p></p>
              </div>
              <p class="text-center font-bold">{{ i }}</p>
              <div v-if="i === activeNavTheme" class="absolute w-5 h-5 right-1 top-0 text-primary">
                <icon-check-circle-fill :size="16" />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
      </section>

      <!-- 布局宽度 -->
      <section class="space-y-3">
        <div>
          <div class="font-bold">布局宽度 </div>
          <div class="text-xs text-gray-500"> 选择: fluid 或 boxed</div>
        </div>
        <div>
          <a-grid :cols="3" :col-gap="16" :row-gap="16">
            <a-grid-item
              v-for="(i, index) in layoutWidthList"
              :key="index"
              class="space-y-1 cursor-pointer relative"
              @click="selectLayoutWidth(i)"
            >
              <div
                :class="i === activeLayoutWidth ? 'border-primary' : 'border-gray-200'"
                class="w-full border h-20 rounded flex flex justify-center items-center"
              >
                <p></p>
              </div>
              <p class="text-center font-bold">{{ i }}</p>
              <div v-if="i === activeLayoutWidth" class="absolute w-5 h-5 right-1 top-0 text-primary">
                <icon-check-circle-fill :size="16" />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
      </section>
    </section>
  </a-drawer>
</template>

<script lang="ts" setup name="UserProfile">
  import { ComputedRef, ref } from 'vue'
  import { LAYOUT_WIDTH, NAV_THEME, NAV_MODE } from '@/enums/pageEnum'
  import useProjectSettingStore from '@/store/modules/projectSetting'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'

  const navModeList = ref(Object.values(NAV_MODE))
  const layoutWidthList = ref(Object.values(LAYOUT_WIDTH))
  const navThemeList = ref(Object.values(NAV_THEME))

  const { getLayoutWidth, getNavTheme, getNavMode } = useProjectSetting()

  const navMode = ref<ComputedRef<NAV_MODE>>(getNavMode)
  const navTheme = ref<ComputedRef<NAV_THEME>>(getNavTheme)
  const layoutWidth = ref<ComputedRef<LAYOUT_WIDTH>>(getLayoutWidth)

  const projectSettingStore = useProjectSettingStore()

  const visible = ref(false)

  const openCustomizeThemeSettingDrawer = () => {
    visible.value = true
  }

  // 设置布局方式
  const activeNavMode = ref<NAV_MODE>(navMode.value)
  const selectNavMode = (item: NAV_MODE) => {
    activeNavMode.value = item
    projectSettingStore.setNavMode(item)
  }

  // 设置布局宽度
  const activeLayoutWidth = ref<LAYOUT_WIDTH>(layoutWidth.value)
  const selectLayoutWidth = (item: LAYOUT_WIDTH) => {
    activeLayoutWidth.value = item
    projectSettingStore.setLayoutWidth(item)
  }

  // 设置颜色主题
  const activeNavTheme = ref<NAV_THEME>(navTheme.value)
  const selectNavTheme = (item: NAV_THEME) => {
    activeNavTheme.value = item
    projectSettingStore.setNavTheme(item)
  }

  const close = () => {
    visible.value = false
  }
</script>

<style scoped lang="less">
  .setting-icon-rotate {
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
