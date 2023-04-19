import { Module } from 'vuex'

import elMessage from '@/hooks/el-message'

import { IRootState, IRequestQueryType } from '../type'
import IUserState from './type'
import axios from 'axios'

const loginModule: Module<IUserState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      showAddInfoDialog: true
    }
  },
  mutations: {
    changeUser(state, data) {
      state.userInfo = data
    },
    changeShowDialog(state, payload) {
      state.showAddInfoDialog = payload
    }
  },
  actions: {
    // 获取用户分类或全部信息，默认查询 1页10条
    async getUserAll({ commit }, payload: IRequestQueryType = { pageNumber: 1, pageSize: 10 }) {
      await axios
        .get('/user/findPageAll', {
          params: {
            ...payload
          }
        })
        .then((res) => {
          const { data } = res.data
          commit('changeUser', data)
        })
    },
    // 更新用户
    async updateUser({ commit }, paylod: any) {
      await axios.put('/user/update', { ...paylod }).then((res) => {
        if (res.data.code === '20000') {
          elMessage({ message: '更新成功', type: 'success' })
          commit('changeShowDialog', false)
        } else elMessage({ message: '更新失败，请重试！', type: 'error', duration: 2000 })
      })
    },
    // 删除用户信息
    async deleteUser(state, id) {
      await axios.delete(`/user/delete/${id}`).then((res) => {
        if (res.data.code === '20000') elMessage({ message: '删除成功', type: 'success' })
        else if (res.data.code === '-1')
          elMessage({ message: '删除失败', type: 'warning', duration: 2000 })
        else elMessage({ message: '操作异常，请重试！', type: 'error', duration: 2000 })
      })
    },
    // 新增用户浏览记录
    async addUserHistory(state, payload) {
      await axios.post('/historys/insert', { ...payload }).then((res) => {
        if (res.data.code === '20000') {
          state.dispatch('login/getHistory', null, { root: true })
          console.log('新增用户浏览记录成功', payload)
        }
      })
    },
    // 新增用户收藏记录
    async addUserfavoriteRecords(state, payload) {
      await axios.post('/favorites/insert', { ...payload }).then((res) => {
        if (res.data.code === '20000') {
          state.dispatch('login/getfavoriteRecords', null, { root: true })
          console.log('新增收藏浏览记录成功', payload)
        }
      })
    },
    // 删除用户收藏记录
    async deleteUserfavoriteRecords(state, payload) {
      await axios
        .delete('/favorites/delete', { params: { uid: payload.uid, id: payload.id } })
        .then((res) => {
          if (res.data.code === '20000') {
            state.dispatch('login/getfavoriteRecords', null, { root: true })
            console.log('删除收藏记录成功', payload)
          }
        })
    }
  }
}

export default loginModule
