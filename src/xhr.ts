import { AxiosRequestConfig, Method, AxiosResponse, AxiosPromise } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config // 可以把config里面的属性拿出来
    const request = new XMLHttpRequest() // 创建一个XMLHttpRequest对象

    if (timeout) {
      request.timeout = timeout
    }

    request.ontimeout = function() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    } // 超时处理

    if (responseType) {
      // 如果有responseType，就设置responseType
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true) // 打开一个请求

    request.onreadystatechange = function handleLoad() {
      // 当readyState发生变化时，就会触发onreadystatechange事件
      if (request.readyState !== 4) {
        // 如果readyState不等于4，就返回
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 获取所有响应头
      const responseData = responseType !== 'text' ? request.response : request.responseText // 获取响应数据
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      } // 响应体

      handleResponse(response) // 返回响应体
    }

    function handleResponse(response: AxiosResponse) {
      // 如果是个promise对象，就执行then方法
      if (response.status >= 200 && response.status < 300) {
        resolve(response) // 成功
      } else {
        reject(new Error(`Request failed with status code ${response.status}`)) // 失败
      }
    } // 响应处理

    Object.keys(headers).forEach(name => {
      // 循环headers里面的属性
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    }) // 设置请求头

    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    } // 请求错误

    request.send(data)
  })
}
