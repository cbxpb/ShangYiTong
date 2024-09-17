// vue3框架提供的方法 createApp ，用来创建一个应用实例
import { createApp } from 'vue'
// 引入路由
import router from '@/router'
// 引入清除默认样式
import '@/style/reset.scss'
// 引入App组件
import App from './App.vue'
// 引入全局组件 -- 顶部、底部、登录
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
// 引入 Element Plus (全局引入)
import ElementPlus from 'element-plus'
// 引入中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// 引入 pinia 仓库
import pinia from '@/store'
//引入路由鉴权的文件
import './permisstion'
// 利用 createApp 方法创建一个应用实例，且将应用实例挂载到 #app 这个节点上
const app = createApp(App)
// 全局注册组件
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
// 使用路由
app.use(router)
// 使用 Element Plus
app.use(ElementPlus, {
    locale: zhCn
})
// 使用 pinia
app.use(pinia)
app.mount('#app')