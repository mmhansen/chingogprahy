const mongoose = require('mongoose')

const comment = new mongoose.Schema({
  body: String
}, {
  timestamps: true
})

const introSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  comments: [comment],
  cohort: String,
  likes: { type:Number, default:0 }
}, {
  timestamps: true
})

module.exports = mongoose.model("intro",introSchema)
