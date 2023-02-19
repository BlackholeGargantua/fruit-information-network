import { fruitInfoType } from '../src/type'

// 格式化成要展示的数据
export function fromatData(fruitInfoData: fruitInfoType) {
  const simpleInfo: any = []
  const mainInfo: any = []

  // 全部简单信息名字对应关系
  const allSimpleInfoNamesCorrespondence = new Map([
    ['scientific_name', '学名'],
    ['pinyin', '拼音'],
    ['english_name', '英文名'],
    ['nick_name', '别称'],
    ['views', '查阅量'],
    ['update_time', '更新时间']
  ])
  const allMainInfoTilesCorrespondence = new Map([
    ['essential_information', '基本信息'],
    ['distribution_area', '分布地区'],
    ['mature_period', '成熟期'],
    ['nutritive_value', '营养价值'],
    ['selection_method', '挑选方法'],
    ['edible_method', '食用吃法'],
    ['saving_method', '保存方法'],
    ['planting_method', '种植方法'],
    ['matters_needing_attention', '注意事项']
  ])
  Object.keys(fruitInfoData).forEach((key) => {
    if (allSimpleInfoNamesCorrespondence.has(key)) {
      simpleInfo.push({
        id: key,
        title: allSimpleInfoNamesCorrespondence.get(key),
        value: fruitInfoData[key]
      })
    } else if (allMainInfoTilesCorrespondence.has(key)) {
      mainInfo.push({
        id: key,
        title: allMainInfoTilesCorrespondence.get(key),
        value: fruitInfoData[key]
      })
    }
  })
  return { simpleInfo, mainInfo }
}
