import { getToken, hasToken } from '@/utils/storage';
import { message } from 'ant-design-vue';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const baseURL = "http://pcapi-xiaotuxian-front.itheima.net/"
const request = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

// 请求拦截
request.interceptors.request.use((config: AxiosRequestConfig) => {
  if (hasToken()) {
    config.headers ? (config.headers.token = `${getToken()}`) : config;
  }

  return config
}, (err) => {
  message.error(err.response.data.message)
  return Promise.reject(err)
})

// 响应拦截
request.interceptors.response.use((res: AxiosResponse) => {
  return res
}, (err) => {
  message.error(err.response.data.message)
  return Promise.reject(err)
})

export default request