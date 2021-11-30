// 字符串字面量 -> 定义 method 传入 -> 合法类型
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  // transformRequest?: AxiosTransformer | AxiosTransformer[];
  // transformResponse?: AxiosTransformer | AxiosTransformer[];
  // cancelToken?: CancelToken;
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  // auth?: AxiosBasicCredentials;
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
  baseURL?: string
  [propName: string]: any
}

// ---------------------------------------------------------------------

export interface AxiosResponse<T = any> {
  data: T // 响应数据
  status: number // 状态码
  statusText: string // 状态码文本
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置  可以获取到请求的url
  request: any // 请求体
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// ---------------------------------------------------------------------

export interface AxiosError extends Error {
  config: AxiosRequestConfig // 请求配置
  code?: string // 错误码
  request?: any // 请求体
  response?: AxiosResponse // 响应体
  isAxiosError: boolean // 是否是 axios 错误
}

// ---------------------------------------------------------------------

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// ---------------------------------------------------------------------

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
