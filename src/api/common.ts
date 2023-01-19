import request from '@/utils/request'

/** 获取验证码-pc */
export const getRegisterCode = (mobile: number) => {
  return request.get(`/register/code?mobile=${mobile}`)
}