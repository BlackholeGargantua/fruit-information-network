export default [
  {
    // 全部
    path: '',
    name: 'all',
    component: () => import('@/views/home/main/ContentView.vue'),
    props: { showLayout: true }
  },
  {
    // 浆果类路由
    path: 'berries-content',
    name: 'berries',
    component: () => import('@/views/home/main/ContentView.vue'),
    props: { showLayout: false }
  },
  {
    // 瓜果类路由
    path: 'melonsFruits-content',
    name: 'melonsFruits',
    component: () => import('@/views/home/main/ContentView.vue'),
    props: { showLayout: false }
  },
  {
    // 柑橘类路由
    path: 'citrus-content',
    name: 'citrus',
    component: () => import('@/views/home/main/ContentView.vue'),
    props: { showLayout: false }
  },
  {
    // 柑橘类路由
    path: 'nutFrupes-content',
    name: 'nutFrupes',
    component: () => import('@/views/home/main/ContentView.vue'),
    props: { showLayout: false }
  },
  {
    // 热带水果类路由
    path: 'tropicalFruits-content',
    name: 'tropicalFruits',
    component: () => import('@/views/home/main/ContentView.vue'),
    props: { showLayout: false }
  }
]
