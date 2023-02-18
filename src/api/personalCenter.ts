import request from "@/utils/request"

/** 获取收藏 */
export const getCollectApi = (params: any) => {
  return request.get(`/member/collect`, { params })
}