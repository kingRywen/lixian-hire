const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 求职方信息表
const LoginUser = new Schema({
  createDate: Date,
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
  },
  isEntireInfo: {
    type: Boolean,
    default: false
  },
  resume: [
    {
      fullName: String,
      sex: String,
      email: String,
      city: String,
      education: String,
      workingLife: String,
      graduationYear: Number
    }
  ],
  collectionPosition: [{
    type: Schema.Types.ObjectId,
    ref: 'JobInfo'
  }],
  collectionCompany: [{
    type: Schema.Types.ObjectId,
    ref: 'CompanyUser'
  }]
})

// 招聘方信息表
const CompanyUser = new Schema({
  createDate: Date,
  updateDate: Date,
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
  },
  isEntireInfo: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: 0
  },
  companyInfo: {
    fullName: String,
    email: String,
    location: String,
    life: String,
    industry: String,
    introduction: String
  },
  collectionPosition: [{
    type: Schema.Types.ObjectId,
    ref: 'JobInfo'
  }],
  collectionSeekers: [Schema.Types.ObjectId]
})

// 发布职位的信息表
const JobInfo = new Schema({
  name: String,
  salary: String,
  createDate: String,
  location: String,
  experience: String,
  education: String,
  companyID: String,
  companyName: String,
  content: String,
  status: {
    type: Number,
    default: 1
  }
})

module.exports = {
  LoginUserModel: mongoose.model('LoginUserModel', LoginUser),
  CompanyUserModel: mongoose.model('CompanyUserModel', CompanyUser),
  JobInfoModel: mongoose.model('JobInfoModel', JobInfo)
}
