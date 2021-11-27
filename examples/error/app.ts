import axios, { AxiosError } from '../../src/index'

// axios({
//   method: 'get',
//   url: '/error/get1'
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   }) // 请求错误

// // ---------------------------------------------------------------------

// axios({
//   method: 'get',
//   url: '/error/get'
// })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
//   }) // 这里的e是axios的错误对象

// // ---------------------------------------------------------------------

// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   })
//     .then(res => {
//       console.log(res)
//     })
//     .catch(e => {
//       console.log(e)
//     })
// }, 5000) // 这里的时间是5秒

// // ---------------------------------------------------------------------

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.code)
    console.log(e.request)
    console.log(e.response)
  }) // 超时
