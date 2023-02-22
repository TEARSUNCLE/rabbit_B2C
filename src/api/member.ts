import request from "@/utils/request"

/** 获取收藏 */
export const getCollectApi = (params: any) => {
  return request.get(`/member/collect`, { params })
}

/** 猜你喜欢 */
export const getGoodsRelevantApi = (params: any) => {
  return request.get(`/goods/relevant`, { params })
}

/** 我的订单 */
export const getOrderListApi = (params: any) => {
  return request.get(`/member/order`, { params })
}