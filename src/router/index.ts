// createRouter 方法用于创建路由器实例，可以管理多个路由配置
import { createRouter, createWebHistory } from "vue-router"
export default createRouter({
  // 路由的模式设置
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import('@/pages/home/index.vue')
    },
    {
      path: "/hospital",
      component: () => import('@/pages/hospital/index.vue')
    },
    {
      path: "/",
      redirect: "/home"
    }
  ],
  // 滚动行为：当切换路由时，页面滚动到顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
})