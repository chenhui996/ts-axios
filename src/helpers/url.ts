import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any) {
  // 无 params 传入，url无需做任何加工，直接 return url
  if (!params) {
    return url
  }

  // 开始加工
  const parts: string[] = [] // 存放 待拼接的各部分参数：['key=value','key=value','key=value',...]

  Object.keys(params).forEach(key => {
    let val = params[key]

    // 清除过滤：参数值为 null | undefined 的参数
    if (val === null || typeof val === 'undefined') {
      return
    }

    let values: string[]

    // 参数值：数组类型 ? key += [] : key
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    // 参数值：日期类型 | 对象类型 -> val = val.toISOString() | val = JSON.stringify(val)
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })

    // 待拼接数组 parts 处理完毕，开始拼接至 url
    let serializedParams = parts.join('&')

    if (serializedParams) {
      // 清除过滤：哈希值
      const markIndex = url.indexOf('#')
      if (markIndex !== -1) {
        url = url.slice(0, markIndex) // 截取 url 中 # 之前的部分
      }

      // core：拼接 url
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  })

  // url 加工完毕，return url
  return url
}
