import axios from "axios"
import { ElMessage } from "element-plus"
import { useUserStore } from '@/store/user';

// 创建axios实例
const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
})

// 配置请求拦截器
request.interceptors.request.use((config) => {
  //获取用户仓库
  const userStore = useUserStore()
  //token:公共参数,如果用户登录了需要携带
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token
  }
  return config
}, (error) => {
  return Promise.reject(new Error(error.message))
})

// 配置响应拦截器
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  let status = error.response?.status
  switch (status) {
    case 404:
      ElMessage({
        showClose: true,
        message: '资源不存在!',
        type: 'error',
      })
      break;
    case 401:
      ElMessage({
        showClose: true,
        message: '登录过期，请重新登录!',
        type: 'error',
      })
      break;
    default:
      ElMessage({
        showClose: true,
        message: error.message,
        type: 'error',
      })
      break;
  }
  return Promise.reject(new Error(error.message))
})

export default request
