const faker = require('faker')
const mongoose = require('mongoose')
const introModel = require('./src/models/introModel')
const config = require('./src/config')

mongoose.connect('mongodb://localhost/chingography')

introModel.count({}, (err, count) => {
  console.log('start...')
  console.log(count)
  if (count < 100) {
    for (let i = 0; i < 200; i++) {
      // console.log(i)
      const intro = {
        title: faker.random.words(),
        body: faker.lorem.paragraph(),
        author: faker.name.firstName() + faker.name.lastName(),
        cohort: faker.hacker.noun(),
        likes: i%10
      }
      const newIntro = new introModel(intro)
      newIntro.save((err, intro) => {
        console.log(err)
        console.log(intro._id)
        if (i === 199) {
          mongoose.disconnect();
        }
      })
    }
  } else {
    mongoose.disconnect();
  }
})
