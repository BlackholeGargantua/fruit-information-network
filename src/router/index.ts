import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 引入main-nav路由导航内容
import mainContent from './home/main-content'

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
    path: '/info',
    name: 'info',
    component: () => import('@/views/info/InfoView.vue')
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

export default router
