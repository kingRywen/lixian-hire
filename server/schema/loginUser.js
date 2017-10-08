const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 求职方信息表
const LoginUser = new Schema({
  user_name: { // 登录名
    type: String,
    required: true,
    unique: true
  },
  password: { // 登录密码
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('LoginUser', LoginUser)
