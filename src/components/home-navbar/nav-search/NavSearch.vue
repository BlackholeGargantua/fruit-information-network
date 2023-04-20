<template>
  <div class="nav-search">
    <el-input
      type="input"
      placeholder="输入水果名字"
      class="nav-bar-input"
      v-model="searchValue"
      clearable
      @keyup.enter="searchHidden"
      @clear="clearSearch"
    >
      <template #append>
        <el-icon @click="searchHidden" size="20"><Search /></el-icon>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
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
    const store = useStore()

    // 输入框值
    let searchValue = ref()

    // 搜索事件
    const searchHidden = () => {
      // 保存搜索值
      store.commit('changeMainSearchValue', searchValue)
      // 搜索
      store.dispatch('getFruitNamePage', {
        pageNumber: 1,
        pageSize: 30,
        fruitName: searchValue.value
      })
    }
    // 清空搜索
    const clearSearch = () => {
      // 清除搜索值
      store.commit('changeMainSearchValue', '')
      // 搜索
      store.dispatch('getFruitNamePage', {
        pageNumber: 1,
        pageSize: 30
      })
    }

    return {
      router,
      searchValue,
      searchHidden,
      clearSearch
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
