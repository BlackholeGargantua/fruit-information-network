<template>
  <data-search ref="dataSearchRef" placeholderValue="请输入水果名"></data-search>
  <data-table :tableData="fruitInfo.records" :tableProps="tableProps">
    <!-- 表格上面 -->
    <template #header>
      <span style="font-weight: 600">水果信息列表</span>
      <el-button color="#40a070" @click="addFruitInfo">新增水果信息</el-button>
    </template>
    <!-- 表格内容 -->
    <template #handler="scope">
      <el-button style="color: #4fdf92" link :icon="Edit" @click="editFruitInfo(scope.row)"
        >编辑</el-button
      >
      <el-button style="color: #f44c46" link :icon="Delete" @click="deleteFruitInfo(scope.row.id)"
        >删除</el-button
      >
    </template>
    <template #imgUrl="scope">
      <el-image
        style="width: 100px; height: 100px"
        :src="scope.row.img_url"
        :preview-src-list="[scope.row.img_url]"
        preview-teleported
        :zoom-rate="1.2"
        fit="cover"
      >
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
    </template>
    <!-- 表格下面 -->
    <template #footer>
      <el-pagination
        v-show="fruitInfo.total !== 0"
        :current-page="fruitInfo.current"
        :page-size="fruitInfo.size"
        :page-sizes="[10, 20, 30, 40]"
        :small="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="fruitInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </data-table>
  <el-dialog v-model="showAddOrEditPage" :title="dialogTitle" width="45%" center align-center>
    <el-form
      ref="fruitDataFromRef"
      :model="fruitDataFrom"
      status-icon
      :rules="rules"
      label-width="120px"
      scroll-to-error
      scroll-into-view-options
    >
      <el-form-item label="学名" prop="scientific_name">
        <el-input v-model="fruitDataFrom.scientific_name" type="text" clearable />
      </el-form-item>
      <el-form-item label="类别" prop="type">
        <el-radio-group v-model="fruitDataFrom.type" size="small">
          <el-radio-button label="无" disabled />
          <el-radio-button v-for="item in fruitTypeOptions" :key="item.id" :label="item.label" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="拼音" prop="pinyin">
        <el-input v-model="fruitDataFrom.pinyin" type="text" clearable />
      </el-form-item>
      <el-form-item label="英文名" prop="english_name">
        <el-input v-model="fruitDataFrom.english_name" type="text" clearable />
      </el-form-item>
      <el-form-item label="别称" prop="alias">
        <el-input maxlength="1500" v-model="fruitDataFrom.alias" type="text" clearable />
      </el-form-item>
      <el-form-item label="更新时间" prop="update_time">
        <el-date-picker
          :teleported="false"
          v-model="fruitDataFrom.update_time"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="基本信息" prop="essential_information">
        <el-input
          maxlength="1500"
          v-model="fruitDataFrom.essential_information"
          type="textarea"
          clearable
        />
      </el-form-item>
      <el-form-item label="分布地区" prop="distribution_area">
        <el-input
          maxlength="1500"
          v-model="fruitDataFrom.distribution_area"
          type="textarea"
          clearable
        />
      </el-form-item>
      <el-form-item label="成熟期" prop="mature_period">
        <el-input
          maxlength="1500"
          v-model="fruitDataFrom.mature_period"
          type="textarea"
          clearable
        />
      </el-form-item>
      <el-form-item label="营养价值" prop="nutritive_value">
        <el-input
          maxlength="1500"
          v-model="fruitDataFrom.nutritive_value"
          type="textarea"
          clearable
        />
      </el-form-item>
      <el-form-item label="挑选方法" prop="selection_method">
        <el-input
          maxlength="1500"
          v-model="fruitDataFrom.selection_method"
          type="textarea"
          clearable
        />
      </el-form-item>
      <el-form-item label="食用吃法" prop="edible_method">
        <el-input
          maxlength="1500"
          v-model="fruitDataFrom.edible_method"
          type="textarea"
          clearable
        />
      </el-form-item>
      <el-form-item label="保存方法" prop="saving_method">
        <el-input
          maxlength="1500"
          v-model="fruitDataFrom.saving_method"
          type="textarea"
          clearable
        />
      </el-form-item>
      <el-form-item label="种植方法" prop="planting_method">
        <el-input
          maxlength="1500"
          v-model="fruitDataFrom.planting_method"
          type="textarea"
          clearable
        />
      </el-form-item>
      <el-form-item label="注意事项" prop="matters_needing_attention">
        <el-input
          maxlength="1500"
          v-model="fruitDataFrom.matters_needing_attention"
          type="textarea"
          clearable
        />
      </el-form-item>
      <el-form-item label="图片地址" prop="img_url">
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          list-type="picture"
          :action="ENV_URL + '/files/upload'"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :clearFiles="clearFiles"
        >
          <el-button type="primary">点击上传图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="showAddOrEditPage = false">取消</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm(fruitDataFromRef)">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="delectDialogVisible" title="警告" width="30%" center>
    <span> 此操作不可挽回，请谨慎选择 </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="delectDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDelete"> 确认删除 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/store'
import DataSearch from '@/base-ui/data-search.vue'
import DataTable from '@/base-ui/data-table.vue'
import { tableProps, rules } from './config/table.config'
import {
  ElButton,
  ElDialog,
  ElDatePicker,
  ElInput,
  ElImage,
  ElPagination,
  ElForm,
  ElFormItem,
  ElUpload,
  ElRadioGroup,
  ElRadioButton,
  ElIcon
} from 'element-plus'
import { Delete, Edit, Picture } from '@element-plus/icons-vue'
import type { FormInstance, UploadProps, UploadUserFile } from 'element-plus'

const store = useStore()

const ENV_URL = process.env.VUE_APP_BASE_URL

