<template>
  <div class="info-detail">
    <el-aside>
      <el-image :src="fruitInfoData.img_url" :initial-index="10" fit="cover"></el-image>
      <el-card class="box-card" shadow="never">
        <div
          class="text-item"
          v-for="info in simpleInfo"
          :key="info.id"
          v-show="fruitInfoData[info.value] != null"
        >
          {{ info.title + '：' + fruitInfoData[info.value] }}
        </div>
      </el-card>
    </el-aside>
    <el-main>
      <div class="demo-collapse">
        <el-collapse v-model="activeNames" :accordion="true">
          <el-collapse-item
            v-for="info in mainInfo"
            :key="info.id"
            v-show="fruitInfoData[info.value] != null"
            :title="info.title"
          >
            <div>{{ fruitInfoData[info.value] }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import {
  ElContainer,
  ElMain,
  ElCard,
  ElImage,
  ElAside,
  ElCollapse,
  ElCollapseItem
} from 'element-plus'
import { fruitInfoType } from './type'
export default defineComponent({
  components: {
    ElContainer,
    ElMain,
    ElAside,
    ElImage,
    ElCard,
    ElCollapse,
    ElCollapseItem
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    // 请求水果数据
    onBeforeMount(() => {
      store.dispatch('fruit/getFruitDetai', router.currentRoute.value.query.fruitName)
    })

    // 内容详情
    const fruitInfoData: fruitInfoType = computed(() => store.state.fruit.fruitDetail)
    // console.log(fruitInfoData.value)

    // 默认要展开的内容name
    const activeNames = ref(['1', '2'])

    // 重新分类数据，方便展示
    // 左侧信息
    const simpleInfo = [
      { id: 1, title: '学名', value: 'scientific_name' },
      { id: 2, title: '拼音', value: 'pinyin' },
      { id: 3, title: '英文名', value: 'english_name' },
      { id: 4, title: '别称', value: 'nick_name' },
      { id: 5, title: '查阅量', value: 'views' },
      { id: 6, title: '更新时间', value: 'update_time' }
    ]
    // 右侧信息
    const mainInfo = [
      { id: 1, title: '基本信息', value: 'essential_information' },
      { id: 2, title: '分布地区', value: 'distribution_area' },
      { id: 3, title: '成熟期', value: 'mature_period' },
      { id: 4, title: '营养价值', value: 'nutritive_value' },
      { id: 5, title: '挑选方法', value: 'selection_method' },
      { id: 6, title: '食用吃法', value: 'edible_method' },
      { id: 7, title: '保存方法', value: 'saving_method' },
      { id: 8, title: '种植方法', value: 'planting_method' },
      { id: 9, title: '注意事项', value: 'matters_needing_attention' }
    ]

    return {
      activeNames,
      fruitInfoData,
      mainInfo,
      simpleInfo
    }
  }
})
</script>

<style scoped lang="less">
@import url('@/style');
.info-detail {
  display: flex;
  flex-direction: row;
  min-width: 600px;
  min-height: calc(100vh - 68px);
  gap: 40px;
  margin: 8px 12% 0 12%;

  // 左半区样式
  .el-aside {
    flex: 2;
    width: 300px;
    background-color: @main-color;
    text-align: center;

    // 图片样式
    .el-image {
      border-radius: 4px;
      margin: 25px;

      // 图片阅览的 X 按钮
      :deep(.el-image-viewer__wrapper) {
        margin-top: 30px;
      }
    }

    // 卡片样式
    .box-card {
      border: 0;
      background-color: rgba(255, 255, 255, 0);
      .text-item {
        color: aliceblue;
        font-size: 14px;
        text-align: left;
        padding: 18px 0 18px 50px;
      }
    }
  }

  // 右半区样式
  .el-main {
    flex: 5;
    --el-main-padding: 0;
    overflow-y: hidden;

    // 标题样式
    :deep(.el-collapse-item__header) {
      --el-collapse-header-font-size: 16px;
      font-style: normal;
    }
    // 内容样式
    :deep(.el-collapse-item__content) {
      font-size: 12px;
    }
    // 点开的图片样式
    .demo-image__error .el-image {
      width: 100%;
      height: 200px;
    }
  }
}
</style>
