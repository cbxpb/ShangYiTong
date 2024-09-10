// 医院详情信息的数据仓库
import { reqHospitalDeparment, reqHospitalInfo } from '@/api/hospital'
import { HospitalInfo, HospitalInfoResponseData, DeparmentResponseData, DeparmentArr } from '@/api/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHospitalInfoStore = defineStore('hospitalInfo', () => {
  // 初始化医院详情信息数据
  const hospitalInfo = ref<HospitalInfo | null>(null)
  // 初始化医院科室数据
  const departmentList = ref<DeparmentArr>([])
  // 存储 hoscode 信息,用于缓存
  const hoscode = ref<string>('')
  // 获取医院详情的方法
  const getHospitalInfo = async (hcode: string) => {
    // TODO: 调用接口获取医院详情信息
    let res: HospitalInfoResponseData = await reqHospitalInfo(hcode)
    if (res.code === 200) {
      // 存储hoscode信息
      hoscode.value = hcode
      // 存储医院详情信息
      hospitalInfo.value = res.data
    }
  }
  // 获取医院科室信息的方法
  const getDeparment = async (hcode: string) => {
    // TODO: 调用接口获取医院科室信息
    let res: DeparmentResponseData = await reqHospitalDeparment(hcode)
    if (res.code === 200) {
      // 存储医院科室信息
      departmentList.value = res.data
    }
  }
  return {
    hoscode,
    hospitalInfo,
    departmentList,
    getHospitalInfo,
    getDeparment,
  }
})
