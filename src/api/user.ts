import request from "@/utils/request"
import type { SubmitOrderResponseData, OrderResponseData, QrCodeResponseData, PayResltResponseData, AccountInfoResponseData, CertationTypeResponseData, UserParams, UserOrderInfoResponseData, AllOrderStateResponseData, AddOrUpdateUser } from "@/api/type"
// 枚举地址
enum API {
  // 提交订单,获取订单号码接口
  SUBMIT_ORDER_URL = '/order/orderInfo/auth/submitOrder/',
  // 获取订单详情的数据
  GET_ORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  // 取消订单的接口
  ORDER_CANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
  // 获取支付订单二维码接口
  QRCODE_URL = '/order/weixin/createNative/',
  // 查询订单支付的结果
  PAYRESULT_URL = '/order/weixin/queryPayStatus/',
  // 获取当前账号用户信息
  USERINFO_URL = '/user/auth/getUserInfo',
  // 获取证件的类型的接口地址
  CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
  // 用户认证的接口
  USER_CERTATION_URL = '/user/auth/userAuah',
  // 获取用户订单的数据
  USER_ORDERINFO_URL = '/order/orderInfo/auth/',
  // 获取订单的状态
  ORDER_STATE_URL = '/order/orderInfo/auth/getStatusList',
  // 获取城市的数据
  CITY_URL = '/cmn/dict/findByParentId/',
  // 新增就诊人接口
  ADD_USER_URL = '/user/patient/auth/save',
  // 更新已有的就诊人接口
  UPDATE_USER_URL = '/user/patient/auth/update'
}

// 提交订单
export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, SubmitOrderResponseData>(API.SUBMIT_ORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)

// 获取订单详情的方法
export const reqOrderInfo = (id: string) => request.get<any, OrderResponseData>(API.GET_ORDERINFO_URL + id)

//取消订单
export const reqCancelOrder = (id: string) => request.get<any, any>(API.ORDER_CANCEL_URL + id)

// 获取支付二维码接口
export const reqQrcode = (orderId: string) => request.get<any, QrCodeResponseData>(API.QRCODE_URL + orderId)

// 查询订单支付的结果
export const reqQueryPayState = (orderId: string) => request.get<any, PayResltResponseData>(API.PAYRESULT_URL + orderId)

// 获取当前用户信息的接口
export const reqUserInfo = () => request.get<any, AccountInfoResponseData>(API.USERINFO_URL)

// 获取证件类型的方法
export const reqCertationType = (CertificatesType = 'CertificatesType') => request.get<any, CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL + CertificatesType)

// 用户认证接口
export const reqUserCertation = (data: UserParams) => request.post<any, any>(API.USER_CERTATION_URL, data)

// 获取订单数据接口
export const reqUserOrderInfo = (page: number, limit: number, patientId: string, orderStatus: string) => request.get<any, UserOrderInfoResponseData>(API.USER_ORDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)

// 获取全部订单状态的接口
export const reqOrderState = () => request.get<any, AllOrderStateResponseData>(API.ORDER_STATE_URL)

// 获取城市的数据
export const reqCity = (parentId: string) => request.get<any, any>(API.CITY_URL + parentId)

// 新增与修改已有的就诊人接口方法
export const reqAddOrUpdateUser = (data: AddOrUpdateUser) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, data);
  } else {
    return request.post<any, any>(API.ADD_USER_URL, data);
  }
}