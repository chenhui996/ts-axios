import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
}) // 请求参数为 foo[]=bar&foo[]=baz

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
}) // 请求参数为 foo=%7B%22bar%22%3A%22baz%22%7D

const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
}) // 请求参数为 date=2019-05-13T02%3A53%3A52.000Z

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$ ,'
  }
}) // 请求参数为 foo=@:$ ,

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
}) // 请求参数为 foo=bar

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    foo: 'baz'
  }
}) // 请求参数为 foo=bar&foo=baz

// ---------------------------------------------------------------------

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

// ---------------------------------------------------------------------

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

// ---------------------------------------------------------------------

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  // 请求成功
  console.log(res)
}) // 请求参数为 a=1&b=2

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 3,
    b: 4
  },
  responseType: 'json'
}).then(res => {
  // 请求成功
  console.log(res)
}) // 请求参数为 a=3&b=4
