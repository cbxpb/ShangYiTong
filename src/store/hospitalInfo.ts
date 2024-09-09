// 医院详情信息的数据仓库
import { reqHospitalInfo } from '@/api/hospital'
import { HospitalInfo, HospitalInfoResponseData } from '@/api/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHospitalInfoStore = defineStore('hospitalInfo', () => {
  // 初始化医院详情信息数据
  const hospitalInfo = ref<HospitalInfo | null>(null)
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
  return {
    hoscode,
    hospitalInfo,
    getHospitalInfo
  }
})
