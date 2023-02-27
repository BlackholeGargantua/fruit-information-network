import { Module } from 'vuex'

import { IRootState } from '../type'
import { IFruitState } from './type'

const fruitMoudle: Module<IFruitState, IRootState> = {
  namespaced: true,
  state() {
    return {}
  },
  mutations: {},
  actions: {}
}

export default fruitMoudle
