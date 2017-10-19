const Router = require('koa-router')
const apiCaptcha = require('../api/captcha')
const apiJob = require('../api/v1/job')
const apiCompany = require('../api/v1/company')

module.exports = function () {
  const apiRouter = new Router()
  apiRouter.get('/captcha', apiCaptcha.drawCaptcha)
  apiRouter.get('/exit', apiCaptcha.exit)
  apiRouter.post('/register', apiCaptcha.verify)
  apiRouter.post('/sendCode', apiCaptcha.sendPhone)
  apiRouter.post('/validateCode', apiCaptcha.checkPhoneCode)
  apiRouter.get('/test', apiCaptcha.test)

  // 职位的api
  apiRouter.get('/jobs', apiJob.getAllJobs)
  apiRouter.get('/job-details', apiJob.getJobDetail)
  apiRouter.get('/companyInfo', apiJob.getCompanyInfo)
  apiRouter.get('/mark-job', apiJob.markJob)
  // 公司的api
  // 获取公司发布的所有职位
  apiRouter.get('/all-company-job', apiCompany.companyAllJob)

  // 求职者的api
  apiRouter.get('/get-job', apiCompany.userSendJob)
  return apiRouter
}
