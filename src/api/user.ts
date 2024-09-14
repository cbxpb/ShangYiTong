import request from "@/utils/request"
import type { SubmitOrderResponseData } from "@/api/type"
// 枚举地址
enum API {
  // 提交订单,获取订单号码接口
  SUBMIT_ORDER_URL = '/order/orderInfo/auth/submitOrder/'
}

// 提交订单
export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, SubmitOrderResponseData>(API.SUBMIT_ORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)