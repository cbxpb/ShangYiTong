// createRouter 方法用于创建路由器实例，可以管理多个路由配置
import { createRouter, createWebHistory } from "vue-router"
export default createRouter({
  // 路由的模式设置
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import('@/pages/home/index.vue'),
      meta: { title: "首页" }
    },
    {
      path: "/hospital",
      component: () => import('@/pages/hospital/index.vue'),
      redirect: "/hospital/reservation",
      children: [
        {
          path: "reservation",
          component: () => import('@/pages/hospital/reservation/index.vue'),
          meta: { title: "预约挂号" }
        },
        {
          path: "detail",
          component: () => import('@/pages/hospital/detail/index.vue'),
          meta: { title: "医院详情" }
        },
        {
          path: "notice",
          component: () => import('@/pages/hospital/notice/index.vue'),
          meta: { title: "预约通知" }
        },
        {
          path: "information",
          component: () => import('@/pages/hospital/information/index.vue'),
          meta: { title: "停诊信息" }
        },
        {
          path: "search",
          component: () => import('@/pages/hospital/search/index.vue'),
          meta: { title: "查询" }
        },
        {
          path: 'reservation_step1',
          component: () => import('@/pages/hospital/reservation/register_step1.vue'),
          meta: {
            title: '预约第一步'
          }
        },
        {
          path: 'reservation_step2',
          component: () => import('@/pages/hospital/reservation/register_step2.vue'),
          meta: {
            title: '预约第二步'
          }
        },
      ]
    },
    {
      path: '/wxlogin',
      component: () => import('@/pages/wxlogin/index.vue'),
    },
    {
      path: "/user",
      component: () => import('@/pages/user/index.vue'),
      children: [
        {
          path: 'certification',
          component: () => import('@/pages/user/certification/index.vue'),
          meta: {
            title: '实名认证'
          }
        },
        {
          path: 'order',
          component: () => import('@/pages/user/order/index.vue'),
          meta: {
            title: '挂号订单'
          }
        },
        {
          path: 'patient',
          component: () => import('@/pages/user/patient/index.vue'),
          meta: {
            title: '就诊人管理'
          }
        },
        {
          path: 'profile',
          component: () => import('@/pages/user/profile/index.vue'),
          meta: {
            title: '账号信息'
          }
        },
        {
          path: 'feedback',
          component: () => import('@/pages/user/feedback/index.vue'),
          meta: {
            title: '信息反馈'
          }
        }
      ]
    },
    {
      path: "/",
      redirect: "/home"
    }
  ],
  // 滚动行为：当切换路由时，页面滚动到顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
})