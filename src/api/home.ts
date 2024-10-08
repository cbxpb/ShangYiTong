// 统一管理首页模块接口
import request from "@/utils/request"
import { HospitalResponseData, HospitalLevelAndRegionResponseData, HospitalByNameResponseData } from "./type"
// 通过，枚举管理首页模块接口地址
enum API {
  // 获取已有医院的数据接口地址
  HOSPITAL_URL = 'hosp/hospital/',
  // 获取医院的等级与地区接口地址
  HOSPITAL_LEVEL_AND_REGION_URL = '/cmn/dict/findByDictCode/',
  // 根据医院名称获取医院列表
  HOSPITAL_NAME_URL = '/hosp/hospital/findByHosname/',
}

// 分页获取医院数据
export const reqHospital = (page: number, limit: number, hostype: string = '', districtCode: string = '') => request.get<any, HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)

// 获取医院等级与地区
export const reqHospitalLevelAndRegion = (dictCode: string) => request.get<any, HospitalLevelAndRegionResponseData>(API.HOSPITAL_LEVEL_AND_REGION_URL + dictCode)

// 根据医院名称获取医院列表
export const reqHospitalByName = (hosname: string) => request.get<any, HospitalByNameResponseData>(API.HOSPITAL_NAME_URL + hosname)