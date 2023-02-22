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
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/member/personalCenter/index'),
    meta: {
      title: '个人中心'
    },
    children: [
      
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/member/order/index'),
    meta: {
      title: '我的订单'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router