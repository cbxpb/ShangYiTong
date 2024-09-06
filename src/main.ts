// vue3框架提供的方法 createApp ，用来创建一个应用实例
import { createApp } from 'vue'
// 引入清除默认样式
import '@/style/reset.scss'
// 引入App组件
import App from './App.vue'
// 引入全局组件 -- 顶部、底部
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
// 利用 createApp 方法创建一个应用实例，且将应用实例挂载到 #app 这个节点上
const app = createApp(App)
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.mount('#app')
