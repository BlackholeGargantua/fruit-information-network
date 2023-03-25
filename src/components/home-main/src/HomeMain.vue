<template>
  <div class="home-main-swiper-all" :class="[showSwiper ? 'home-main-swiper' : 'home-main']">
    <div class="nav-swiper">
      <main-nav></main-nav>
      <main-swiper v-show="showSwiper"></main-swiper>
    </div>
    <router-view></router-view>
  </div>

  <el-pagination
    :background="true"
    layout="prev, pager, next"
    @current-change="handleCurrentChange"
    :current-page="fruitInfo.current"
    :page-count="Math.floor((fruitInfo.total + fruitInfo.size - 1) / fruitInfo.size)"
    :total="fruitInfo.total"
    :page-size="fruitInfo.size"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import MainNav from '../main-nav'
import MainSwiper from '../main-swiper'
import MainContent from '../main-content'
import { ElPagination } from 'element-plus'

export default defineComponent({
  components: {
    MainContent,
    MainNav,
    MainSwiper,
    ElPagination
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const fruitInfo = computed(() => store.state.fruitInfo)

    // 修改分页组件页数
    const handleCurrentChange = (currentPage: number) => {
      if (
        router.currentRoute.value.query.fruitType === '全部' ||
        JSON.stringify(router.currentRoute.value.query) == '{}'
      )
        store.dispatch('getFruitAllTypeInfo', {
          pageNumber: currentPage,
          pageSize: 20
        })
      else
        store.dispatch('getFruitAllTypeInfo', {
          pageNumber: currentPage,
          pageSize: 20,
          ...router.currentRoute.value.query
        })
    }

    // 是否展示swiper
    const showSwiper = computed(() => {
      return router.currentRoute.value.path === '/home/berries-content' ||
        router.currentRoute.value.path === '/home/melonsFruits-content' ||
        router.currentRoute.value.path === '/home/citrus-content' ||
        router.currentRoute.value.path === '/home/nutFrupes-content' ||
        router.currentRoute.value.path === '/home/tropicalFruits-content'
        ? false
        : true
    })

    return {
      fruitInfo,
      showSwiper,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
// 引入全局样式
@import url('@/style');
// home-main 和 home-main-swiper 共有的样式属性
.home-main-swiper-all {
  margin: 8px 12%;
  padding: 15px;
}
// 分页器样式
.el-pagination {
  column-count: -4;
  column-gap: -15px;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 45px;

  // 选中按钮背景颜色
  --el-color-primary: @main-color;

  // 选中按钮的文字颜色
  --el-color-white: @option-color;

  // 未选中按钮背景颜色
  --el-disabled-bg-color: #dcd8d4;
  --el-pagination-button-bg-color: #dcd8d4;

  // 未选中按钮文字颜色
  --el-text-color-primary: @main-color;
  --el-text-color-placeholder: @main-color;

  /*hover时候的文字颜色*/
  --el-pagination-hover-color: @main-color;
}
.home-main {
  column-count: 4;
  column-gap: 15px;
}
// 主页组件轮播图样式
.home-main-swiper {
  display: flex;
  justify-content: center;
  flex-direction: column;

  .nav-swiper {
    // height: 500px;
    display: flex;
    gap: 15px;
  }
}
/* 当窗口小于1400px时只展示3列 */
@media (max-width: 1400px) {
  .home-main {
    column-count: 3;
  }
}
@media (max-width: 1000px) {
  .home-main {
    column-count: 2;
  }
}
@media (max-width: 700px) {
  .home-main {
    column-count: 1;
  }
}
// 窗口太小时左导航和swiper纵向排列
@media (max-width: 700px) {
  .nav-swiper {
    flex-direction: column;
  }
}
</style>
