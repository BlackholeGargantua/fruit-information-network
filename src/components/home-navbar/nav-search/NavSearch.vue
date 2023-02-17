<template>
  <div class="nav-search">
    <el-input type="input" placeholder="输入水果名字" class="nav-bar-input" v-model="searchValue">
      <template #append>
        <el-icon @click="router.push('/infoDetail')" size="20"><Search /></el-icon>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElInput, ElIcon } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ElIcon,
    ElInput,
    Search
  },
  setup() {
    // 引入路由
    const router = useRouter()

    // 输入框值
    let searchValue = ref()

    // const change: string | number = () => void {
    //   return
    // }

    return {
      router,
      searchValue
    }
  }
})
</script>

<style scoped lang="less">
/* 搜索框样式 */
.nav-bar-input {
  width: 400px;
  height: 60%;
  --el-input-text-color: #51af1b;
  --el-input-border-color: #748b80;
  --el-input-hover-border-color: #60fdae;
  --el-input-focus-border-color: #4cbb84;
  --el-input-bg-color: rgba(63, 46, 34, 0.3);

  // 搜索按钮图标
  .el-input-group__append {
    opacity: 0.7;
    .el-icon {
      color: rgb(16, 241, 16);
      margin: 0 -10px;
      & :hover {
        cursor: pointer;
      }
    }
  }
  .el-input-wrapper {
    background-color: rgba(16, 241, 16, 0.5);
  }
}
</style>
