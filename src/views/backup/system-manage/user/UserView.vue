<template>
  <data-search ref="dataSearchRef" placeholderValue="请输入用户名"></data-search>
  <data-table :tableData="userInfo.records" :tableProps="tableProps">
    <!-- 表格上面 -->
    <template #header>
      <span style="font-weight: 600">用户列表</span>
      <el-button color="#40a070" @click="addUser">新增用户</el-button>
    </template>
    <!-- 表格内容 -->
    <template #status="scope">
      <el-button plain size="default" :color="scope.row.status == 1 ? '#4fdf92' : '#f44c46'"
        >{{ scope.row.status == 1 ? '启用' : '禁用' }}
      </el-button>
    </template>
    <template #avatar="scope">
      <el-image
        style="width: 100px; height: 100px"
        :src="scope.row.avatar_url"
        :preview-src-list="[scope.row.avatar_url]"
        preview-teleported
        :zoom-rate="1.2"
        fit="contain"
      />
    </template>
    <template #handler="scope">
      <el-button style="color: #4fdf92" link :icon="Edit" @click="editUser(scope.row)"
        >编辑</el-button
      >
      <el-button style="color: #f44c46" link :icon="Delete" @click="deleteUser(scope.row.id)"
        >删除</el-button
      >
    </template>
    <!-- 表格下面 -->
    <template #footer>
      <el-pagination
        v-show="userInfo.total !== 0"
        :current-page="userInfo.current"
        :page-size="userInfo.size"
        :page-sizes="[5, 10, 20, 40]"
        :small="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </data-table>
  <el-dialog v-model="showAddOrEditPage" :title="dialogTitle" width="45%" center align-center>
    <el-form
      ref="userDataFromRef"
      :model="userDataFrom"
      status-icon
      :rules="rules"
      label-width="120px"
      scroll-to-error
      scroll-into-view-options
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userDataFrom.username" type="text" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password" v-show="noHiddenPWD">
        <el-input v-model="userDataFrom.password" type="password" clearable show-password />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="userDataFrom.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限" prop="role">
        <el-radio-group v-model="userDataFrom.role">
          <el-radio-button label="admin" />
          <el-radio-button label="ordinary" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间" prop="create_time">
        <el-date-picker
          :teleported="false"
          v-model="userDataFrom.create_time"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="头像地址" prop="avatar_url">
        <el-upload
          class="avatar-uploader"
          :action="ENV_URL + '/files/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="userDataFrom.avatar_url" :src="userDataFrom.avatar_url" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="showAddOrEditPage = false">取消</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm(userDataFromRef)">确认</el-button>
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
  ElIcon,
  ElPagination,
  ElForm,
  ElFormItem,
  ElUpload,
  ElRadio,
  ElRadioGroup,
  ElRadioButton
} from 'element-plus'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import type { FormInstance, UploadProps } from 'element-plus'

const store = useStore()

const ENV_URL = process.env.VUE_APP_BASE_URL

// 获取搜索框实例
const dataSearchRef = ref<InstanceType<typeof DataSearch>>()
const searchValue = computed(() => dataSearchRef.value?.searchValue)

// 获取并监听用户数据
const userInfo = computed(() => store.state.user.userInfo)

// 弹出框标题
const dialogTitle = ref('新增用户')

// 展示新增或编辑框
const showAddOrEditPage = ref(false)

const userDataFromRef = ref<FormInstance>()

type userDataFromType<T> = {
  [key: string]: T | undefined
}

// 判断新增还是更新
const isAddOrUpdate = ref('add')

// 隐藏密码框
const noHiddenPWD = ref(true)

// 删除操作提示框
const delectDialogVisible = ref(false)
// 删除或更新的用户id
const deleteOrUpdateUserId = ref()

// 新增用户表单数据
const userDataFrom = reactive<userDataFromType<string | number>>({
  username: '',
  password: '',
  status: 1,
  role: 'ordinary',
  create_time: '',
  avatar_url: ''
})

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  // showAddOrEditPage.value = false
  // 表单验证
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('表单验证通过')
      ;(async function () {
        // 发起请求添加用户
        if (isAddOrUpdate.value == 'add') {
          await store.dispatch('login/userRegister', userDataFrom)
          showAddOrEditPage.value = store.state.login.showAddInfoDialog
        }
        if (isAddOrUpdate.value == 'update') {
          await store.dispatch('user/updateUser', {
            id: deleteOrUpdateUserId.value,
            ...userDataFrom
          })
          showAddOrEditPage.value = store.state.user.showAddInfoDialog
        }

        // 获取用户最新信息
        await store.dispatch('user/getUserAll')
      })()
    } else {
      console.log('表单验证不通过')
      return false
    }
  })
}
// 重置表单
const resetForm = () => {
  // 清空表单
  Object.keys(userDataFrom).forEach((key) => {
    userDataFrom[key] = undefined
  })
}

// 文件上传成功后回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
  userDataFrom.avatar_url = response.data
  console.log(userDataFrom.avatar_url)
}

// 修改分页器要求个数
const handleSizeChange = (pageSize: number) => {
  store.dispatch('user/getUserAll', {
    pageNumber: userInfo.value.current,
    pageSize: pageSize,
    username: searchValue.value
  })
}

// 修改分页器要求页数
const handleCurrentChange = (currentPage: number) => {
  store.dispatch('user/getUserAll', {
    pageNumber: currentPage,
    pageSize: userInfo.value.size,
    username: searchValue.value
  })
}

// 点击新增事件
const addUser = () => {
  showAddOrEditPage.value = true
  dialogTitle.value = '新增用户信息'
  isAddOrUpdate.value = 'add'
  // 清空表单
  Object.keys(userDataFrom).forEach((key) => {
    userDataFrom[key] = undefined
  })
}

// 编辑
const editUser = (userDataFromItem: userDataFromType<string | number>) => {
  showAddOrEditPage.value = true
  noHiddenPWD.value = false
  dialogTitle.value = '更新用户信息'
  // 编辑水果id
  deleteOrUpdateUserId.value = userDataFromItem.id
  isAddOrUpdate.value = 'update'
  Object.keys(userDataFrom).forEach((key) => {
    userDataFrom[key] = userDataFromItem[key]
  })
}

// 删除
const deleteUser = (userId: number) => {
  delectDialogVisible.value = true
  deleteOrUpdateUserId.value = userId
}
// 确认删除
const confirmDelete = () => {
  ;(async function () {
    // 删除
    await store.dispatch('user/deleteUser', deleteOrUpdateUserId.value)
    // 获取用户最新信息
    await store.dispatch('user/getUserAll')
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
  --el-pagination-hover-color: @main-color;
}

:deep(.el-form-item__label) {
  justify-content: center;
  flex: 1;
}
:deep(.el-form-item__content) {
  flex: 5;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
