import { ITablePropsListType } from '../../types'

import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

export const tableProps: ITablePropsListType = [
  { prop: 'username', label: '用户名', minWidth: 150 },
  { prop: 'status', label: '状态', minWidth: 100, slotName: 'status' },
  { prop: 'avatar_url', label: '头像地址', minWidth: 150, slotName: 'avatar' },
  { prop: 'create_time', label: '创建时间', minWidth: 150 },
  { label: '操作', fixed: 'right', minWidth: 200, slotName: 'handler' }
]

// 表单规则
export const rules = reactive<FormRules>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z_.]{3,15}$/,
      message: '长度3~15的中文、字母、下划线和点',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9\s.,$-]{3,}$/,
      message: '必须是3位以上数字或字母及.,$-',
      trigger: 'blur'
    }
  ]
})
