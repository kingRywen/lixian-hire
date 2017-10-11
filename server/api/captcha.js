let { drawCaptcha } = require('koa-captcha-2')
let { verifyCaptcha } = require('koa-captcha-2')
const user = require('../models/user')
const jwt = require('jsonwebtoken')
const configs = require('../config')
const randomString = require('randomstring')
const sha = require('node-sha1')
const koaRequest = require('koa2-request')

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

//  检测手机是否注册
const isPhoneRegister = async (ctx) => {
  let result = await user.getUserByName(ctx, ctx.request.body.phone)
  if (result) {
    return true
  } else {
    return false
  }
}

// 发送验证码
const sendPhone = async (ctx) => {
  if (!await isPhoneRegister(ctx)) {
    console.log('未被注册')
    let Nonce = randomString.generate(30)
    let CurTime = Date.now().toString()
    let CheckSum = sha(configs.yunxin.secret + Nonce + CurTime)
    let AppKey = configs.yunxin.AppKey
    let headers = {
      AppKey,
      Nonce,
      CurTime,
      CheckSum
    }
    headers = Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded',
      'charset': 'UTF-8'
    }, headers)
    console.log(headers)
    try {
      let result = await koaRequest({
        url: configs.yunxin.sendUrl + '?mobile=' + ctx.request.body.phone,
        method: 'post',
        // json: true,
        headers
      })
      console.log(result.body)
    } catch (error) {
      throw (error)
      /* ctx.body = {
        success: false,
        info: error.message
      } */
    }
  } else {
    console.log('被注册')
  }
}

const test = async function (ctx) {
  ctx.body = 'success'
}

module.exports = {
  drawCaptcha,
  verify,
  sendPhone,
  test
}