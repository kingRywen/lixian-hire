const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const bodyParse = require('koa-bodyparser')
const session = require('koa-session2')
const historyApiFallback = require('koa2-connect-history-api-fallback')
const db = require('./server/config/db')
const path = require('path')
const serve = require('koa-static')

const app = new Koa()

app.use(serve(path.resolve('dist')))

app.use(bodyParse())
app.use(json())
app.use(logger())
app.use(historyApiFallback({
  whiteList: ['/api', '/register']
}))
app.use(session())

const home = require('./server/routes')()
app.use(home.routes())

app.listen(8889, function () {
  console.log('koa is listening in 8889')
})
