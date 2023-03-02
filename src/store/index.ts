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
    changeFruitInfo(state, payload) {
      state.fruitInfo = payload
    }
  },
  actions: {
    // 获取水果分类或全部信息，默认查询 1页10条
    async getFruitAllTypeInfo(
      { commit },
      payload: IRequestQueryType = { pageNumber: 1, pageSize: 20 }
    ) {
      await axios
        .get('/fruitInfo/findAllType', {
          params: {
            ...payload
          }
        })
        .then((res) => {
          const { data } = res.data
          commit('changeFruitInfo', data)
        })
    }
  },
  modules: { fruit, login, user }
})

// 自定义一个Store，为了更好兼容ts类型（类型有提示）
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
