export interface IFruitDetail {
  id?: number
  scientific_name?: string
  type?: string
  pinyin?: string
  english_name?: string
  alias?: string
  views?: number
  update_time?: string
  essential_information?: string
  distribution_area?: string
  mature_period?: string
  nutritive_value?: string
  selection_method?: string
  edible_method?: string
  saving_method?: string
  planting_method?: string
  matters_needing_attention?: string
  img_url?: string
}
export default interface IFruitState {
  fruitDetail: IFruitDetail
}
