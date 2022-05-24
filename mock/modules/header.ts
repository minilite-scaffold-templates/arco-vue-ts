import { resultSuccess } from 'mock/_util'
import { MockMethod } from 'vite-plugin-mock'

// 获取消息列表
const getMessageList = {
  url: '/api/auth/layout/header/message',
  timeout: 1000,
  method: 'post',
  response: () => {
    return resultSuccess([
      {
        id: 1,
        status: 3,
        detail: '您的2022-05-19加班申请已被驳回',
        time: '2022-05-14',
        title: '通知',
        subTitle: '申请',
      },
      {
        id: 2,
        status: 2,
        detail: '您的2022-05-21出差申请已通过',
        time: '2022-05-22',
        title: '通知',
        subTitle: '申请',
      },
      {
        id: 3,
        status: 3,
        detail: '有一条来自王权富贵的2022-05-24请假申请待您审批',
        time: '2022-05-24',
        title: '通知',
        subTitle: '申请',
      },
    ])
  },
}

export default [getMessageList] as MockMethod[]
