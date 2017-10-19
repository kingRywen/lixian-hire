const user = require('../../models/user')

// 获取所有的职位列表
const companyAllJob = async (ctx) => {
  let result = await user.getCompanyAllJobById(ctx)
  ctx.body = result
}

// 求职者发送简历
const userSendJob = async (ctx) => {
  // 职位表保存求职者的id
  await user.saveUserID(ctx)
  // 求职者表保存职位id
  await user.saveJobID(ctx)
  ctx.body = {
    success: true
  }
}

module.exports = {
  companyAllJob,
  userSendJob
}
