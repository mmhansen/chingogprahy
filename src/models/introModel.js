const mongoose = require('mongoose')

const comment = new mongoose.Schema({
  body: String,
  author: String,
  parent: String // an ID of another comment
}, {
  timestamps: true
})

const intro = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  comments: [comment],
  cohort: String,
  likes: {
    type: Number,
    default: 0
  }
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
