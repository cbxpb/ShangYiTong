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


/* ------------------------------------------------用户登录相关接口------------------------------------------------ */
// 验证码接口返回的数据ts类型
export interface CodeResponseData extends ResponseData {
  data: string | null
}

// 登录接口需要携带参数ts类型
export interface LoginData {
  phone: string,
  code: string
}
// 登录接口返回用户信息数据ts类型
export interface UserInfo {
  name: string,
  token: string
}
// 登录接口返回的数据ts类型
export interface LoginResponseData extends ResponseData {
  data: UserInfo
}

// 定义微信扫码登录返回的数据的ts类型
export interface WXLogin {
  redirectUri: string,
  appid: string,
  scope: string,
  state: string
}
// 定义接口返回的数据的ts类型
export interface WXLoginResponseData extends ResponseData {
  data: WXLogin
}

/* ------------------------------------------------预约挂号相关------------------------------------------------ */
// 预约挂号科室的介绍ts类型
export interface BaseMap {
  workDateString: string,
  releaseTime: string,
  bigname: string,
  stopTime: string,
  depname: string,
  hosname: string,
}

// 预约挂号的时间ts类型
export interface bookingSchedule {
  workDate: string,
  workDateMd: string,
  dayOfWeek: string,
  docCount: number,
  reservedNumber: number,
  availableNumber: number,
  status: number,
}
// 存储全部预约挂号时间的ts类型
export type BookingScheduleList = bookingSchedule[]
// 预约挂号数据ts类型
export interface workData {
  total: number,
  bookingScheduleList: BookingScheduleList,
  baseMap: BaseMap
}
// 预约挂号接口返回的数据ts类型
export interface HospitalWordResponseData extends ResponseData {
  data: workData
}

// 每位医生信息ts类型
export interface Doctor {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    dayOfWeek: string,
    depname: string,
    hosname: string,
  }
  hoscode: string,
  depcode: string,
  title: string,
  docname: string,
  skill: string,
  workDate: string,
  workTime: number,
  reservedNumber: number,
  availableNumber: number,
  amount: number,
  status: number,
  hosScheduleId: string,
}

// 当天全部医生数据ts类型
export type DoctorArr = Doctor[]

// 医生排班接口返回的数据ts类型
export interface DoctorResponseData extends ResponseData {
  data: DoctorArr
}

// 一位就诊人信息的ts类型
export interface User {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    certificatesTypeString: string,
    contactsCertificatesTypeString: string,
    cityString: null,
    fullAddress: string,
    districtString: null,
    provinceString: null
  },
  userId: number,
  name: string,
  certificatesType: string,
  certificatesNo: string,
  sex: number,
  birthdate: string,
  phone: string,
  isMarry: number,
  provinceCode: null,
  cityCode: null,
  districtCode: null,
  address: string,
  contactsName: string,
  contactsCertificatesType: string,
  contactsCertificatesNo: string,
  contactsPhone: string,
  isInsure: number,
  cardNo: null,
  status: string
}

// 账号下全部就诊人信息
export type UserArr = User[]

// 就诊人信息接口返回的数据ts类型
export interface UserResponseData extends ResponseData {
  data: UserArr
}

// 获取某一个挂号医生数据详情
export interface DoctorInfoResponseData extends ResponseData {
  data: Doctor
}


/* ------------------------------------------------订单相关------------------------------------------------ */

// 提交订单接口返回的数据的ts类型
export interface SubmitOrderResponseData extends ResponseData {
  data: number
}

// 订单详情数据的ts类型
export interface OrderInfo {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    orderStatusString: string
  },
  userId: number,
  outTradeNo: string,
  hoscode: string,
  hosname: string,
  depcode: string,
  depname: string,
  scheduleId: string,
  title: string,
  reserveDate: string,
  reserveTime: number,
  patientId: number,
  patientName: string,
  patientPhone: string,
  hosRecordId: string,
  number: number,
  fetchTime: string,
  fetchAddress: string,
  amount: number,
  quitTime: string,
  orderStatus: number
}

// 订单接口返回的数据ts类型
export interface OrderResponseData extends ResponseData {
  data: OrderInfo
}

// 获取二维码接口的数据ts类型
export interface PayInfo {
  codeUrl: string,
  orderId: number,
  totalFee: number,
  resultCode: string
}

// 获取二维码接口返回的数据ts类型
export interface QrCodeResponseData extends ResponseData {
  data: PayInfo
}

// 查询支付结果接口返回的ts数据类型
export interface PayResltResponseData extends ResponseData {
  data: boolean
}

// 代表账号信息的数据类型
export interface AccountInfo {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
  },
  openid: null,
  nickName: null,
  phone: string,
  name: string,
  certificatesType: string,
  certificatesNo: string,
  certificatesUrl: null,
  authStatus: number,
  status: number
}

// 获取账号信息接口返回的数据的ts类型
export interface AccountInfoResponseData extends ResponseData {
  data: AccountInfo
}

// 代表证件类型的数据ts类型
export interface CertationType {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {

  },
  parentId: number,
  name: string,
  value: string,
  dictCode: string,
  hasChildren: boolean
}
// 代表全部证件类型的数据ts类型
export type CertationArr = CertationType[];

// 获取证件类型接口返回的数据的ts类型
export interface CertationTypeResponseData extends ResponseData {
  data: CertationArr
}

// 用户认证需要携带的参数的ts类型
export interface UserParams {
  certificatesNo: string,
  certificatesType: string,
  certificatesUrl: string,
  name: string
}

// 全部订单详情的ts类型
export type Records = OrderInfo[]

// 获取订单接口返回的数据的ts类型
export interface UserOrderInfoResponseData extends ResponseData {
  data: {
    records: Records
    total: number,
    size: number,
    current: number,
    orders: [],
    hitCount: boolean,
    searchCount: boolean,
    pages: number
  }
}

// 订单状态ts类型
export interface OrderState {
  comment: string,
  status: number
}
// 全部订单状态的ts类型
export type AllOrderState = OrderState[]

//获取订单状态的接口返回的数据ts类型
export interface AllOrderStateResponseData extends ResponseData {
  data: AllOrderState
}

//新增与修改已有的就诊人参数的数据ts类型
export interface AddOrUpdateUser {
  id?: string,
  name: string,
  certificatesType: string,
  certificatesNo: string,
  sex: number,
  birthdate: string,
  phone: string,
  isMarry: number,
  isInsure: number,
  addressSelected: string[],
  address: string,
  contactsName: string,
  contactsCertificatesType: string,
  contactsCertificatesNo: string,
  contactsPhone: string
}