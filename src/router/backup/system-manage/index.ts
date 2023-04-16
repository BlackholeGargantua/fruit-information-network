export default [
  {
    path: 'fruit',
    name: 'fruit',
    component: () => import('@/views/backup/system-manage/fruit/FruitView.vue')
  },
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/backup/system-manage/user/UserView.vue')
  }
]
