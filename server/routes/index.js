const authRouter = require('./auth')()
const Router = require('koa-router')
const api = require('./api')()

module.exports = function () {
  let home = new Router()
  home.use('/auth', authRouter.routes())
  home.use('/api', api.routes())
  return home
}
