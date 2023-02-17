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
      <el-menu-item index="/">
        <el-icon><setting /></el-icon>
        <span>全部</span>
      </el-menu-item>
      <el-menu-item index="/home/berries-content">
        <el-icon><setting /></el-icon>
        <span>浆果类</span>
      </el-menu-item>
      <el-menu-item index="/home/melonsFruits-content">
        <el-icon><setting /></el-icon>
        <span>瓜果类</span>
      </el-menu-item>
      <el-menu-item index="/home/citrus-content">
        <el-icon><setting /></el-icon>
        <span>柑橘类</span>
      </el-menu-item>
      <el-menu-item index="/home/nutFrupes-content">
        <el-icon><setting /></el-icon>
        <span>坚果核果类</span>
      </el-menu-item>
      <el-menu-item index="/home/tropicalFruits-content">
        <el-icon><setting /></el-icon>
        <span>热带水果类</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ElIcon,
    ElMenu,
    ElMenuItem,
    Setting
  },
  setup() {
    const router = useRouter()
    return { router }
  }
})
</script>

<style scoped>
.main-nav {
  /* height: 500px; */
  min-width: 290px;
  opacity: 0.8;
  flex: 100;
}
</style>
