const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

console.log('user controller')

const getUserInfo = async (ctx) => {
  let token = ctx.header.authorization
  if (token == null) {
    ctx.body = {
      success: false,
      info: '无效登录，请尝试重新登录'
    }
  } else {
    token = jwt.verify(token.split(' ')[1], 'jiang')
    let result = await user.getUserById(ctx, token.id)
    ctx.body = result
  }
}

// 登录验证
const PostUserAuth = async (ctx) => {
  const data = ctx.request.body
  const userInfo = await user.getUserByName(ctx, data.name)

  if (userInfo != null) {
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false,
        info: '密码错误！',
        token: null
      }
    } else {
      const userToken = {
        exp: Math.floor(Date.now() / 1000) + (24 * 3600),
        name: userInfo.user_name,
        id: userInfo._id,
        role: userInfo.role
      }
      const secret = 'jiang'
      ctx.session._id = userInfo._id
      ctx.session.isRegister = true
      ctx.session.isLogin = true
      ctx.session.role = userInfo.role
      ctx.session.isEntireInfo = userInfo.isEntireInfo
      ctx.cookies.set('role', userInfo.role, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 24 * 3600 * 1000)
      })
      const token = jwt.sign(userToken, secret)
      ctx.body = {
        success: true,
        token: token,
        role: userInfo.role,
        isEntireInfo: userInfo.isEntireInfo
      }
    }
  } else {
    if (data.name === '') {
      ctx.body = {
        success: false,
        info: '用户名不能为空'
      }
    } else {
      ctx.body = {
        success: false,
        info: '用户不存在'
      }
    }
  }
}

// 设置公司完整信息
const setCompanyInfo = async (ctx) => {
  // 如果session没有正确信息
  if (ctx.session.isRegister && ctx.session.isLogin && ctx.session.role !== '2') {
    ctx.body = {
      success: false,
      info: '用户没有权限'
    }
  }
  // session正确
  try {
    const userInfo = await user.editCompany(ctx)
    if (userInfo) {
      ctx.session.isEntireInfo = true
      ctx.body = {
        success: true,
        info: '公司信息完善成功'
      }
    } else {
      ctx.body = {
        success: false,
        info: '登录超时，重新登录'
      }
    }
  } catch (e) {
    ctx.body = {
      success: false,
      info: '数据库操作失败，请稍后再试'
    }
  }
}

// 发布职位
const postPosition = async (ctx) => {
  // 如果session没有正确信息
  if (ctx.session.isRegister && ctx.session.isLogin && ctx.session.role !== '2') {
    ctx.body = {
      success: false,
      info: '用户没有权限'
    }
  }
  if (!ctx.session.isEntireInfo) {
    ctx.body = {
      success: false,
      redirect: true,
      info: '用户信息不完善，请完善后再发布'
    }
  }
  // session正确
  try {
    const userInfo = await user.postPosition(ctx)
    if (userInfo) {
      ctx.session.isEntireInfo = true
      ctx.body = {
        success: true,
        info: '发布职位信息成功'
      }
    } else {
      ctx.body = {
        success: false,
        info: '登录超时，重新登录'
      }
    }
  } catch (e) {
    ctx.body = {
      success: false,
      info: '数据库操作失败，请稍后再试'
    }
  }
}

// 完善简历
const postResume = async (ctx) => {
  // 如果session没有正确信息
  if (ctx.session.isRegister && ctx.session.isLogin && ctx.session.role !== '1') {
    ctx.body = {
      success: false,
      info: '用户没有权限'
    }
  }
  if (!ctx.session.isEntireInfo) {
    ctx.body = {
      success: false,
      redirect: true,
      info: '完善简历'
    }
  }
  // session正确
  try {
    const userInfo = await user.updateResume(ctx)
    if (userInfo) {
      ctx.session.isEntireInfo = true
      ctx.body = {
        success: true,
        info: '更新简历成功'
      }
    } else {
      ctx.body = {
        success: false,
        info: '登录超时，重新登录'
      }
    }
  } catch (e) {
    ctx.body = {
      success: false,
      info: '数据库操作失败，请稍后再试'
    }
  }
}

// 求职用户获取自己收藏的职位
const getOwnMarkJob = async (ctx) => {
  if (!ctx.session._id) {
    ctx.throw(401, 'session required')
  }
  let data = await user.getOwnMarkJobById(ctx.session._id)
  ctx.body = {
    success: true,
    info: data
  }
}

// 求职用户获取自己收藏的公司
const getOwnMarkCompany = async (ctx) => {
  if (!ctx.session._id) {
    ctx.throw(401, 'session required')
  }
  let data = await user.getOwnMarkCompanyById(ctx.session._id)
  ctx.body = {
    success: true,
    info: data
  }
}

// 公司用户获取自己发布的职位列表
const getCompanyJob = async (ctx) => {
  if (!ctx.session._id) {
    ctx.throw(401, 'session required')
  }
  let data = await user.getCompanyJobById(ctx.session._id)
  ctx.body = {
    success: true,
    info: data
  }
}

// 公司用户修改自己发布的职位
const updatePosition = async (ctx) => {
  try {
    await user.updatePosition(ctx)
    ctx.body = {
      success: true
    }
  } catch (e) {
    ctx.throw(500, 'db error')
  }
}

module.exports = {
  getUserInfo,
  PostUserAuth,
  setCompanyInfo,
  postPosition,
  postResume,
  getOwnMarkJob,
  getOwnMarkCompany,
  getCompanyJob,
  updatePosition
}
