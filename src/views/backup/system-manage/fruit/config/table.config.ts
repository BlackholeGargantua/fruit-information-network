import { ITablePropsListType } from '../../types'

import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

export const tableProps: ITablePropsListType = [
  { prop: 'scientific_name', label: '学名', minWidth: 120 },
  { prop: 'img_url', label: '图片', minWidth: 150, slotName: 'imgUrl' },
  { prop: 'type', label: '类别', minWidth: 120 },
  { prop: 'pinyin', label: '拼音', minWidth: 120 },
  { prop: 'english_name', label: '英文名', minWidth: 150 },
  { prop: 'alias', label: '别称', minWidth: 200 },
  { prop: 'views', label: '查阅量', minWidth: 120 },
  { prop: 'update_time', label: '更新时间', minWidth: 300 },
  { prop: 'essential_information', label: '基本信息', minWidth: 300 },
  { prop: 'distribution_area', label: '分布地区', minWidth: 300 },
  { prop: 'mature_period', label: '成熟期', minWidth: 300 },
  { prop: 'nutritive_value', label: '营养价值', minWidth: 300 },
  { prop: 'selection_method', label: '挑选方法', minWidth: 300 },
  { prop: 'edible_method', label: '食用吃法', minWidth: 300 },
  { prop: 'saving_method', label: '保存方法', minWidth: 300 },
  { prop: 'planting_method', label: '种植方法', minWidth: 300 },
  { prop: 'matters_needing_attention', label: '注意事项', minWidth: 300 },
  { label: '操作', fixed: 'right', minWidth: 200, slotName: 'handler' }
]

// 表单规则
export const rules = reactive<FormRules>({
  scientific_name: [
    { required: true, message: '学名不能为空', trigger: 'blur' },
    {
      pattern: /^[\u4E00-\u9FFF]+$/,
      message: '只限中文且不能有空格',
      trigger: 'blur'
    }
  ],
  type: [{ required: true, message: '需选择分类', trigger: 'change' }],
  pinyin: [
    { required: true, message: '拼音不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z\s]+$/, message: '只能输入英文字母', trigger: 'blur' },
    { pattern: /^[^\s].*$/, message: '不能以空格开头', trigger: 'blur' }
  ],
  english_name: [
    { pattern: /^[a-zA-Z\s]+$/, message: '只能输入英文字母', trigger: 'blur' },
    { pattern: /^[^\s].*$/, message: '不能以空格开头', trigger: 'blur' }
  ],
  views: [{ pattern: /^\d+$/, message: '只能输入英文字母', trigger: 'blur' }],
  essential_information: [
    { required: true, message: '不能为空', trigger: 'blur' },
    {
      pattern: /^[\u4E00-\u9FFF]+$/,
      message: '只限中文且不能有空格',
      trigger: 'blur'
    }
  ]
})
