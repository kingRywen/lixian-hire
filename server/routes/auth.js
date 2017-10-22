const Router = require('koa-router')
const auth = require('../controllers/user')

module.exports = function () {
  const authRouter = new Router()
  authRouter.get('/user', auth.getUserInfo)
  authRouter.get('/getOwnMarkJob', auth.getOwnMarkJob)
  authRouter.get('/getOwnMarkCompany', auth.getOwnMarkCompany)
  authRouter.get('/get-company-job', auth.getCompanyJob)
  authRouter.post('/user', auth.PostUserAuth)
  authRouter.post('/set-company-info', auth.setCompanyInfo)
  authRouter.post('/post-position', auth.postPosition)
  authRouter.post('/update-position', auth.updatePosition)
  authRouter.post('/post-resume', auth.postResume)
  return authRouter
}
