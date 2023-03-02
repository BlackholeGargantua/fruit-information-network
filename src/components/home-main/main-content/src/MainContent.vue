<template>
  <div class="main-content" :class="{ 'enable-waterfall-layout': props.showLayout }">
    <template v-for="fruit in fruitInfo" :key="fruit.id">
      <el-card :body-style="{ padding: '5px' }" @click.prevent="goToInfo(fruit.scientific_name)">
        <img :src="fruit.img_url" class="image" />
        <div style="padding: 14px">
          <span>{{ fruit.scientific_name }}</span>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { ElCard } from 'element-plus'

const props = withDefaults(
  defineProps<{
    showLayout: boolean
  }>(),
  { showLayout: false }
)
const router = useRouter()
const store = useStore()

// 点击卡片后跳转到对应的信息界面
const goToInfo = (fruitName: any) => {
  router.push({
    path: '/info',
    query: {
      fruitName: fruitName
    }
  })
}
const fruitInfo = computed(() => store.state.fruitInfo.records)
</script>

<style lang="less" scoped>
.enable-waterfall-layout {
  column-count: 4;
  column-gap: 15px;
  .el-card {
    cursor: pointer;
    margin-bottom: 15px;
  }
}
/* 当窗口小于1400px时只展示3列 */
@media (max-width: 1400px) {
  .enable-waterfall-layout {
    column-count: 3;
  }
}
@media (max-width: 1000px) {
  .enable-waterfall-layout {
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .enable-waterfall-layout {
    column-count: 1;
  }
}
</style>
