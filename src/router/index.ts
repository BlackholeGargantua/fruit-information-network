import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import localCache from '@/utils/cache'

// 引入main-nav路由导航内容
import mainContent from './home/main-content'

// 后台管理路由
import backupNav from './backup'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/HomeView.vue'),
    children: mainContent
  },
  {
    path: '/fruit-info',
    name: 'fruit-info',
    component: () => import('@/views/fruit-info/FruitInfoView.vue')
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('@/views/information/InformationView.vue')
  },
  {
    path: '/backup',
    name: 'backup',
    component: () => import('@/views/backup/BackupView.vue'),
    children: backupNav,
    beforeEnter: async (to, from, next) => {
      const localToken = localCache.getCache('token')
      if (localToken) {
        // 请求用户信息
        await store.dispatch('login/tokenGetUserInfo')
        // 判断用户权限
        if (store.state.login.userPersonalInfo.role === 'admin') {
          next()
        } else next('/home')
      } else next('/home')
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/**
 * 路由守卫
 * 进入后台管理系统之前要现在首页登录获取到用户权限 admin
 */
// router.beforeEach((to, from, next) => {
//   if (to.path == '/backup') {
//     const localToken = localCache.getCache('token')
//     if (localToken) {
//       store.dispatch('login/tokenGetUserInfo')
//       console.log(store.state.login.userPersonalInfo.role)
//       if (store.state.login.userPersonalInfo.role === 'admin') {
//         return next()
//       } else return '/home'
//     }
//   }
// })

export default router
