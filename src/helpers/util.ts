// 判断是否为 日期格式
export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]'
}

// 判断是否为 对象
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
