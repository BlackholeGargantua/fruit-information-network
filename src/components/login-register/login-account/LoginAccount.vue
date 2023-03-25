<template>
  <el-form scroll-to-error :model="account" label-width="60px" ref="formRef" :rules="loginRules">
    <el-form-item label="账号" prop="username">
      <el-input v-model="account.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from '@/store'

import localCache from '@/utils/cache'

import { AccountLogin } from '../types'
import { loginRules } from '../account-config'

import { ElInput, ElForm, ElFormItem } from 'element-plus'
import 'element-plus/es/components/message/style/css'

export default defineComponent({
  components: {
    ElInput,
    ElForm,
    ElFormItem
  },
  setup() {
    const store = useStore()

    // 账号密码
    const account = reactive<AccountLogin>({
      username: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // 绑定表单
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 点击登录后触发
    const loginAction = (isKeep: boolean) => {
      // 验证表单
      formRef.value?.validate((valid) => {
        // 判断验证是否通过
        if (valid) {
          // 是否选了记住密码
          if (isKeep) {
            localCache.setCache('name', account.username)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 发起请求获取用户数据
          store.dispatch('login/userLogin', account)
        }
      })
    }

    return { account, loginRules, formRef, loginAction }
  }
})
</script>

<style lang="less" scoped>
@import url('@/style');
:deep .el-form-item {
  .el-form-item__label {
    flex: 3;
    color: @main-color;
  }
  .el-form-item__content {
    flex: 8;
  }
  .el-input {
    --el-input-focus-border-color: @option-color;
  }
}

::deep .example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
