import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

// 登录表单验证规则
export const loginRules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,15}$/, message: '必须是3~15个字母或者数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上数字或字母', trigger: 'blur' }
  ]
}

// 注册表单验证规则
export const registerRules = reactive<FormRules>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,15}$/, message: '必须是3~15个字母或者数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上数字或字母', trigger: 'blur' }
  ]
})
