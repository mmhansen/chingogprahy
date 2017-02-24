const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const userModel = require('./models/userModel')

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/login/github/return"
},
  function (accessToken, refreshToken, profile, cb) {
    userModel.findOne({ id: profile.id }, (err, user) => {
      if (err) {
        return cb(err)
      }
      if (user) {
        return cb(null, user)
      }
      const newUser = new userModel({
        id:           profile.id,
        username:     profile.username,
        displayName:  profile.displayName,
        profileImage: profile.photos[0].value
      })
      newUser.save((err, user) => {
        if (err) {
          return cb(err)
        }
        cb(null, user)
      })
    })
  }
));

module.exports = passport
