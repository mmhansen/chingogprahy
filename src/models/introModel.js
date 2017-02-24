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

const intro = new mongoose.Schema({
  title: requiredString,
  body: requiredString,
  author: requiredString,
  cohort: requiredString,
  comments: [comment],
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
