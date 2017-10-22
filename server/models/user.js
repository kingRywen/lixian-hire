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
  return await LoginUserModel.findById(id)
}

// getResumeById 通过id查询简历
const getResumeById = async (id) => {
  return await LoginUserModel.findOne({_id: id}, 'resume')
}

// 通过用户名查找用户信息
const getUserByName = async (ctx, name) => {
  let LoginPromise = LoginUserModel.findOne({user_name: name})
  let CompanyPromise = CompanyUserModel.findOne({user_name: name})
  return (await LoginPromise || await CompanyPromise)
}

// 通过用户id修改密码
const updatePassword = async (name, pass) => {
  try {
    let encodePass = bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
    let LoginPromise = LoginUserModel.update({user_name: name}, {password: encodePass})
    let CompanyPromise = CompanyUserModel.update({user_name: name}, {password: encodePass})
    return (await LoginPromise || await CompanyPromise)
  } catch (e) {
    throw new Error(e)
  }
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
      },
      $set: {
        'isEntireInfo': true
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

// 通过公司id查询公司的详细信息
const getCompanyDetailById = async (id) => {
  return await CompanyUserModel.findById(id, 'companyInfo')
}

// 通过公司id获取公司发布的职位列表
const getCompanyJobById = async (id) => {
  return await JobInfoModel.find({'companyID': id}, 'name salary location experience education')
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

// 查找职位的投递者
const getUserListById = async (id) => {
  let arr = await JobInfoModel.findById(id, 'subscribUserID')
  return await LoginUserModel.find({_id: {$in: arr.subscribUserID}}, 'userName user_name resume')
}

/**
 * 职位类读写信息
 */

// 通过id读取职位详细信息
const getJobById = async (id) => {
  return await JobInfoModel.findById(id)
}

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

// 公司更新职位
const updatePosition = async (ctx) => {
  if (!ctx.session._id) {
    ctx.throw(401, 'auth required')
  }
  let body = ctx.request.body
  try {
    return await JobInfoModel.update({_id: body.code}, {
      $set: {
        name: body.name,
        salary: body.salary,
        createDate: new Date().getTime(),
        location: body.location,
        experience: body.experience,
        education: body.education,
        content: body.content
      }
    })
  } catch (e) {
    ctx.throw(500, 'db error', {
      err: e
    })
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

// 求职者通过ID获取自己收藏的职位
const getOwnMarkJobById = async (id) => {
  let arr = await LoginUserModel.findById(id, 'collectionPosition')
  return await JobInfoModel.find({_id: {$in: arr.collectionPosition}}, 'name companyName location education experience salary')
}

// 求职者通过ID获取自己收藏的公司信息
const getOwnMarkCompanyById = async (id) => {
  let arr = await LoginUserModel.findById(id, 'collectionCompany')
  return await CompanyUserModel.find({_id: {$in: arr.collectionCompany}}, 'companyInfo')
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
  const result2 = await CompanyUserModel.update({_id: _id}, {
    $addToSet: {
      'markUsers': id
    }
  })
  if (!result1.nModified && !result2.nModified) {
    await LoginUserModel.update({ _id: id }, {
      $pull: {
        'collectionCompany': _id
      }
    })
    await LoginUserModel.update({ _id: _id }, {
      $pull: {
        'markUsers': id
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
  updateResume,
  getResumeById,
  getOwnMarkJobById,
  getOwnMarkCompanyById,
  getCompanyDetailById,
  getCompanyJobById,
  getJobById,
  updatePosition,
  getUserListById,
  updatePassword
}
