<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/images/辉夜姬.jpg" alt="logo" />
      <span v-if="!collapse" class="title">水果情报网</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      :collapse="collapse"
      active-text-color="#5d3d21"
      background-color="#40a070"
      :default-active="
        router.currentRoute.value.path == '/backup'
          ? '/backup/system-overview'
          : router.currentRoute.value.path
      "
      text-color="#fff"
      :router="true"
    >
      <template v-for="item in nav" :key="item.id">
        <el-menu-item
          v-if="item.children.length == 0"
          :index="item.route"
          :route="{ path: item.route }"
        >
          <el-icon><setting /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
        <el-sub-menu :index="item.route" v-if="item.children.length !== 0">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="itemChildren in item.children" :key="itemChildren.id">
            <el-menu-item :index="itemChildren.route" :route="{ path: itemChildren.route }">
              <el-icon><setting /></el-icon>
              <span>{{ itemChildren.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu, ElIcon } from 'element-plus'
import { Location, Setting } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubMenu,
    ElIcon,
    Location,
    Setting
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()

    // 导航条内容
    const nav = reactive([
      {
        id: 1,
        title: '系统总览',
        route: '/backup/system-overview',
        children: []
      },
      {
        id: 2,
        title: '系统管理',
        route: '/backup/system-manage',
        children: [
          {
            id: 1,
            title: '用户管理',
            route: '/backup/system-manage/user'
          },
          {
            id: 2,
            title: '水果信息管理',
            route: '/backup/system-manage/fruit'
          }
        ]
      },
      {
        id: 3,
        title: '数据统计',
        route: '/backup/data-statistics',
        children: []
      }
    ])

    const handleMenuItemClick = (item: any) => {
      console.log('--------')
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return { router, nav, handleMenuItemClick }
  }
})
</script>

<style scoped lang="less">
@import url('@/style');
.nav-menu {
  height: 100%;
  background-color: @main-color;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #4fdf92 !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
