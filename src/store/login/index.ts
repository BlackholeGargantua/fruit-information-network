import { Module } from 'vuex'
import axios from 'axios'

import localCache from '@/utils/cache'
import elMessage from '@/hooks/el-message'

import { IRootState } from '../type'
import ILoginState from './type'

const loginModule: Module<ILoginState<any>, IRootState> = {
  namespaced: true,
  state() {
    return {
      showButtonLoading: false,
      showLoginPage: false,
      showAddInfoDialog: true,
      token: '',
      userPersonalInfo: {},
      historyRecords: [],
      favoriteRecords: []
    }
  },
  mutations: {
    // 是否展示 按钮动画
    changeShowButtonLoading(state, paylod) {
      state.showButtonLoading = paylod
    },

    // 是否展示 login/register 页面
    changeShowLoginPage(state, paylod) {
      state.showLoginPage = paylod
    },
    changeShowDialog(state, payload) {
      state.showAddInfoDialog = payload
    },

    // 保存用户信息
    changeUserInfo(state, paylod: any) {
      state.token = paylod.token
      state.userPersonalInfo = paylod.userPersonalInfo
    },
    // 保存用户信息和token
    changeUserInfoAndToken(state, paylod: any) {
      // 把token保存到本地缓存
      localCache.setCache('token', paylod.token)
      state.token = paylod.token
      state.userPersonalInfo = paylod.userInfo
    },

    // 保存历史记录
    changeHistoryRecords(state, paylod) {
      state.historyRecords = paylod.reverse()
    },
    // 保存收藏记录
    changeFavoriteRecords(state, paylod) {
      state.favoriteRecords = paylod.reverse()
    }
  },
  actions: {
    // token获取用户信息
    async tokenGetUserInfo(state) {
      const localToken = localCache.getCache('token')
      if (localToken) {
        await axios.get('/user/info', { params: { token: localToken } }).then((res) => {
          if (res.data.code === '20000' && JSON.stringify(res.data.data) != '{}') {
            state.commit('changeUserInfo', { userPersonalInfo: res.data.data, token: localToken })
            state.dispatch('getHistory')
            state.dispatch('getfavoriteRecords')
          } else if (res.data.code == '-2') {
            // token失效
            elMessage({ message: res.data.msg, type: 'error', duration: 2000 })
            // 清除失效的token
            localCache.deleteCache('token')
          }
        })
      }
    },
    // 登录
    async userLogin(state, paylod: any) {
      await axios.post('/user/login', paylod).then((res) => {
        if (res.data.code === '20000') {
          state.commit('changeUserInfoAndToken', res.data.data)
          elMessage({ message: '登录成功', type: 'success' })
          state.dispatch('getHistory')
          state.dispatch('getfavoriteRecords')
        } else if (res.data.code === '0') elMessage({ message: res.data.msg, type: 'error' })
        else if (res.data.code === '-1') elMessage({ message: res.data.msg, type: 'error' })
        // 关闭按钮动画
        state.commit('changeShowButtonLoading', false)
      })
    },
    // 注册
    async userRegister({ commit }, paylod: any) {
      await axios.post('/user/register', { ...paylod }).then((res) => {
        if (res.data.code === '20000') {
          elMessage({ message: '账号注册成功', type: 'success' })
          commit('changeShowDialog', false)
        } else if (res.data.code === '-1')
          elMessage({ message: '该用户名已存在', type: 'warning', duration: 2000 })
        else elMessage({ message: '账号注册失败，请重试！', type: 'error', duration: 2000 })
        // 关闭按钮动画
        commit('changeShowButtonLoading', false)
      })
    },
    // 获取用户历史记录
    async getHistory(state) {
      await axios
        .get('/historys/user', { params: { uid: state.state.userPersonalInfo.id } })
        .then((res) => {
          if (res.data.code === '20000') {
            console.log('获取用户历史记录 success')
            state.commit('changeHistoryRecords', res.data.data)
          }
        })
    },
    // 获取用户收藏记录
    async getfavoriteRecords(state) {
      await axios
        .get('/favorites/user', { params: { uid: state.state.userPersonalInfo.id } })
        .then((res) => {
          if (res.data.code === '20000') {
            console.log('获取用户收藏记录 success')
            state.commit('changeFavoriteRecords', res.data.data)
          }
        })
    }
  }
}

export default loginModule
