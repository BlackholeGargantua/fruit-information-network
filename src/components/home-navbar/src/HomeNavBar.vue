<template>
  <div class="home-nav-bar">
    <el-menu
      :default-active="activeIndex"
      :ellipsis="false"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#5d3d21"
      text-color="#fff"
      active-text-color="#40a070"
    >
      <button class="nav-head-img" />
      <el-menu-item index="1" @click="router.push('/home')">首页</el-menu-item>
      <el-menu-item>
        <related-info></related-info>
      </el-menu-item>
      <div class="flex-grow" />
      <nav-search v-show="router.currentRoute.value.path !== '/info'"></nav-search>
      <el-menu-item index="4" style="padding-right: 30px">登录</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMenu, ElMenuItem } from 'element-plus'
import NavSearch from '@/components/home-navbar/nav-search/NavSearch.vue'
import RelatedInfo from '@/components/home-navbar/related-info/RelatedInfo.vue'

export default defineComponent({
  components: {
    ElMenu,
    ElMenuItem,
    NavSearch,
    RelatedInfo
  },
  setup() {
    // 引入路由
    const router = useRouter()

    // 菜单选中项下标
    const activeIndex = ref('1')

    return {
      router,
      activeIndex
    }
  }
})
</script>

<style scoped lang="less">
.home-nav-bar {
  position: sticky; // 相比fixed不会脱离文档流
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  // margin-right: calc(100% - 100vw);
  .el-menu {
    height: 60px;
    display: flex;
    align-items: center;
    // 导航首图片样式
    .nav-head-img {
      height: 60px;
      width: 60px;

      background: url('@/assets/images/辉夜姬.jpg');
      border: 0;
    }

    /* 中间空格 */
    .flex-grow {
      flex-grow: 1;
    }
  }
}
</style>
