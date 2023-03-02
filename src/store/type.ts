import ILoginState from './login/type'
import IUserState from './user/type'
import IFruitState from './fruit/type'

// 发起请求获取 fruitInfo信息 参数类型，
export interface IRequestQueryType {
  pageNumber: number
  pageSize: number
  fruitType?: string
}

// 根store类型
export interface IRootState {
  [key: string]: any // 字段扩展声明
}

// 根的子模块类型
export interface IRootWithMoudle {
  fruit: IFruitState
  login: ILoginState
  user: IUserState
}

// 合并类型并导出
export type IStoreType = IRootState & IRootWithMoudle
