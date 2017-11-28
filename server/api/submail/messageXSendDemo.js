var MessageXSend = require('./messageXSend.js')

var messageXSend = new MessageXSend()

var code = Math.random().toFixed(6).slice(2)

messageXSend.add_to('13410506967')
messageXSend.set_project('UnJDq3')
messageXSend.add_var('code', code)
messageXSend.add_var('time', '10分钟')

messageXSend.xsend()
