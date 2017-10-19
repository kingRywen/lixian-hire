const user = require('../../models/user')

// 获取所有的职位列表
const getAllJobs = async (ctx) => {
  let lists = await user.userGetAllList(ctx)
  ctx.body = lists
}

// 获取指定id的职位详细信息
const getJobDetail = async (ctx) => {
  let data = await user.userGetOneJob(ctx)
  ctx.body = data
}

// getCompanyInfo
const getCompanyInfo = async (ctx) => {
  let data = await user.userGetCompanyInfo(ctx)
  ctx.body = data
}

module.exports = {
  getAllJobs,
  getJobDetail,
  getCompanyInfo
}
