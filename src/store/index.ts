import { createStore, Store, useStore as useVuexStore } from 'vuex'
import axios from 'axios'

import { IRootState, IStoreType, IRequestQueryType } from './type'
import login from './login'
import user from './user-manage'
import fruit from './fruit'
import information from './information'

const store = createStore<IRootState>({
  state: { fruitInfo: {}, banner: [], mainSearchValue: '' },
  getters: {},
  mutations: {
    changeFruitInfo(state, payload) {
      state.fruitInfo = payload
    },
    // 修改bannner
    changeBanner(state, payload) {
      state.banner = payload
    },
    // 首页搜索框的值
    changeMainSearchValue(state, payload) {
      state.mainSearchValue = payload
    }
  },
  actions: {
    // 获取水果分类或全部信息，默认查询 1页20条
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
    },
    // 水果搜索分页，默认查询 1页20条
    async getFruitNamePage(
      { commit },
      payload: IRequestQueryType = { pageNumber: 1, pageSize: 20 }
    ) {
      await axios
        .get('/fruitInfo/findPageAll', {
          params: {
            ...payload
          }
        })
        .then((res) => {
          const { data } = res.data
          commit('changeFruitInfo', data)
        })
    },
    // 获取banner信息
    async getBanners({ commit }) {
      await axios.get('/banner/all').then((res) => {
        if (res.data.code == '20000') {
          const { data } = res.data
          console.log('获取banner success', data)
          commit('changeBanner', data)
        }
      })
    }
  },
  modules: { fruit, login, information, user }
})

// 自定义一个Store，为了更好兼容ts类型（类型有提示）
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

// 挂载前执行获取用户信息
export function setupStore() {
  store.dispatch('login/tokenGetUserInfo')
}

export default store
