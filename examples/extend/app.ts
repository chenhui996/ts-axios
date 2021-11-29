import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
}).then(res => {
  console.log('res', res)
})

axios
  .request({
    url: '/extend/post',
    method: 'post',
    data: {
      msg: 'hello'
    }
  })
  .then(res => {
    console.log('res', res)
  })

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello2'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })
