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
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router