// 定义接口返回数据的基础ts类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
/* ------------------------------------------------home页面数据的ts类型------------------------------------------------ */
// 代表已有的医院数据的ts类型
export interface Hospital {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    hostypeString: string,
    fullAddress: string
  },
  hoscode: string,
  hosname: string,
  hostype: string,
  provinceCode: string,
  cityCode: string,
  districtCode: string,
  address: string,
  logoData: string,
  intro: string,
  route: string,
  status: number,
  bookingRule: {
    cycle: number,
    releaseTime: string,
    stopTime: string,
    quitDay: number,
    quitTime: string,
    rule: Array<string>
  }
}
// 存储全部医院的ts类型
export type Content = Hospital[]
// 获取已有医院接口返回的数据ts类型
export interface HospitalResponseData extends ResponseData {
  data: {
    content: Content,
    pageable: {
      sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
      }
      pageNumber: number,
      pageSize: number,
      offset: number,
      paged: boolean,
      unpaged: boolean
    },
    totalPages: number,
    totalElements: number,
    last: boolean,
    first: boolean,
    sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
    }
    numberOfElements: number,
    size: number,
    number: number,
    empty: boolean
  }
}

// 代表医院等级或地区数据的ts类型
export interface HospitalLevelAndRegion {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {},
  parentId: number,
  name: string,
  value: string,
  dictCode: string,
  hasChildren: boolean
}
// 存储全部医院等级或地区数据的ts类型
export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[]
// 获取医院等级或地区接口返回的数据ts类型
export interface HospitalLevelAndRegionResponseData extends ResponseData {
  data: HospitalLevelAndRegionArr
}

// 根据医院名称获取医院列表接口返回的数据ts类型
export interface HospitalByNameResponseData extends ResponseData {
  data: Content
}

/* ------------------------------------------------hospital页面数据的ts类型------------------------------------------------ */
// 代表医院详情信息数据的ts类型
export interface HospitalInfo {
  bookingRule: {
    cycle: number,
    releaseTime: string,
    stopTime: string,
    quitDay: number,
    quitTime: string,
    rule: Array<string>
  },
  hospital: {
    id: string,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
      hostypeString: string,
      fullAddress: string,
    },
    hoscode: string,
    hosname: string,
    hostype: string,
    provinceCode: string,
    cityCode: string,
    districtCode: string,
    address: string,
    logoData: string,
    intro: string,
    route: string,
    status: number,
    bookingRule: null,
  }
}

// 医院详情信息接口返回的数据ts类型
export interface HospitalInfoResponseData extends ResponseData {
  data: HospitalInfo
}

// 代表医院科室数据的ts类型
export interface Deparment {
  depcode: string,
  depname: string,
  children?: Deparment[]
}

// 存储全部科室数据的ts类型
export type DeparmentArr = Deparment[]

// 医院科室接口返回的数据ts类型
export interface DeparmentResponseData extends ResponseData {
  data: DeparmentArr
}
