const user = require('../../models/user')

// 获取所有的职位列表
const companyAllJob = async (ctx) => {
  let result = await user.getCompanyAllJobById(ctx)
  ctx.body = result
}

// 求职者发送简历
const userSendJob = async (ctx) => {
  if (!ctx.session._id) {
    ctx.throw(401, 'auth required')
  }
  // 职位表保存求职者的信息
  try {
    let [saveUserID, saveJobID] = await Promise.all([user.saveUserID(ctx), user.saveJobID(ctx)])

    // let result = await user.saveUserID(ctx) || await user.saveJobID(ctx)
    if (!saveUserID && !saveJobID) {
      ctx.body = {
        success: false,
        info: '已经投过简历'
      }
    } else {
      ctx.body = {
        success: true,
        info: '简历投递成功'
      }
    }
  } catch (e) {
    ctx.throw(500, 'db error')
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

// 获取指定id的职位信息
const getJobInfo = async (ctx) => {
  if (!ctx.session._id) {
    ctx.throw(401, 'Auth required')
  }
  let result = await user.getJobById(ctx.query.code)
  ctx.body = {
    success: true,
    info: result
  }
}

// 获取指定id的投递者
const getUserList = async (ctx) => {
  let id = ctx.query.code
  try {
    let data = await user.getUserListById(id)
    ctx.body = {
      success: true,
      data: data
    }
  } catch (e) {
    ctx.throw(500, 'db error')
  }
}

module.exports = {
  companyAllJob,
  userSendJob,
  userGetResume,
  getCompanyDetail,
  getJobInfo,
  getUserList
}
