import { defineStore } from "pinia"
import { ref } from "vue"
import { reqSendCode, reqLogin } from '@/api/hospital'
import { CodeResponseData, LoginData, LoginResponseData, UserInfo } from '@/api/type'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/user"

export const useUserStore = defineStore('user', () => {
  // 控制用户登录弹窗的显示与隐藏
  const visiable = ref<boolean>(false)
  // 保存验证码
  const code = ref<string>('')
  const userInfo = ref<UserInfo>(JSON.parse(GET_TOKEN() as string) || {} as UserInfo)
  // 获取验证码
  const getCode = async (phone: string) => {
    // TODO: 调用接口获取验证码
    const res: CodeResponseData = await reqSendCode(phone)
    if (res.code === 200) {
      if (res.data) {
        code.value = res.data
      }
      return "ok"
    } else {
      return Promise.reject(new Error(res.message))
    }
  }
  // 手机号登录
  const userLogin = async (loginData: LoginData) => {
    // TODO: 调用接口进行登录
    const res: LoginResponseData = await reqLogin(loginData)
    if (res.code === 200) {
      userInfo.value = res.data
      SET_TOKEN(JSON.stringify(userInfo.value))
      return "ok"
    } else {
      return Promise.reject(new Error(res.message))
    }
  }
  // 退出登录
  const logout = () => {
    userInfo.value = { name: '', token: '' }
    REMOVE_TOKEN()
  }
  return {
    visiable,
    code,
    userInfo,
    getCode,
    userLogin,
    logout
  }
})