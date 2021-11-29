const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  // 合并对象
  for (const key in from) {
    // 循环from对象
    ;(to as T & U)[key] = from[key] as any // 将from对象的属性赋值给to对象
  }
  return to as T & U // 返回合并后的对象
}
