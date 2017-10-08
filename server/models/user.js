const db = require('../config/db')
const LoginUser = require('../schema/loginUser')
const bcrypt = require('bcryptjs')

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // mongodb连接成功后的回调函数
  console.log('connected loginUser.')
})

// 通过id查询操作
const getUserById = async (ctx, id) => {
  let userInfo = await LoginUser.findById(id)
  console.log(userInfo)
  return userInfo
}

// 通过用户名查找用户信息
const getUserByName = async (ctx, name) => {
  let userInfo = await LoginUser.findOne({user_name: name})
  return userInfo
}

// 创建用户
const createUser = async (ctx) => {
  let encodePass = bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(10))
  let userInfo = await LoginUser.create({
    user_name: ctx.request.body.account,
    password: encodePass,
    role: ctx.request.body.role,
    userName: ctx.request.body.userName
  })
  return userInfo
}

module.exports = {
  getUserById,
  getUserByName,
  createUser
}
