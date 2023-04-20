<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="userInfo.avatar_url"></el-avatar>
        <span>{{ userInfo.username }}</span>
      </span>
      <!-- <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template> -->
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { ElAvatar, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

export default defineComponent({
  components: {
    ElAvatar,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
  },
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.login.userPersonalInfo)

    return {
      userInfo
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
