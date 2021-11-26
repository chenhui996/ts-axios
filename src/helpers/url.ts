import { isDate, isPlainObject } from './util'

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

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key] // 参数值
    if (val === null || typeof val === 'undefined') {
      return
    } // 如果参数值为null或undefined，则不拼接
    let values = [] // 参数值数组
    if (Array.isArray(val)) {
      // 如果参数值为数组，则将数组中的每个值都拼接到url后面
      values = val // 将数组中的每个值都拼接到url后面
      key += '[]' // 将参数名加上[]
    } else {
      // 如果参数值不为数组，则将参数值拼接到url后面
      values = [val] // 将参数值转换为数组
    }
    values.forEach(val => {
      // TODO: 如果参数值为数组，则将数组中的每个值都拼接到url后面
      if (isDate(val)) {
        val = val.toISOString() // 如果参数值为Date类型，则将Date转换为ISO格式的字符串
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val) // 如果参数值为对象，则将对象转换为JSON字符串
      }
      parts.push(`${encode(key)}=${encode(val)}`) // 将参数名和参数值拼接到url后面
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
