const mongoose = require('mongoose')
const configs = require('./index')

mongoose.Promise = global.Promise

const mongodbURL = 'mongodb://' + configs.mongodb.url
mongoose.connect(mongodbURL, { useMongoClient: true, promiseLibrary: global.Promise })

let db = mongoose.connection

module.exports = db
