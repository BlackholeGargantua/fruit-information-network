type fruitInfoType = {
  [key: string]: any // 字段扩展声明
  // id
  id?: number
  // 学名
  scientific_name?: string
  // 拼音
  pinyin?: string
  // 英文名
  english_name?: string
  // 别称
  nick_name?: string
  // 查阅量
  views?: number
  // 更新时间
  update_time?: string
  // 基本信息
  essential_information?: string
  // 分布地区
  distribution_area?: string
  // 成熟期
  mature_period?: string
  // 营养价值
  nutritive_value?: string
  // 挑选方法
  selection_method?: string
  // 食用方法
  edible_method?: string
  // 保存方法
  saving_method?: string
  // 种植方法
  planting_method?: string
  // 注意事项
  matters_needing_attention?: string
}

export { fruitInfoType }
