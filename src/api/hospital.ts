import request from "@/utils/request"
import { HospitalInfoResponseData, DeparmentResponseData } from "./type"


enum API {
  // 获取医院详情信息的接口地址
  HOSPITAL_INFO_URL = '/hosp/hospital/',
  //获取某一个医院的科室数据的接口地址
  HOSPITAL_DEPARMENT_URL = '/hosp/hospital/department/'
}

//获取医院详情信息的接口
export const reqHospitalInfo = (hoscode: string) => request.get<any, HospitalInfoResponseData>(API.HOSPITAL_INFO_URL + hoscode)

// 获取某一个医院的科室数据的接口
export const reqHospitalDeparment = (hoscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITAL_DEPARMENT_URL + hoscode)