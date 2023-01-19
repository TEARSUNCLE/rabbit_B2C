import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const baseURL = "http://pcapi-xiaotuxian-front.itheima.net/"
const request = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

// 请求拦截
request.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
}, (err) => {
  console.log('请求拦截报错', err)
  return Promise.reject(err)
})

// 响应拦截
request.interceptors.response.use((res: AxiosResponse) => {
  return res
}, (err) => {
  console.log('响应拦截报错', err)
  return Promise.reject(err)
})

export default request