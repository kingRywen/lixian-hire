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
    createDate: Date.now()
  })
  return userInfo
}

// 获取求职者收藏的职位
const getUserMarkJob = async (ctx) => {
  return await LoginUserModel.findById(ctx.session._id, 'collectionPosition')
}

// 获取求职者收藏的公司
const getUserMarkCompany = async (ctx) => {
  return await LoginUserModel.findById(ctx.session._id, 'collectionCompany')
}

// 发送简历后保存职位ID
const saveJobID = async (ctx) => {
  const result = await LoginUserModel.findById(ctx.session._id, 'sendPosition')
  if (result.sendPosition.indexOf(ctx.query.code) !== -1) {
    return false
  }
  return await LoginUserModel.update({_id: ctx.session._id}, {
    $push: {
      'sendPosition': ctx.query.code
    }
  })
}

// 保存求职者的简历
const updateResume = async (ctx) => {
  let id = ctx.session._id
  let body = ctx.request.body
  try {
    return await LoginUserModel.update({ _id: id }, {
      $push: {
        'resume': body
      }
    })
  } catch (e) {
    return false
  }
}

/**
 * 招聘方读写操作
 */

// 通过id查询操作
const getCompanyById = async (ctx) => {
  let id = ctx.session._id
  let userInfo = await CompanyUserModel.findById(id)
  console.log(userInfo)
  return userInfo
}

// 创建用户
const createCompanyUser = async (ctx) => {
  let encodePass = bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(10))
  let userInfo = await CompanyUserModel.create({
    user_name: ctx.request.body.account,
    password: encodePass,
    role: ctx.request.body.role,
    userName: ctx.request.body.userName,
    createDate: Date.now()
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

// 查找公司所有发布的职位的列表项
const getCompanyAllJobById = async (ctx) => {
  return await JobInfoModel.find({ 'companyID': ctx.query.code }, 'name salary location education experience companyName companyID')
}

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
    await CompanyUserModel.update({_id: _id}, {
      $inc: { 'count': 1 }
    })
    return updateInfo
  } else {
    return false
  }
}

// 求职者获取所有职位列表
const userGetAllList = async (ctx) => {
  return await JobInfoModel.find({}, '_id companyID companyName location education salary name experience')
}

// 求职者获取一个指定ID的职位信息
const userGetOneJob = async (ctx) => {
  return await JobInfoModel.findById(ctx.request.query.code)
}

// 求职者获取一个指定ID的公司信息
const userGetCompanyInfo = async (id) => {
  return await CompanyUserModel.find({_id: id}, 'companyInfo count')
}

// 收藏职位
const userMarkJob = async (ctx) => {
  // 要收藏的职位的id
  const _id = ctx.request.query.code
  // 个人求职者的id
  const id = ctx.session._id
  const result1 = await LoginUserModel.update({ _id: id }, {
    $addToSet: {
      'collectionPosition': _id
    }
  })
  const result2 = await JobInfoModel.update({ _id: _id }, {
    $addToSet: {
      'markUserID': id
    }
  })
  if (!result1.nModified && !result2.nModified) {
    await LoginUserModel.update({ _id: id }, {
      $pull: {
        'collectionPosition': _id
      }
    })
    await JobInfoModel.update({ _id: _id }, {
      $pull: {
        'markUserID': id
      }
    })
    return 0
  }
  return 1
}

// 收藏公司
const userMarkCompany = async (ctx) => {
  // 要收藏的公司的id
  const _id = ctx.request.query.code
  // 个人求职者的id
  const id = ctx.session._id
  const result1 = await LoginUserModel.update({ _id: id }, {
    $addToSet: {
      'collectionCompany': _id
    }
  })
  if (!result1.nModified) {
    await LoginUserModel.update({ _id: id }, {
      $pull: {
        'collectionCompany': _id
      }
    })
    return 0
  }
  return 1
}

// 保存发送简历的求职者
const saveUserID = async (ctx) => {
  // 检测是否存在
  let result = await JobInfoModel.findById(ctx.query.code, 'subscribUserID')
  if (result.subscribUserID.indexOf(ctx.session._id) !== -1) {
    return false
  }
  return await JobInfoModel.update({_id: ctx.query.code}, {
    $push: {
      'subscribUserID': ctx.session._id
    }
  })
}

module.exports = {
  getUserById,
  getUserByName,
  createCompanyUser,
  createUser,
  editCompany,
  postPosition,
  userGetAllList,
  userGetOneJob,
  userGetCompanyInfo,
  userMarkJob,
  getUserMarkJob,
  getCompanyAllJobById,
  saveUserID,
  saveJobID,
  userMarkCompany,
  getUserMarkCompany,
  updateResume
}
