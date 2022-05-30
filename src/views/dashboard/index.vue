<template>
  <a-grid :cols="{ xs: 1, sm: 2, md: 2, lg: 5 }">
    <a-grid-item :span="{ xs: 1, sm: 2, md: 2, lg: 4 }">
      <div class="p-5 space-y-5">
        <Welcome />
        <OverviewCardList :data-list="dataList" />
        <div class="bg-white p-5">
          <Markdown :source="Readme" />
        </div>
      </div>
    </a-grid-item>
    <a-grid-item :span="{ xs: 0, sm: 0, md: 0, lg: 1 }">
      <ContentSider>
        <template #body>
          <section class="p-5 space-y-5">
            <!-- News -->
            <ListInCard title="新药列表" :data-list="newsList" />

            <!-- Members -->
            <ListInCard title="最近活跃用户" :data-list="memberList" />
          </section>
        </template>
      </ContentSider>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup name="DashboardIndex">
  import { ref } from 'vue'
  import Markdown from 'vue3-markdown-it'
  import Welcome from '@/components/Welcome'
  import ContentSider from '@/components/ContentSider/index.vue'
  import OverviewCardList from '@/components/Overview/CardList.vue'
  import ListInCard from '@/components/Overview/ListInCard.vue'
  import Readme from '@/utils/loadReadMe'

  const dataList = ref<any>([
    {
      id: 1,
      name: '今日访问',
      type: 'success',
      path: '/',
      data: 1895,
      icon: 'icon-eye',
      iconSize: 28,
    },
    {
      id: 2,
      name: '今日入院',
      type: 'primary',
      path: '/',
      data: 128,
      icon: 'icon-import',
      iconSize: 28,
    },
    {
      id: 3,
      name: '今日出院',
      type: 'warning',
      path: '/',
      data: 89,
      icon: 'icon-export',
      iconSize: 28,
    },
    {
      id: 4,
      name: '总住院患者',
      type: 'secondary',
      path: '/',
      data: 681,
      icon: 'icon-layers',
      iconSize: 28,
    },
  ])

  const newsList = ref<any[]>([
    {
      id: 1,
      title: 'Fludeoxyglucose F18',
      description: 'Hepatobiliary System and Pancreas, Reattachment',
    },
    {
      id: 2,
      title: 'Alcohol',
      description: 'Bypass R Fem Art to Peron Art with Autol Vn, Open Approach',
    },
    // {
    //   id: 3,
    //   title: 'DOBUTAMINE HYDROCHLORIDE',
    //   description: 'Restrict L Com Iliac Art w Fenestr Dev 1 or 2, Perc Endo',
    // },
    // {
    //   id: 4,
    //   title: 'Fentanyl Citrate',
    //   description: 'Insertion of Pedcl Stabl Dev into T-lum Jt, Perc Approach',
    // },
    // {
    //   id: 5,
    //   title: 'Phytolacca decandra, Gnaphalium polycephalum',
    //   description: 'Release Left Frontal Bone, Percutaneous Approach',
    // },
  ])

  const memberList = ref<any[]>([
    {
      id: 1,
      title: 'Raymund',
      description: 'randrysek0@salon.com',
      avatar: 'https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg',
    },
    {
      id: 2,
      title: 'Alene',
      description: 'aliepmann1@time.com',
      avatar: 'https://themesbrand.com/velzon/html/default/assets/images/users/avatar-2.jpg',
    },
    {
      id: 3,
      title: 'Lenee',
      description: 'lschwandt2@livejournal.com',
      avatar: 'https://themesbrand.com/velzon/html/default/assets/images/users/avatar-3.jpg',
    },
    {
      id: 4,
      title: 'Hermann',
      description: 'hhynam3@gnu.org',
      avatar: 'https://themesbrand.com/velzon/html/default/assets/images/users/avatar-4.jpg',
    },
    {
      id: 5,
      title: 'Candie',
      description: 'cshapiro4@stumbleupon.com',
      avatar: 'https://themesbrand.com/velzon/html/default/assets/images/users/avatar-6.jpg',
    },
  ])
</script>

<style scoped lang="less">
  .news-card :deep(.arco-card-header) {
    // border: none;
  }
  .overview-card :deep(.arco-card-header) {
    // border: none;
  }
</style>
