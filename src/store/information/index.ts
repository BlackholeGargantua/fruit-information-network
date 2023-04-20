import { Module } from 'vuex'

import { IRootState } from '../type'
import IInformationState from './type'
import axios from 'axios'

const fruitMoudle: Module<IInformationState, IRootState> = {
  namespaced: true,
  state() {
    return {
      information: {}
    }
  },
  mutations: {
    // 修改资讯信息
    changeInformation(state, payload) {
      state.information = payload
    }
  },
  actions: {
    // 获取资讯分页信息
    async getInformation({ commit }, payload) {
      await axios
        .get('/information/findPageAll', { params: { ...payload } })
        .then((res) => {
          if (res.data.code === '20000') {
            const { data } = res.data
            console.log(data, '资讯信息')
            commit('changeInformation', data)
          }
        })
        .catch((err) => console.log(err))
    }
  }
}

export default fruitMoudle
