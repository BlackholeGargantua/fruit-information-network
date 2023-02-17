<template>
  <div class="home-swiper">
    <el-carousel indicator-position="outside" height="450px" :autoplay="false">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'
export default defineComponent({
  components: {
    ElCarousel,
    ElCarouselItem
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.home-swiper {
  flex: 312;
  min-width: 400px;
  /* 字体的样式 */
  .el-carousel__item h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #475669;
    opacity: 0.75;
    line-height: 450px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
