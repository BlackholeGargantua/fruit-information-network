<template>
  <div class="data-table">
    <!-- header中的插槽 -->
    <div class="table-header">
      <slot name="header"></slot>
    </div>
    <!-- 表格数据插槽 -->
    <el-table
      ref="singleTableRef"
      :data="props.tableData"
      style="width: 98%"
      max-height="500"
      :border="true"
      size="large"
      table-layout="fixed"
      highlight-current-row
      stripe
      @selection-change="selectedInfo"
    >
      <el-table-column type="selection" width="80" header-align="center" align="center" />
      <el-table-column type="index" label="序号" width="80" header-align="center" align="center" />
      <template v-for="propItem in props.tableProps" :key="propItem.prop">
        <el-table-column
          resizable
          show-overflow-tooltip
          :type="propItem?.type"
          :prop="propItem.prop"
          :label="propItem.label"
          :min-width="propItem.minWidth"
          :fixed="propItem.fixed"
          header-align="center"
          align="center"
        >
          <template #default="scope">
            <slot :name="propItem?.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- footer中的插槽 -->
    <div class="table-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref } from 'vue'
// import { useStore } from '@/store'
import { ElTable, ElTableColumn } from 'element-plus'

// const store = useStore()

// 传递的表格配置和表格数据
const props = withDefaults(defineProps<{ tableData: any; tableProps: any }>(), {})

const singleTableRef = ref<InstanceType<typeof ElTable>>()

// 选中项
const selectedInfo = (value: any) => {
  console.log(value)
}
</script>

<style lang="less" scoped>
.data-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 620px;
  background-color: #fff;
  margin-top: 20px;

  // 表格顶部插槽样式
  .table-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 98%;
    height: 60px;
  }

  // 表格底部插槽样式
  .table-footer {
    display: flex;
    justify-content: right;
    align-items: center;
    width: 98%;
    height: 80px;
  }

  :deep(.el-table) {
    border-radius: 10px;
  }

  // 让表头和内容对齐
  :deep(.el-table__header) {
    margin: 0 auto;
  }
}
</style>
