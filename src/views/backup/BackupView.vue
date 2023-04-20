<template>
  <div class="backup">
    <el-container class="backup-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useStore } from '@/store'
import { ElContainer, ElMain, ElAside, ElHeader } from 'element-plus'
import NavMenu from '@/components/backup-manage/nav-menu'
import NavHeader from '@/components/backup-manage/nav-header'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
    ElContainer,
    ElMain,
    ElAside,
    ElHeader
  },
  setup() {
    const store = useStore()

    // 挂载前获取数据
    onBeforeMount(() => {
      // 获取所有水果信息
      store.dispatch('fruit/getAllFruit')
      // 获取水果
      store.dispatch('getFruitAllTypeInfo', {
        pageNumber: 1,
        pageSize: 20
      })
      // 获取用户
      store.dispatch('user/getUserAll')
    })

    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }

    return {
      isCollapse,
      handleFoldChange
    }
  }
})
</script>

<style scoped lang="less">
.backup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.backup-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

// 右侧内容顶部
.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
