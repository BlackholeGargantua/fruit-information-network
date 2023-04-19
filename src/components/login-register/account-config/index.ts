import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

// 登录表单验证规则
export const loginRules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-z_.]{3,15}$/,
      message: '长度3~15的中文、字母、下划线和点',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{3,}$/, message: '必须是3位以上数字或字母', trigger: 'blur' }
  ]
}

// 注册表单验证规则
export const registerRules = reactive<FormRules>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{3,15}$/,
      message: '必须是3~15个中文、字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{3,}$/, message: '必须是3位以上数字或字母', trigger: 'blur' }
  ]
})
