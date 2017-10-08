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

const PostUserAuth = async (ctx) => {
  const data = ctx.request.body
  const userInfo = await user.getUserByName(ctx, data.name)

  if (userInfo != null) {
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false,
        info: '密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo._id,
        role: userInfo.role
      }
      const secret = 'jiang'
      const token = jwt.sign(userToken, secret)
      ctx.body = {
        success: true,
        token: token
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

module.exports = {
  getUserInfo,
  PostUserAuth
}
