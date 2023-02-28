<template>
  <div class="main-nav">
    <el-menu
      active-text-color="#40a070"
      background-color="#5d3d21"
      class="el-menu-vertical-demo"
      :default-active="router.currentRoute.value.path"
      text-color="#fff"
      :router="true"
    >
      <template v-for="(item, id) in nav" :key="id">
        <el-menu-item
          :index="item.route"
          :route="{ path: item.route, query: { fruitType: item.title } }"
        >
          <el-icon><setting /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'

import useStore from '@/store'

import { INavType } from './type'

export default defineComponent({
  components: {
    ElIcon,
    ElMenu,
    ElMenuItem,
    Setting
  },
  setup() {
    const router = useRouter()

    // 导航条内容
    const nav = reactive<INavType[]>([
      {
        id: 1,
        title: '全部',
        route: '/home/'
      },
      {
        id: 2,
        title: '浆果类',
        route: '/home/berries-content'
      },
      {
        id: 3,
        title: '瓜果类',
        route: '/home/melonsFruits-content'
      },
      {
        id: 4,
        title: '橘果类',
        route: '/home/citrus-content'
      },
      {
        id: 5,
        title: '核果类',
        route: '/home/nutFrupes-content'
      },
      {
        id: 6,
        title: '仁果类',
        route: '/home/tropicalFruits-content'
      }
    ])

    // 监听store 数据变化（切换导航条）
    watch(
      // 监听路由参数 fruitType 的值
      () => router.currentRoute.value.query,
      (newTypeValue) => {
        // 路由参数 == '全部' 或没有参数(空对象)
        if (newTypeValue?.fruitType === '全部' || JSON.stringify(newTypeValue) == '{}')
          useStore.dispatch('getFruitAllTypeInfo')
        else
          useStore.dispatch('getFruitAllTypeInfo', { pageNumber: 1, pageSize: 20, ...newTypeValue })
      },
      // 默认执行一次，刷新也会执行请求数据
      { immediate: true }
    )

    return { router, nav }
  }
})
</script>

<style scoped lang="less">
.main-nav {
  background-color: #5d3d21;
  margin-bottom: 15px;
  opacity: 0.8;
  flex: 100;
  .el-menu {
    // 去掉自带的右侧边框
    border: 0;
  }
}
</style>
