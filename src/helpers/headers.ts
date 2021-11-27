import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  // headers 为空
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name] // 将原始的name值赋值给normalizedName
      delete headers[name] // 删除原始的name值
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type') // header 名称转换 （content-type -> Content-Type）

  // 如果传入的 data 是一个对象，则设置 Content-Type 为 application/json
  if (isPlainObject(data)) {
    // 如果 header 中没有 Content-Type，则设置为 application/json
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8' // 设置 Content-Type
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
