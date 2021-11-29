import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios() // 创建axios实例
  // 定义入口为 Axios.prototype.request -> 目的： 调用 axios({}) 时，实则调用 axios.request({})
  const instance = Axios.prototype.request.bind(context) // 将 Axios.prototype.request 方法的 this 指向 context
  extend(instance, context) // 将 context 的属性拷贝到 instance 上
  return instance as AxiosInstance // 返回 instance
}

const axios = createInstance()

export default axios
