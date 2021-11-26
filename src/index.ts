import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config) // 处理请求配置
  return xhr(config).then(response => {
    return transformResponseData(response)
  }) // 返回一个promise
} // 发送请求

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
} // 处理请求配置

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
} // 处理请求数据

function transformHeaders(config: AxiosRequestConfig): void {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
} // 处理请求头

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
} // 处理请求数据

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
} // 处理请求地址

export default axios
