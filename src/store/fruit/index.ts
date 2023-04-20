import { Module } from 'vuex'
import cache from '@/utils/cache'
import elMessage from '@/hooks/el-message'

import { IRootState } from '../type'
import IFruitState from './type'
import axios from 'axios'

const fruitMoudle: Module<IFruitState, IRootState> = {
  namespaced: true,
  state() {
    return {
      fruitDetail: {},
      allFruitInfo: [],
      showAddInfoDialog: true
    }
  },
  mutations: {
    // 修改所有水果信息
    changeAllFruit(state, payload) {
      state.allFruitInfo = payload
      cache.setCache('allFruitInfo', payload)
    },
    // 修改某个水果信息
    changeFruitDetail(state, payload) {
      state.fruitDetail = payload
    },
    changeShowDialog(state, payload) {
      state.showAddInfoDialog = payload
    }
  },
  actions: {
    // 获取全部水果信息
    async getAllFruit({ commit }) {
      await axios
        .get('/fruitInfo/all')
        .then((res) => {
          const { data } = res.data
          commit('changeAllFruit', data)
        })
        .catch((err) => console.log(err))
    },
    // 获取某个水果的信息
    async getFruitDetai({ commit }, payload) {
      commit('changeShowDialog', false)
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
    },
    // 添加水果信息
    async fruitAdd(state, paylod: any) {
      await axios.post('/fruitInfo/insert', { ...paylod }).then((res) => {
        console.log(res)
        if (res.data.code === '20000') {
          elMessage({ message: '添加水果信息成功', type: 'success' })
          state.commit('changeShowDialog', false)
        } else if (res.data.code === '-1')
          elMessage({ message: '该水果已存在', type: 'warning', duration: 2000 })
        else elMessage({ message: '添加水果失败，请重试！', type: 'error', duration: 2000 })
      })
    },
    // 更新水果信息
    async updateFruitInfo({ commit }, paylod: any) {
      console.log(paylod)
      await axios.put('/fruitInfo/update', { ...paylod }).then((res) => {
        if (res.data.code === '20000') {
          elMessage({ message: '更新成功', type: 'success' })
          commit('changeShowDialog', false)
        } else elMessage({ message: '更新失败，请重试！', type: 'error', duration: 2000 })
      })
    },
    // 删除水果信息
    async deleteFruitInfo(state, id) {
      await axios.delete(`/fruitInfo/delete/${id}`).then((res) => {
        if (res.data.code === '20000') elMessage({ message: '删除成功', type: 'success' })
        else if (res.data.code === '-1')
          elMessage({ message: '删除失败', type: 'warning', duration: 2000 })
        else elMessage({ message: '操作异常，请重试！', type: 'error', duration: 2000 })
      })
    }
  }
}

export default fruitMoudle
