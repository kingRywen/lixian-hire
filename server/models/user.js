const db = require('../config/db')
const { LoginUserModel, CompanyUserModel, JobInfoModel } = require('../schema/loginUser')
const bcrypt = require('bcryptjs')

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // mongodb连接成功后的回调函数
  console.log('connected loginUser.')
})

/**
 * 求职方读写操作
 */

// 通过id查询操作
const getUserById = async (ctx, id) => {
  let userInfo = await LoginUserModel.findById(id)
  console.log(userInfo)
  return userInfo
}

// 通过用户名查找用户信息
const getUserByName = async (ctx, name) => {
  let LoginPromise = LoginUserModel.findOne({user_name: name})
  let CompanyPromise = CompanyUserModel.findOne({user_name: name})
  return (await LoginPromise || await CompanyPromise)
}

// 创建用户
const createUser = async (ctx) => {
  let encodePass = bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(10))
  let userInfo = await LoginUserModel.create({
    user_name: ctx.request.body.account,
    password: encodePass,
    role: ctx.request.body.role,
    userName: ctx.request.body.userName,
    createDate: new Date().getTime()
  })
  return userInfo
}

/**
 * 招聘方读写操作
 */

// 创建用户
const createCompanyUser = async (ctx) => {
  let encodePass = bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(10))
  let userInfo = await CompanyUserModel.create({
    user_name: ctx.request.body.account,
    password: encodePass,
    role: ctx.request.body.role,
    userName: ctx.request.body.userName,
    createDate: new Date().getTime()
  })
  return userInfo
}

module.exports = {
  getUserById,
  getUserByName,
  createCompanyUser,
  createUser
}
