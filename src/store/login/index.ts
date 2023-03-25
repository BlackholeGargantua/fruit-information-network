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
      token: '',
      userPersonalInfo: {}
    }
  },
  mutations: {
    // 是否展示 login/register 页面
    changeShowButtonLoading(state, paylod) {
      state.showButtonLoading = paylod
    },
    // 是否展示 按钮动画
    changeShowLoginPage(state, paylod) {
      state.showLoginPage = paylod
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
    }
  },
  actions: {
    // token获取用户信息
    async tokenGetUserInfo({ commit }) {
      const locatToken = localCache.getCache('token')
      await axios.get('/user/info', { params: { token: locatToken } }).then((res) => {
        if (res.data.code === '20000') {
          commit('changeUserInfo', { userPersonalInfo: res.data.data, token: locatToken })
        }
      })
    },
    // 登录
    async userLogin({ commit }, paylod: any) {
      await axios.post('/user/login', paylod).then((res) => {
        if (res.data.code === '20000') {
          commit('changeUserInfoAndToken', res.data.data)
          elMessage({ message: '登录成功', type: 'success' })
        } else if (res.data.code === '0') elMessage({ message: res.data.msg, type: 'error' })
        else if (res.data.code === '-1') elMessage({ message: res.data.msg, type: 'error' })
        // 关闭按钮动画
        commit('changeShowButtonLoading', false)
      })
    },
    // 注册
    async userRegister({ commit }, paylod: any) {
      await axios
        .post('/user/register', { username: paylod.username, password: paylod.password })
        .then((res) => {
          if (res.data.code === '20000') elMessage({ message: '账号注册成功', type: 'success' })
          else if (res.data.code === '-1')
            elMessage({ message: '该用户名已存在', type: 'warning', duration: 2000 })
          else elMessage({ message: '账号注册失败，请重试！', type: 'error', duration: 2000 })
          // 关闭按钮动画
          commit('changeShowButtonLoading', false)
        })
    }
  }
}

export default loginModule
