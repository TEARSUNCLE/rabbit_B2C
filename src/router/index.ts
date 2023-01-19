import { RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    // redirect: '/',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router