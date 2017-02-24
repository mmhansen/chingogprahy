const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requiredString = {
  type: String,
  required: true
}

const userSchema = new Schema({
  id:           requiredString,
  username:     requiredString,
  displayName:  requiredString,
  profileImage: requiredString
})

let User

try {
  User = mongoose.model('user',userSchema)
} catch (e) {
  User = mongoose.model('user',userSchema)
}

module.exports = User;