// 搜索
const dataSearchRef = ref<InstanceType<typeof DataSearch>>()
const searchValue = computed(() => dataSearchRef.value?.searchValue)

// 表格水果信息数据
const fruitInfo = computed(() => store.state.fruitInfo)

// 弹出框标题
const dialogTitle = ref('新增水果信息')

// 展示新增或编辑框
const showAddOrEditPage = ref(false)

// 表单实例
const fruitDataFromRef = ref<FormInstance>()

type fruitDataFromType<T> = {
  [key: string]: T | undefined
}

// 判断新增还是更新
const isAddOrUpdate = ref('add')

// 删除操作提示框
const delectDialogVisible = ref(false)
// 删除或更新的水果id
const deleteOrUpdateFruitInfoId = ref()

// 新增水果表单数据
const fruitDataFrom = reactive<fruitDataFromType<string | number>>({
  scientific_name: '',
  type: '',
  pinyin: '',
  english_name: '',
  alias: '',
  views: 0,
  update_time: '',
  essential_information: '',
  distribution_area: '',
  mature_period: '',
  nutritive_value: '',
  selection_method: '',
  edible_method: '',
  saving_method: '',
  planting_method: '',
  matters_needing_attention: '',
  img_url: ''
})

// 水果分类选项
const fruitTypeOptions = [
  {
    id: 1,
    label: '浆果类'
  },
  {
    id: 2,
    label: '瓜果类'
  },
  {
    id: 3,
    label: '橘果类'
  },
  {
    id: 4,
    label: '核果类'
  },
  {
    id: 5,
    label: '仁果类'
  }
]

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  // 表单验证
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('表单验证通过')
      ;(async function () {
        // 发起请求删除水果
        if (isAddOrUpdate.value == 'add') await store.dispatch('fruit/fruitAdd', fruitDataFrom)
        if (isAddOrUpdate.value == 'update')
          await store.dispatch('fruit/updateFruitInfo', {
            id: deleteOrUpdateFruitInfoId.value,
            ...fruitDataFrom
          })
        showAddOrEditPage.value = store.state.fruit.showAddInfoDialog
        // 获取水果最新信息
        await store.dispatch('getFruitAllTypeInfo')
      })()
    } else {
      console.log('表单验证不通过')
      return false
    }
  })
}
// 重置表单
const resetForm = () => {
  Object.keys(fruitDataFrom).forEach((key) => {
    fruitDataFrom[key] = undefined
  })
}

// 上传文件列表
const fileList = ref<UploadUserFile[]>([])
// 文件上传成功后回调
const handleSuccess = (response: any) => {
  fruitDataFrom.img_url = response.data
}
// 删除上传文件
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

// 清除上传的文件列表
const clearFiles = () => {
  console.log('clear files')
}

// 修改分页器要求个数
const handleSizeChange = (pageSize: number) => {
  store.dispatch('getFruitNamePage', {
    pageNumber: fruitInfo.value.current,
    pageSize: pageSize,
    fruitName: searchValue.value
  })
}

// 修改分页器要求页数
const handleCurrentChange = (currentPage: number) => {
  store.dispatch('getFruitNamePage', {
    pageNumber: currentPage,
    pageSize: fruitInfo.value.size,
    fruitName: searchValue.value
  })
}

// 点击新增事件
const addFruitInfo = () => {
  showAddOrEditPage.value = true
  dialogTitle.value = '新增水果信息'
  isAddOrUpdate.value = 'add'
  // 清空表单
  Object.keys(fruitDataFrom).forEach((key) => {
    fruitDataFrom[key] = undefined
  })
}

// 编辑
const editFruitInfo = (fruitDataFromItem: fruitDataFromType<string | number>) => {
  showAddOrEditPage.value = true
  dialogTitle.value = '更新水果信息'
  isAddOrUpdate.value = 'update'
  deleteOrUpdateFruitInfoId.value = fruitDataFromItem.id
  Object.keys(fruitDataFrom).forEach((key) => {
    fruitDataFrom[key] = fruitDataFromItem[key]
  })
  // 从图片地址中找到文件名
  if (typeof fruitDataFrom.img_url === 'string') {
    const startPosition = fruitDataFrom.img_url.lastIndexOf('-') + 1 // 获取 '-' 的下一个字符的位置
    const endPosition = fruitDataFrom.img_url.indexOf('.') // 获取 '.' 的位置
    const fileName = fruitDataFrom.img_url.substring(startPosition, endPosition) // 使用 substring 方法提取在指定位置之间的子字符串
    fileList.value.push({ name: fileName, url: fruitDataFrom.img_url })
  }
}

// 删除
const deleteFruitInfo = (fruitId: number) => {
  delectDialogVisible.value = true
  deleteOrUpdateFruitInfoId.value = fruitId
}
// 确认删除
const confirmDelete = () => {
  ;(async function () {
    // 删除
    await store.dispatch('fruit/deleteFruitInfo', deleteOrUpdateFruitInfoId.value)
    // 获取用户最新信息
    await store.dispatch('getFruitAllTypeInfo')
  })()
  delectDialogVisible.value = false
}
</script>

<style lang="less" scoped>
// 引入全局样式
@import url('@/style');
// 分页器样式
.el-pagination {
  // 选中按钮背景颜色
  --el-color-primary: @main-color;

  // 选中按钮的文字颜色
  --el-color-white: @option-color;

  // 未选中按钮背景颜色
  --el-disabled-bg-color: #dcd8d4;
  --el-pagination-button-bg-color: #dcd8d4;

  // 未选中按钮文字颜色
  --el-text-color-primary: @main-color;
  --el-text-color-placeholder: @main-color;

  /*hover时候的文字颜色*/
  --el-pagination-hover-color: @option-color;
}
</style>
