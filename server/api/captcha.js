let { drawCaptcha } = require('koa-captcha-2')
let { verifyCaptcha } = require('koa-captcha-2')
const user = require('../models/user')
const jwt = require('jsonwebtoken')

const verify = async function (ctx) {
  if (!verifyCaptcha(ctx)) {
    ctx.body = {
      success: false,
      info: '验证错误'
    }
  } else {
    let createInfo = await user.createUser(ctx)
    console.log(createInfo)
    const userToken = {
      user_name: createInfo.user_name,
      id: createInfo.id,
      userName: createInfo.userName,
      role: ctx.request.body.role
    }
    const secret = 'jiang'
    const token = jwt.sign(userToken, secret)
    ctx.body = {
      success: true,
      info: '注册成功',
      token: token
    }
  }
}

const test = async function (ctx) {
  ctx.body = 'success'
}

module.exports = {
  drawCaptcha,
  verify,
  test
}
