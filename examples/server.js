const express = require('express') // Express web server framework
const bodyParser = require('body-parser') // pull information from HTML POST (express4)
const webpack = require('webpack') // webpack
const webpackDevMiddleware = require('webpack-dev-middleware') // webpack middleware
const webpackHotMiddleware = require('webpack-hot-middleware') // webpack middleware
const webpackConfig = require('./webpack.config.js') // webpack configuration

const app = express() // create an express app
const compiler = webpack(webpackConfig) // create a webpack compiler

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
) // use webpack middleware

app.use(webpackHotMiddleware(compiler)) // use webpack middleware

app.use(express.static(__dirname)) // serve static files

app.use(bodyParser.json()) // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// -----------------------------------------------------------------------------

const router = express.Router() // create a router

registerSimpleRouter() // register simple router

registerBaseRouter() // register base router

registerErrorRouter() // register error router

registerExtendRouter() // register extend router

app.use(router) // register the router

// -----------------------------------------------------------------------------

const port = process.env.PORT || 8087 // set our port

module.exports = app.listen(port, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
}) // start the server

// -----------------------------------------------------------------------------

// simple
function registerSimpleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

// -----------------------------------------------------------------------------

// base
function registerBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

// -----------------------------------------------------------------------------

// error
function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

// -----------------------------------------------------------------------------

// extend
function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}
