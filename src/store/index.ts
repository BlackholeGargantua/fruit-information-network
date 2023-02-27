import { createStore, Store, useStore as useVuexStore } from 'vuex'
import axios from 'axios'

import { IRootState, IStoreType, IRequestQueryType } from './type'
import login from './login'
import user from './user'
import fruit from './fruit'

const store = createStore<IRootState>({
  state: { fruitInfo: {} },
  getters: {},
  mutations: {
    changeFruitInfo(state, data) {
      state.fruitInfo = data
    }
  },
  actions: {
    // 获取水果信息，默认查询 1页10条
    async getFruitInfo({ commit }, payload: IRequestQueryType = { pageNumber: 1, pageSize: 20 }) {
      await axios
        .get('/fruitInfo/findAll', {
          params: {
            pageNumber: payload.pageNumber,
            pageSize: payload.pageSize
          }
        })
        .then((res) => {
          const { data } = res.data
          commit('changeFruitInfo', data)
        })
    },
    // 获取水果分类信息
    async getFruitTypeInfo(
      { commit },
      payload: IRequestQueryType = { pageNumber: 1, pageSize: 20 }
    ) {
      await axios
        .get('/fruitInfo/findTypePage', {
          params: {
            pageNumber: payload.pageNumber,
            pageSize: payload.pageSize,
            fruitType: payload.fruitType
          }
        })
        .then((res) => {
          const { data } = res.data
          commit('changeFruitInfo', data)
        })
    }
  },
  modules: { login, user, fruit }
})

// 自定义一个Store，为了更好兼容ts类型（类型有提示）
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
