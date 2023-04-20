<template>
  <div class="home-swiper">
    <el-carousel indicator-position="outside" height="450px" autoplay>
      <el-carousel-item v-for="item in banner" :key="item.id" @click.prevent="goToInfo(item.name)">
        <el-image style="width: 100%; height: 100%" :src="item.img_url" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus'
export default defineComponent({
  components: {
    ElCarousel,
    ElCarouselItem,
    ElImage
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    // 挂载之前获取banner
    onBeforeMount(() => {
      store.dispatch('getBanners')
    })

    // 获取最新banner
    const banner = computed(() => store.state.banner)

    // 点击banner后跳转到对应的信息界面
    const goToInfo = (fruitName: any) => {
      router.push({
        path: '/fruit-info',
        query: {
          fruitName: fruitName
        }
      })
    }

    return { banner, goToInfo }
  }
})
</script>

<style scoped lang="less">
.home-swiper {
  flex: 312;
  min-width: 400px;

  .el-carousel__item {
    cursor: pointer;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
