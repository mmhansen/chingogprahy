const mongoose = require('mongoose')
const u = {}

u.before = t => {
  // if (mongoose.connection.readyState)
  const db = process.env.TRAVIS
  ? 'mongodb://admin:123@ds147789.mlab.com:47789/travis-test'
  : 'mongodb://localhost/voting-app-TEST'
  mongoose.Promise = global.Promise
  mongoose.connect(db)
  t.pass('Before test')
  t.end()
}

u.after = t => {
  mongoose.models = {}
  mongoose.modelSchemas = {}
  if (mongoose.connection.db) mongoose.connection.db.dropDatabase()
  if (mongoose.connection.readyState) mongoose.disconnect()
  t.pass('After test')
  t.end()
}

module.exports = u
