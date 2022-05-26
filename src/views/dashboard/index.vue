<template>
  <a-grid :cols="{ xs: 1, sm: 2, md: 2, lg: 5 }">
    <a-grid-item :span="{ xs: 1, sm: 2, md: 2, lg: 4 }">
      <div class="p-5 space-y-5">
        <Welcome />
        <a-grid :cols="{ xs: 1, sm: 2, md: 4 }" :col-gap="16" :row-gap="16">
          <a-grid-item :span="1">
            <div class="p-5 border border-gray-100 bg-white space-y-3 rounded-md bg-success">
              <div class="text-gray-700"> 今日访问</div>
              <div class="flex flex-row justify-between items-center">
                <div class="space-y-2">
                  <div class="font-semibold text-2xl"> 11,267 </div>
                  <div>
                    <a-link :hoverable="false">查看详情</a-link>
                  </div>
                </div>

                <div class="rounded-lg bg-gray-100 p-3">
                  <a-typography-text type="success">
                    <icon-eye :size="30" />
                  </a-typography-text>
                </div>
              </div>
            </div>
          </a-grid-item>
          <a-grid-item :span="1">
            <div class="p-5 border border-gray-100 bg-white space-y-3 rounded-md">
              <div class="text-gray-700"> 今日入院</div>
              <div class="flex flex-row justify-between items-center">
                <div class="space-y-2">
                  <div class="font-semibold text-2xl"> 128 </div>
                  <div>
                    <a-link :hoverable="false">查看详情</a-link>
                  </div>
                </div>

                <div class="rounded-lg bg-gray-100 p-3">
                  <a-typography-text type="primary">
                    <icon-import :size="30" />
                  </a-typography-text>
                </div>
              </div>
            </div>
          </a-grid-item>
          <a-grid-item :span="1">
            <div class="p-5 border border-gray-100 bg-white space-y-3 rounded-md">
              <div class="text-gray-700"> 今日出院</div>
              <div class="flex flex-row justify-between items-center">
                <div class="space-y-2">
                  <div class="font-semibold text-2xl"> 11,267 </div>
                  <div>
                    <a-link :hoverable="false">查看详情</a-link>
                  </div>
                </div>

                <div class="rounded-lg bg-gray-100 p-3">
                  <a-typography-text type="warning">
                    <icon-export :size="30" />
                  </a-typography-text>
                </div>
              </div>
            </div>
          </a-grid-item>
          <a-grid-item :span="1">
            <div class="p-5 border border-gray-100 bg-white space-y-3 rounded-md">
              <div class="text-gray-700">总住院患者</div>
              <div class="flex flex-row justify-between items-center">
                <div class="space-y-2">
                  <div class="font-semibold text-2xl"> 11,267 </div>
                  <div>
                    <a-link :hoverable="false">查看详情</a-link>
                  </div>
                </div>

                <div class="rounded-lg bg-gray-100 p-3">
                  <a-typography-text>
                    <icon-layers :size="30" />
                  </a-typography-text>
                </div>
              </div>
            </div>
          </a-grid-item>
        </a-grid>
      </div>
    </a-grid-item>
    <a-grid-item :span="{ xs: 0, sm: 0, md: 0, lg: 1 }">
      <ContentSider>
        <template #body>
          <!-- News -->
          <section>
            <a-card :bordered="false" title="What's News?" class="news-card">
              <template #extra>
                <a-link>查看更多</a-link>
              </template>
              <a-list :bordered="false" size="small">
                <a-list-item>
                  <a-list-item-meta
                    title="Beijing Bytedance Technology Co., Ltd."
                    description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
                  >
                  </a-list-item-meta>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta
                    title="Beijing Bytedance Technology Co., Ltd."
                    description="Beijing ByteDance Technology Co., Ltd. is an enterprise located in China."
                  >
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-card>
          </section>
        </template>
      </ContentSider>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup name="DashboardIndex">
  import Welcome from '@/components/Welcome'
  import ContentSider from '@/components/ContentSider/index.vue'
</script>

<style scoped lang="less">
  .news-card :deep(.arco-card-header) {
    // border: none;
  }
  .overview-card :deep(.arco-card-header) {
    border: none;
  }
</style>
