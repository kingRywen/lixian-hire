const Router = require('koa-router')
const auth = require('../controllers/user')

module.exports = function () {
  const authRouter = new Router()
  authRouter.get('/user', auth.getUserInfo)
  authRouter.post('/user', auth.PostUserAuth)

  return authRouter
}
