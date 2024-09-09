import request from "@/utils/request"
import { HospitalInfoResponseData } from "./type"


enum API {
  // 获取医院详情信息的接口地址
  HOSPITAL_INFO_URL = '/hosp/hospital/',
}

//获取医院详情信息的接口
export const reqHospitalInfo = (hoscode: string) => request.get<any,HospitalInfoResponseData>(API.HOSPITAL_INFO_URL + hoscode)