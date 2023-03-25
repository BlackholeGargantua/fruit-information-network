import { Module } from 'vuex'

import { IRootState } from '../type'
import IUserState from './type'
import axios from 'axios'

const loginModule: Module<IUserState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: []
    }
  },
  mutations: {
    changeUser(state, data: []) {
      state.userInfo = data
    }
  },
  actions: {
    async getUser({ commit }) {
      await axios.get('/user/all').then((res) => {
        const { data } = res.data
        commit('changeUser', data)
      })
    }
  }
}

export default loginModule
