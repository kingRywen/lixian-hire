const Router = require('koa-router')
const auth = require('../controllers/user')

module.exports = function () {
  const authRouter = new Router()
  authRouter.get('/user', auth.getUserInfo)
  authRouter.post('/user', auth.PostUserAuth)
  authRouter.post('/set-company-info', auth.setCompanyInfo)
  authRouter.post('/post-position', auth.postPosition)
  authRouter.post('/post-resume', auth.postResume)
  return authRouter
}
