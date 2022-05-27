<template>
  <!--消息弹窗-->
  <div>
    <a-popover v-model="notificationParam.popoverVisible" position="bottom" trigger="click">
      <div class="cursor-pointer">
        <a-badge :count="notificationParam.count" dot>
          <icon-notification :size="toolIconSize" @click="openMessageBox" /> </a-badge
      ></div>

      <template #content>
        <a-spin :loading="notificationParam.loading" tip="加载中"
          ><div class="min-w-80">
            <a-list v-if="notificationParam.messageList.length > 0" :bordered="false">
              <a-list-item
                v-for="item in notificationParam.messageList"
                :key="item.id"
                action-layout="vertical"
                :style="{
                  opacity: item.status ? 0.5 : 1,
                }"
              >
                <template #extra>
                  <a-tag v-if="item.status === 0" color="gray">未开始</a-tag>
                  <a-tag v-else-if="item.status === 1" color="green">已开通</a-tag>
                  <a-tag v-else-if="item.status === 2" color="blue">进行中</a-tag>
                  <a-tag v-else-if="item.status === 3" color="red">即将到期</a-tag>
                </template>
                <div class="item-wrap" @click="onItemClick(item)">
                  <a-list-item-meta>
                    <template #title>
                      <a-space :size="4">
                        <span>{{ item.title }}</span>
                        <a-typography-text type="secondary">
                          {{ item.subTitle }}
                        </a-typography-text>
                      </a-space>
                    </template>
                    <template #description>
                      <div>
                        <a-typography-paragraph>{{ item.detail }}</a-typography-paragraph>
                        <a-typography-text class="time-text">
                          {{ item.time }}
                        </a-typography-text>
                      </div>
                    </template>
                  </a-list-item-meta>
                </div>
              </a-list-item>
              <template #footer>
                <a-space fill :size="0" :class="{ 'add-border-top': notificationParam.messageList.length < showMax }">
                  <div class="footer-wrap">
                    <a-link>全部已读</a-link>
                  </div>
                  <div class="footer-wrap">
                    <a-link>查看更多</a-link>
                  </div>
                </a-space>
              </template>
              <div
                v-if="notificationParam.messageList.length && notificationParam.messageList.length < 3"
                :style="{ height: (showMax - notificationParam.messageList.length) * 86 + 'px' }"
              ></div>
            </a-list>
            <a-result v-if="!notificationParam.messageList.length" status="404">
              <template #subtitle> 暂无内容 </template>
            </a-result></div
          >
        </a-spin>
      </template>
    </a-popover>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ComputedRef, ref } from 'vue'
  import { getMessageList } from '@/api/auth/header'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'

  const { getToolIconSize } = useProjectSetting()
  const toolIconSize = ref<ComputedRef<number>>(getToolIconSize)

  interface MessageList {
    id: number
    status: number
    detail: ''
    title: ''
    subTitle: ''
    time: ''
  }
  interface NotificationParam {
    count: number // 消息数量
    popoverVisible: boolean
    messageList: MessageList[]
    loading: boolean
  }

  const showMax = 3
  const notificationParam = reactive<NotificationParam>({
    count: 9,
    popoverVisible: false,
    messageList: [],
    loading: false,
  })

  // 获取消息列表
  const queryMessageList = async () => {
    const result = await getMessageList()
    console.log(result)
    notificationParam.messageList = result.data.data
  }

  // 展示消息盒子
  const openMessageBox = async () => {
    notificationParam.loading = true
    queryMessageList()
    notificationParam.popoverVisible = true
    // 避免闪烁
    setTimeout(() => {
      notificationParam.loading = false
    }, 1000)
  }

  // 点击具体消息
  const onItemClick = async (item) => console.log(item)
</script>

<style scoped lang="less">
  :deep(.arco-list) {
    .arco-list-item {
      min-height: 86px;
      border-bottom: 1px solid rgb(var(--gray-3));
    }
    .arco-list-item-extra {
      position: absolute;
      right: 20px;
    }
    .arco-list-item-meta-content {
      flex: 1;
    }
    .item-wrap {
      cursor: pointer;
    }
    .time-text {
      font-size: 12px;
      color: rgb(var(--gray-6));
    }
    .arco-empty {
      display: none;
    }
    .arco-list-footer {
      padding: 0;
      height: 50px;
      line-height: 50px;
      border-top: none;
      .arco-space-item {
        width: 100%;
        border-right: 1px solid rgb(var(--gray-3));
        &:last-child {
          border-right: none;
        }
      }
      .add-border-top {
        border-top: 1px solid rgb(var(--gray-3));
      }
    }
    .footer-wrap {
      text-align: center;
    }
    .arco-typography {
      margin-bottom: 0;
    }
    .add-border {
      border-top: 1px solid rgb(var(--gray-3));
    }
  }
</style>
