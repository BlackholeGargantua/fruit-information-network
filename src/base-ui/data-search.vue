<template>
  <div class="data-search">
    <el-input
      :placeholder="props.placeholderValue"
      v-model="searchValue"
      size="large"
      clearable
      @keyup.enter="search"
    ></el-input>
    <el-button color="#40a070" :icon="Search" size="large" @click="search">搜索</el-button>
    <el-button color="#40a070" :icon="Refresh" size="large" @click="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { defineExpose, withDefaults, defineProps, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { ElButton, ElInput } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{ placeholderValue: string }>(), {})
const store = useStore()
const router = useRouter()

const userInfo = computed(() => store.state.user.userInfo)
const fruitInfo = computed(() => store.state.fruitInfo)

// 搜索框值
const searchValue = ref<string>('')

defineExpose({
  searchValue
})

// 搜索
const search = () => {
  if (router.currentRoute.value.path === '/backup/system-manage/user') {
    store.dispatch('user/getUserAll', {
      pageNumber: 1,
      pageSize: userInfo.value.size ?? 10,
      username: searchValue.value
    })
  }
  if (router.currentRoute.value.path === '/backup/system-manage/fruit') {
    store.dispatch('getFruitNamePage', {
      pageNumber: 1,
      pageSize: fruitInfo.value.size ?? 10,
      fruitName: searchValue.value
    })
  }
}

// 重置搜索框
const reset = () => {
  searchValue.value = ''
  search()
}
</script>

<style lang="less" scoped>
@import url('@/style');
.data-search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 250px;
  background-color: #fff;
  border-radius: 10px;

  ::v-deep .el-input {
    width: 500px;
    --el-input-text-color: #51af1b;
    --el-input-border-color: #748b80;
    --el-input-hover-border-color: #60fdae;
    --el-input-focus-border-color: #4cbb84;
    .el-input-wrapper {
      background-color: rgba(16, 241, 16, 0.5);
    }
  }
}
</style>
