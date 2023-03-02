import { Module } from 'vuex'

import { IRootState } from '../type'
import IFruitState from './type'
import axios from 'axios'

const fruitMoudle: Module<IFruitState, IRootState> = {
  namespaced: true,
  state() {
    return {
      fruitDetail: {}
    }
  },
  mutations: {
    changeFruitDetail(state, payload) {
      state.fruitDetail = payload
    }
  },
  actions: {
    // 获取某个水果的信息
    async getFruitDetai({ commit }, payload) {
      await axios
        .get('/fruitInfo/findName', {
          params: {
            fruitName: payload
          }
        })
        .then((res) => {
          const { data } = res.data
          commit('changeFruitDetail', data)
        })
        .catch((err) => console.log(err))
    }
  }
}

export default fruitMoudle
