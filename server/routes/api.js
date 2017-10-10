const Router = require('koa-router')
const apiCaptcha = require('../api/captcha')

module.exports = function () {
  const apiRouter = new Router()
  apiRouter.post('/register', apiCaptcha.verify)
  apiRouter.get('/captcha', apiCaptcha.drawCaptcha)
  apiRouter.post('/sendCode', apiCaptcha.sendPhone)
  apiRouter.get('/test', apiCaptcha.test)
  return apiRouter
}
