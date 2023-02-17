import request from '@/utils/request'

/** 获取验证码-pc */
export const getCodeApi = (params: any) => {
  return request.get(`/login/code`, { params })
}

/** 验证码登录-pc */
export const codeLoginApi = (params: any) => {
  return request.post(`/login/code`, params)
}

/** 账号密码登录-pc */
export const loginApi = (params: any) => {
  return request.post(`/login`, params)
}

/** 验证码注册-pc */
export const registerCodeApi = (params: any) => {
  return request.get(`/register/code`, { params })
}

/** 注册 */
export const registerAccountApi = (params: any) => {
  return request.post(`/register`, params)
}