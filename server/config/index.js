const fs = require('fs')
const path = require('path')

let configs = {
  app: {
    port: process.env.PORT || 8889,
    baseApi: '/'
  },
  mongodb: {
    url: 'localhost:27017/lixianHire'
  },
  jwt: {
    secret: '' // jwt密钥
  },
  mongodbSecret: {
    user: '',
    pass: '' // mongodb的用户名和密码
  },
  // 网易云信api配置
  yunxin: {
    sendUrl: 'https://api.netease.im/sms/sendcode.action',
    verifyUrl: 'https://api.netease.im/sms/verifycode.action',
    AppKey: 'a429004e7fe1f7a694e0b19866094b17',
    secret: 'a5aeeddbefc3',
    templateid: 3094136,
    codeLen: 6
  }
}
// 可在config_default.js定义自己私有的配置
// module.exports = {
//   mongodbSecret: {
//     user: '',
//     pass: ''
//   },
//   jwt: {
//     secret: 'xxx'
//   },
//   admin: {
//   user: '',
//   pwd: ''
//   }
// }
if (fs.existsSync(path.resolve(__dirname, '/config_default.js'))) {
  configs = Object.assign(configs, require('./config_default.js'))
}

module.exports = configs
