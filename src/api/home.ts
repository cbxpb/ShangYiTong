// 统一管理首页模块接口
import request from "@/utils/request"
import { HospitalResponseData } from "./type"
// 通过，枚举管理首页模块接口地址
enum API {
  // 获取已有医院的数据接口地址
  HOSPITAL_URL = 'hosp/hospital/'
}

// 分页获取医院数据
export const reqHospital = (page: number, limit: number) => request.get<any, HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}`)