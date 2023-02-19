<template>
  <div class="main-content" :class="{ 'enable-waterfall-layout': props.showLayout }">
    <template v-for="item in 14" :key="item">
      <el-card :body-style="{ padding: '5px' }" @click.prevent="goToInfo()">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px">
          <span>Yummy hamburger</span>
          <div class="bottom">
            <p>{{ item }}</p>
            <el-button text class="button">Operating</el-button>
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElCard } from 'element-plus'

const props = withDefaults(
  defineProps<{
    showLayout: boolean
  }>(),
  { showLayout: false }
)
const router = useRouter()
const goToInfo = () => {
  router.push('/info')
}
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
