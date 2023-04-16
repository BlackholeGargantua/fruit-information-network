// 系统管理子路由
import systemManageChildren from './system-manage'

export default [
  {
    path: 'system-overview',
    name: 'system-overview',
    component: () => import('@/views/backup/system-overview/SystemOverview.vue')
  },
  {
    path: 'system-manage',
    name: 'system-manage',
    children: systemManageChildren
  },
  {
    path: 'data-statistics',
    name: 'data-statistics',
    component: () => import('@/views/backup/data-statistics/DataStatistics.vue')
  }
]
