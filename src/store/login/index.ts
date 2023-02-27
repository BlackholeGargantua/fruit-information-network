import { Module } from 'vuex'

import { IRootState } from '../type'
import ILoginState from './type'
// import axios from 'axios'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      data: []
    }
  },
  mutations: {},
  actions: {
    // getUser({ commit }) {
    //   axios.get('/user/all').then((res) => {
    //     console.log(res)
    //   })
    // }
  }
}

export default loginModule
