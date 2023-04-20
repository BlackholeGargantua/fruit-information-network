<template>
  <div class="information-content">
    <template v-for="info in informationContent.records" :key="info.id">
      <el-card shadow="hover">
        <template #header>
          <div class="header">
            <div class="header-left">
              <h1>{{ info.title }}</h1>
              <div class="content-bottom">
                <span style="margin-right: 20px">{{ info.update_time }}</span>
                <span>浏览量：{{ info.views }}</span>
              </div>
            </div>
            <div class="header-right">
              <el-image
                style="width: 100px; height: 100px"
                :src="info.img_url"
                :zoom-rate="1.2"
                :preview-src-list="[info.img_url]"
                :initial-index="4"
                fit="cover"
              />
            </div>
          </div>
        </template>
        <el-collapse :model-value="info.id.toString()">
          <el-collapse-item :name="info.id.toString()">
            <template #title> <h3>内容</h3></template>
            <div style="white-space: pre-wrap; font-size: 16px">
              {{ info.content }}
            </div>
          </el-collapse-item>
        </el-collapse>
        <div style="margin: 15px 0">提醒：{{ info.tip }}</div>
      </el-card>
    </template>
    <div style="width: 100%; text-align: center">
      <el-pagination
        text-align="center"
        v-show="informationContent.total !== 0"
        :current-page="informationContent.current"
        :page-size="informationContent.size"
        :page-sizes="[10, 20, 30, 40]"
        :small="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="informationContent.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed } from 'vue'
import { useStore } from '@/store'

import { ElCard, ElImage, ElCollapse, ElCollapseItem, ElPagination } from 'element-plus'

export default defineComponent({
  components: { ElCard, ElImage, ElCollapse, ElCollapseItem, ElPagination },
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('information/getInformation', { pageNumber: 1, pageSize: 20 })
    })

    // 资讯信息列表
    const informationContent = computed({
      set: () => store.state.information.information,
      get: () => store.state.information.information
    })

    // 修改分页器要求个数
    const handleSizeChange = (pageSize: number) => {
      store.dispatch('information/getInformation', {
        pageNumber: informationContent.value.current,
        pageSize: pageSize
      })
      // 滚动到顶部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    // 修改分页器要求页数
    const handleCurrentChange = (currentPage: number) => {
      store.dispatch('information/getInformation', {
        pageNumber: currentPage,
        pageSize: informationContent.value.size
      })
      // 滚动到顶部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    return { informationContent, handleSizeChange, handleCurrentChange }
  }
})
</script>

<style scoped lang="less">
@import url('@/style');
.information-content {
  background-color: @main-color;
  padding: 40px 60px 40px 40px;

  :deep(.el-card) {
    margin-bottom: 40px;
  }
  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .header-left {
      flex: 8;
    }
    .header-right {
      flex: 1;
    }
  }

  .el-pagination {
    justify-content: center;

    // 选中按钮背景颜色
    --el-color-primary: @main-color;

    // 选中按钮的文字颜色
    --el-color-white: @option-color;

    // 未选中按钮背景颜色
    --el-disabled-bg-color: @main-color;
    --el-pagination-button-bg-color: @main-color;
    --el-pagination-bg-color: @main-color;

    // 未选中按钮文字颜色
    --el-text-color-primary: #fff;
    --el-text-color-placeholder: #fff;

    // 上、下一页按钮背景颜色
    --el-pagination-button-disabled-bg-color: @main-color;

    // 总条数颜色
    --el-text-color-regular: @option-color;

    /*hover时候的文字颜色*/
    --el-pagination-hover-color: @option-color;
  }
}
</style>
