const user = require('../../models/user')

// 获取所有的职位列表
const getAllJobs = async (ctx) => {
  let lists = await user.userGetAllList(ctx)
  ctx.body = lists
}

// 获取指定数字页数的职位列表
const getPageNumJobs = async (ctx) => {
  let lists = await user.userGetPageList(ctx)
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
  let mark = false
  let data = await user.userGetCompanyInfo(ctx.query.code)
  let company = await user.getUserMarkCompany(ctx)
  if (company.collectionCompany.indexOf(ctx.query.code) !== -1) {
    mark = true
  }
  ctx.body = {
    data,
    mark
  }
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

// 收藏公司
const markCompany = async (ctx) => {
  if (!ctx.session._id) {
    ctx.throw(401, 'session required')
  } else {
    let data = await user.userMarkCompany(ctx)
    ctx.body = data
  }
}

module.exports = {
  getAllJobs,
  getPageNumJobs,
  getJobDetail,
  getCompanyInfo,
  markJob,
  markCompany
}
