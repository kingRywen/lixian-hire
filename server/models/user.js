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
// 通过id查询操作
const getCompanyById = async (ctx) => {
  let id = ctx.session._id
  let userInfo = await CompanyUserModel.findById(id)
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
    createDate: Date.now
  })
  return userInfo
}

// 修改公司信息
const editCompany = async (ctx) => {
  let body = ctx.request.body
  if (ctx.session._id) {
    let _id = ctx.session._id
    let updateInfo = await CompanyUserModel.update({_id: _id}, {
      $set: {
        updateDate: Date(new Date()),
        isEntireInfo: true,
        companyInfo: {
          fullName: body.fullName,
          email: body.email,
          location: body.location,
          life: body.life,
          industry: body.industry,
          introduction: body.introduction
        }
      }
    }, { multi: true })
    return updateInfo
  } else {
    return false
  }
}

/* // 添加职位引用
const getPosition = async (ctx) => {
  CompanyUserModel.save()
} */

/**
 * 职位类读写信息
 */

// 发布职位
const postPosition = async (ctx) => {
  let body = ctx.request.body
  if (ctx.session._id) {
    // 公司的id
    let _id = ctx.session._id
    let userInfo = await getCompanyById(ctx)
    let fullName = userInfo.companyInfo.fullName
    let updateInfo = await JobInfoModel.create({
      name: body.name,
      salary: body.salary,
      createDate: new Date().getTime(),
      location: body.location,
      experience: body.experience,
      education: body.education,
      companyID: _id,
      companyName: ctx.session.fullName || fullName,
      content: body.content
    })
    await CompanyUserModel.update({_id: _id}, {
      $push: { 'collectionPosition': updateInfo.id }
    })
    return updateInfo
  } else {
    return false
  }
}

module.exports = {
  getUserById,
  getUserByName,
  createCompanyUser,
  createUser,
  editCompany,
  postPosition
}
