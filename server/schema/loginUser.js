const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 求职方信息表
const LoginUser = new Schema({
  createDate: String,
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
  collectionPosition: [Schema.Types.ObjectId],
  collectionCompany: [Schema.Types.ObjectId]
})

// 招聘方信息表
const CompanyUser = new Schema({
  createDate: String,
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
  companyInfo: [
    {
      fullName: String,
      email: String,
      location: String,
      life: String,
      industry: Number
    }
  ],
  collectionPosition: [Schema.Types.ObjectId],
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
  release: Schema.Types.ObjectId,
  content: String
})

module.exports = {
  LoginUserModel: mongoose.model('LoginUserModel', LoginUser),
  CompanyUserModel: mongoose.model('CompanyUserModel', CompanyUser),
  JobInfoModel: mongoose.model('JobInfoModel', JobInfo)
}
