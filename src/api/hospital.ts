import request from "@/utils/request"
import { HospitalInfoResponseData, DeparmentResponseData, CodeResponseData, LoginResponseData, LoginData, WXLoginResponseData, HospitalWordResponseData, DoctorResponseData, UserResponseData, DoctorInfoResponseData } from "./type"


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
  //获取某一个医院的某一个科室预约挂号数据
  HOSPITAL_WORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
  //获取医院某一个科室某一天相应医生排班的数据
  HOSPITAL_DOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
  //获取某一个账号下就诊人的信息
  GET_USER_URL = '/user/patient/auth/findAll',
  //获取挂号医生的信息
  GET_DOCTOR_URL = '/hosp/hospital/getSchedule/'
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

//获取预约挂号的数据
export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, HospitalWordResponseData>(API.HOSPITAL_WORK_URL + `${page}/${limit}/${hoscode}/${depcode}`)

//获取医生排班的数据
export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string) => request.get<any, DoctorResponseData>(API.HOSPITAL_DOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)

// 获取某一个账号下就诊人的信息
export const reqGetUser = () => request.get<any, UserResponseData>(API.GET_USER_URL)

//获取挂号医生的信息
export const reqDoctorInfo = (scheduleId: string) => request.get<any, DoctorInfoResponseData>(API.GET_DOCTOR_URL + scheduleId)