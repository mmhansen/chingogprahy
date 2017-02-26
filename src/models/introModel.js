const mongoose = require('mongoose')

const comment = new mongoose.Schema({
  body: String,
  author: String,
  parent: String // an ID of another comment
}, {
  timestamps: true
})

const requiredString = {
  type: String,
  required: true
}
const authorType = {
  type: String,
  required: true,
  unique: true
}

const intro = new mongoose.Schema({
  title: requiredString,
  body: requiredString,
  author: authorType,
  cohort: requiredString,
  comments: [comment],
  likes: [String]
}, {
  timestamps: true
})

let introSchema
try {
  introSchema = mongoose.model('intro')
} catch (e) {
  introSchema = mongoose.model('intro', intro)
}
module.exports = introSchema
