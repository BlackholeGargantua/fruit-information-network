<template>
  <el-form scroll-to-error :model="account" label-width="60px" ref="formRef" :rules="rules">
    <el-form-item label="账号" prop="username">
      <el-input v-model="account.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="account.confirmPassword" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from '@/store'

import { AccountRegister } from '../types'
import { registerRules } from '../account-config'

import { ElInput, ElForm, ElFormItem } from 'element-plus'

export default defineComponent({
  components: {
    ElInput,
    ElForm,
    ElFormItem
  },
  setup() {
    const store = useStore()

    const account = reactive<AccountRegister>({
      username: '',
      password: '',
      confirmPassword: ''
    })

    // 绑定表单
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 点击注册后触发
    const registerAction = () => {
      // 验证表单
      formRef.value?.validate((valid) => {
        // 判断验证是否通过
        if (valid) {
          // 发起请求注册用户
          store.dispatch('login/userRegister', account)
        }
      })
      // 不管有无结果5秒后关闭按钮动画
      setTimeout(() => {
        if (store.state.login.token) store.commit('login/changeShowLoginPage', false)
      }, 5000)
    }

    // 表单验证规则
    const rules = {
      ...registerRules,
      confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9]{3,}$/, message: '必须是3位以上数字或字母', trigger: 'blur' },
        {
          validator: (rule: any, value: any, callback: any) => {
            if (value !== account.password) {
              callback(new Error('两次输入的密码不一样'))
            } else {
              callback()
            }
          },
          message: '两次输入的密码不一样',
          trigger: 'blur'
        }
      ]
    }

    return { account, formRef, rules, registerAction }
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
</style>
