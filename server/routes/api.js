const Router = require('koa-router')
const apiCaptcha = require('../api/captcha')

module.exports = function () {
  const apiRouter = new Router()
  apiRouter.get('/captcha', apiCaptcha.drawCaptcha)
  apiRouter.get('/exit', apiCaptcha.exit)
  apiRouter.post('/register', apiCaptcha.verify)
  apiRouter.post('/sendCode', apiCaptcha.sendPhone)
  apiRouter.post('/validateCode', apiCaptcha.checkPhoneCode)
  apiRouter.get('/test', apiCaptcha.test)
  return apiRouter
}
