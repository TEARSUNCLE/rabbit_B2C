import request from "@/utils/request"

/** 所有分类数据 */
export const getcategoryListApi = () => {
  return request.get(`/home/category/head`)
}

/** 轮播图 */
export const getBannerListApi = () => {
  return request.get(`home/banner`)
}

/** 新鲜好物 */
export const getNewGoodsApi = () => {
  return request.get(`home/new`)
}

/** 人气推荐 */
export const getHotGoodsApi = () => {
  return request.get(`home/hot`)
}