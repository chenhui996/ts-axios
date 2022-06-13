// 判断是否为 日期格式
export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]'
}

// 精确判断 普通 json object
export function isPlainObject(val: any): val is Object {
  return Object.prototype.toString.call(val) === '[object Object]'
}
