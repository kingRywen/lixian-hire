const user = require('../../models/user')

// 获取所有的职位列表
const getAllJobs = async (ctx) => {
  let lists = await user.userGetAllList(ctx)
  ctx.body = lists
}

// 获取指定id的职位详细信息
const getJobDetail = async (ctx) => {
  let mark = false
  let data = await user.userGetOneJob(ctx)
  let data2 = await user.userGetCompanyInfo(data.companyID)
  let collection = await user.getUserMarkJob(ctx)
  console.log(collection.collectionPosition)
  if (collection.collectionPosition.indexOf(ctx.query.code) !== -1) {
    mark = true
  }
  ctx.body = {
    data,
    data2,
    mark
  }
}

// getCompanyInfo
const getCompanyInfo = async (ctx) => {
  let data = await user.userGetCompanyInfo(ctx.query.code)
  ctx.body = data
}

// 收藏职位
const markJob = async (ctx) => {
  if (!ctx.session._id) {
    ctx.body = {
      redirect: true
    }
  } else {
    let data = await user.userMarkJob(ctx)
    ctx.body = data
  }
}

module.exports = {
  getAllJobs,
  getJobDetail,
  getCompanyInfo,
  markJob
}
