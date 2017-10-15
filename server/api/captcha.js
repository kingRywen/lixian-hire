let { drawCaptcha } = require('koa-captcha-2')
let { verifyCaptcha } = require('koa-captcha-2')
const user = require('../models/user')
const jwt = require('jsonwebtoken')
const configs = require('../config')
const randomString = require('randomstring')
const sha = require('node-sha1')
const koaRequest = require('koa2-request')

// 验证图形验证码
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
    try {
      let url = `${configs.yunxin.sendUrl}?mobile=${ctx.request.body.phone}&templateid=${configs.yunxin.templateid}&codeLen=${configs.yunxin.codeLen}`
      let result = await koaRequest({
        url: url,
        method: 'post',
        headers
      })
      console.log(result.body)
      ctx.session.headers = headers
      if (result.body.code === 200) {
        ctx.body = {
          success: true,
          info: {
            code: result.body.code
          }
        }
      } else {
        ctx.body = {
          success: false,
          info: {
            code: result.body.msg
          }
        }
      }
    } catch (error) {
      ctx.body = {
        success: false,
        info: error.message
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '手机号已经被注册'
    }
  }
}

// 校检验证码
const checkPhoneCode = async (ctx) => {
  let sessionID = ctx.cookies.get('SESSIONID')
  if (sessionID) {
    if (ctx.session.headers) {
      try {
        let url = `${configs.yunxin.verifyUrl}?mobile=${ctx.request.body.mobile}&code=${ctx.request.body.code}`
        let result = await koaRequest({
          url: url,
          method: 'post',
          headers: ctx.session.headers
        })
        ctx.session.isRegister = true
        ctx.session.isLogin = true
        ctx.body = result.body
      } catch (e) {
        throw (e)
      }
    } else {
      ctx.body = {
        success: false,
        info: '手机验证超时，请重新验证'
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '手机验证超时，请重新验证'
    }
  }
}

const test = async function (ctx) {
  ctx.body = 'success'
}

module.exports = {
  drawCaptcha,
  verify,
  sendPhone,
  checkPhoneCode,
  test
}
