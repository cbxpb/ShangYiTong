import request from "@/utils/request"
import { HospitalInfoResponseData, DeparmentResponseData, CodeResponseData, LoginResponseData, LoginData, WXLoginResponseData } from "./type"


enum API {
  // 获取医院详情信息的接口地址
  HOSPITAL_INFO_URL = '/hosp/hospital/',
  //获取某一个医院的科室数据的接口地址
  HOSPITAL_DEPARMENT_URL = '/hosp/hospital/department/',
  //获取验证码接口
  USER_CODE_URL = '/sms/send/',
  //用户登录接口
  USER_LOGIN_URL = '/user/login',
  //获取微信扫码登录需要参数
  WXLOGIN_URL = '/user/weixin/getLoginParam/',
}

//获取医院详情信息的接口
export const reqHospitalInfo = (hoscode: string) => request.get<any, HospitalInfoResponseData>(API.HOSPITAL_INFO_URL + hoscode)

// 获取某一个医院的科室数据的接口
export const reqHospitalDeparment = (hoscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITAL_DEPARMENT_URL + hoscode)

//获取验证码接口
export const reqSendCode = (phone: string) => request.get<any, CodeResponseData>(API.USER_CODE_URL + phone)

// 用户登录接口
export const reqLogin = (data: LoginData) => request.post<any, LoginResponseData>(API.USER_LOGIN_URL, data)

//获取微信扫码登录生成二维码需要的参数接口
export const reqWxLogin = (wxRedirectUri: string) => request.get<any, WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`);