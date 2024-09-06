// vue3框架提供的方法 createApp ，用来创建一个应用实例
import { createApp } from 'vue'
// 引入App组件
import App from './App.vue'
// 利用 createApp 方法创建一个应用实例，且将应用实例挂载到 #app 这个节点上
createApp(App).mount('#app')
