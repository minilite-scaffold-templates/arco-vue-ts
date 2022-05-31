<template>
  <a-grid :cols="{ xs: 1, sm: 2, md: 2, lg: 4 }">
    <a-grid-item :span="{ xs: 1, sm: 2, md: 2, lg: 3 }">
      <div class="p-5 space-y-5 h-full bg-white">
        <Markdown :source="Readme" :plugins="mdPlugins" />
      </div>
    </a-grid-item>
    <a-grid-item :span="{ xs: 0, sm: 0, md: 0, lg: 1 }">
      <ContentSider>
        <template #body>
          <section class="space-y-5 p-5">
            <div>
              <a-list size="small" :bordered="false" :hoverable="true">
                <template #header> dependencies </template>
                <a-list-item v-for="i in depList" :key="i.name">
                  <div class="flex flex-row justify-between items-center">
                    <div>{{ i.name }}</div>
                    <div>{{ i.value }}</div>
                  </div>
                </a-list-item>
              </a-list>
            </div>
            <div>
              <a-list size="small" :bordered="false" :hoverable="true">
                <template #header> devDependencies </template>
                <a-list-item v-for="i in devDepList" :key="i.name">
                  <div class="flex flex-row justify-between items-center">
                    <div>{{ i.name }}</div>
                    <div>{{ i.value }}</div>
                  </div>
                </a-list-item>
              </a-list>
            </div>
          </section>
        </template>
      </ContentSider>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ContentSider from '@/components/ContentSider/index.vue'
  import Readme, { mdPlugins } from '@/utils/loadReadMe'
  import 'highlight.js/styles/monokai.css'
  import pkg from '@/utils/dependenciesList'

  import Markdown from 'vue3-markdown-it'

  const { dependencies, devDependencies } = Object.values(pkg)[0]

  const depList = ref(
    Object.keys(dependencies).map((i) => {
      return { name: i, value: dependencies[i] }
    })
  )
  const devDepList = ref(
    Object.keys(devDependencies).map((i) => {
      return { name: i, value: devDependencies[i] }
    })
  )
</script>

<style scoped lang="less"></style>
