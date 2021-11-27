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

// -----------------------------------------------------------------------------

// simple
router.get('/simple/get', function(req, res) {
  res.json({
    msg: 'this is a simple get request'
  })
})

// -----------------------------------------------------------------------------

// base
router.get('/base/get', function(req, res) {
  res.json(req.query)
})

router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req
    .on('data', function(chunk) {
      if (chunk) {
        msg.push(chunk) // push chunk in buffer
      }
    })
    .on('end', function() {
      msg = Buffer.concat(msg) // convert buffer to string
      res.json(msg.toJSON()) // send response
    })
})

// -----------------------------------------------------------------------------

// error
router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: 'this is a simple get request'
    })
  } else {
    res.status(500).end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(function() {
    res.json({
      msg: 'this is a simple get request'
    })
  }, 3000)
})

// -----------------------------------------------------------------------------

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
