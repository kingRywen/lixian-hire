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
  ctx.session.isCheck = true // 取消手机验证
  if (!verifyCaptcha(ctx)) {
    ctx.body = {
      success: false,
      info: '图形验证码不正确'
    }
  } else if (!ctx.session.isCheck) {
    ctx.body = {
      success: false,
      info: '手机验证码不正确'
    }
  } else {
    let createInfo = ctx.request.body.role === '1' ? await user.createUser(ctx) : await user.createCompanyUser(ctx)
    console.log(createInfo)
    const userToken = {
      user_name: createInfo.user_name,
      id: createInfo.id,
      userName: createInfo.userName,
      role: ctx.request.body.role
    }
    const secret = 'jiang'
    const token = jwt.sign(userToken, secret)

    // 设置session和cookie
    ctx.session._id = createInfo.id
    ctx.session.fullName = createInfo.fullName
    ctx.session.isRegister = true
    ctx.session.isLogin = true
    ctx.session.role = ctx.request.body.role
    ctx.session.isEntireInfo = false
    ctx.cookies.set('role', ctx.request.body.role, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 24 * 3600 * 1000)
    })
    ctx.body = {
      success: true,
      info: '注册成功',
      token: token,
      role: ctx.request.body.role,
      isEntireInfo: ctx.session.isEntireInfo,
      fullName: createInfo.fullName
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
        ctx.session.isCheck = true
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

// 发送验证码找回密码
const sendPhonePassword = async (ctx) => {
  if (await isPhoneRegister(ctx)) {
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
      info: '手机号未被注册'
    }
  }
}

// 校检找回密码 验证码
const checkPhoneCodePassword = async (ctx) => {
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
        ctx.session.phone = ctx.request.body.mobile
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

// 修改密码
const updatePassword = async (ctx) => {
  let data = await user.updatePassword(ctx.session.phone, ctx.request.body.password)
  ctx.body = {
    data: data
  }
}

// 退出登录
const exit = async (ctx) => {
  ctx.session = {}
  ctx.cookies.set('SESSIONID', null)
    .set('role', null)
  ctx.body = {
    success: true,
    info: '清除缓存成功'
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
  sendPhonePassword,
  checkPhoneCodePassword,
  updatePassword,
  exit,
  test
}
