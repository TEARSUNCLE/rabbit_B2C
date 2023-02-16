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