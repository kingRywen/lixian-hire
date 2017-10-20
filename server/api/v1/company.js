const user = require('../../models/user')

// 获取所有的职位列表
const companyAllJob = async (ctx) => {
  let result = await user.getCompanyAllJobById(ctx)
  ctx.body = result
}

// 求职者发送简历
const userSendJob = async (ctx) => {
  // 职位表保存求职者的信息
  let result = await user.saveUserID(ctx) || await user.saveJobID(ctx)
  if (!result) {
    ctx.body = {
      success: false
    }
  } else {
    // 求职者表保存职位id
    ctx.body = {
      success: true
    }
  }
}

// userGetResume 求职者查看自己的简历
const userGetResume = async (ctx) => {
  const id = ctx.session._id
  if (id) {
    let result = await user.getResumeById(id)
    ctx.body = {
      success: true,
      info: result.resume[result.resume.length - 1]
    }
  } else {
    ctx.throw(401, '登录过期')
  }
}

// 公司用户查看自己的详细信息
const getCompanyDetail = async (ctx) => {
  const id = ctx.session._id
  if (id) {
    let result = await user.getCompanyDetailById(id)
    ctx.body = {
      success: true,
      info: result.companyInfo
    }
  } else {
    ctx.throw(401, '登录过期')
  }
}

module.exports = {
  companyAllJob,
  userSendJob,
  userGetResume,
  getCompanyDetail
}
