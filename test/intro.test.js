const test = require('ava')
const request = require('supertest')
const express = require('express')
const intro = require('../src/controllers/intro/introRouter')
const introModel = require('../src/models/introModel')
const u = require('./utils')
const bodyParser = require('body-parser')

function server () {
  const app = express()
  app.use(bodyParser.json())
  app.use('/intro', intro)
  return app
}

test.before(u.before)

test.serial('get /intro', async function (t) {
  const response = await request(server()).get('/intro')
  // actual, expected, [messaage]
  t.plan(2)
  t.is(response.status, 200, "Should respond with 200")
  t.is(Array.isArray(response.body.intros), true, 'should be an array')
});

const introTest = {
  body: 'Hello everyone! My name is Amédée I\'m 22 and I live in France. I started FCC two weeks ago and I really enjoy it. I already have a bachelor in computer science but going back to web dev is really fun! Funny thing I\'ll start my first job as a C#/.NET dev Tuesday (I\'m quite excited to be honest !). I\'m still doing the Front-End part of FCC (wiki viewer) but I want to finish it before 2017. My goal is the FullStack certification :slightly_smiling_face: I hope to meet all of you and have a good time coding together! Thank you',
  title: 'My story',
  cohort: 'raccoons',
  author: 'Amos'
}

// create a new intro
test.serial('POST /intro', async function (t) {
  const response = await request(server()).post('/intro').send(introTest)

  const firstIntro = response.body.intro

  t.plan(6)
  t.is(response.status,200,"status is 200")
  t.is(response.body.body, "created intro", "should respond with message")
  t.is(firstIntro.author, introTest.author)
  t.is(firstIntro.body, introTest.body)
  t.is(firstIntro.cohort, introTest.cohort)
  t.is(firstIntro.title, introTest.title)
})

// modify an intro at certain ID
// check intro fields for existence
const introTestUpdate = {
  body: 'Hello everyone! My name is Amédée I\'m 22 and I live in France. I started FCC two weeks ago and I really enjoy it. I already have a bachelor in computer science but going back to web dev is really fun! Funny thing I\'ll start my first job as a C#/.NET dev Tuesday (I\'m quite excited to be honest !). I\'m still doing the Front-End part of FCC (wiki viewer) but I want to finish it before 2017. My goal is the FullStack certification :slightly_smiling_face: I hope to meet all of you and have a good time coding together! Thank you',
  title: 'My story',
  cohort: 'fox',
  author: 'Amos'
}

test.serial('PUT /intro/:introId', async function (t) {

  const oneIntro = await introModel.findOne({}).exec()
  const res = await request(server()).put('/intro/' + oneIntro._id).send(introTestUpdate)
  const firstIntro = res.body.intro

  t.plan(6)
  t.is(res.status, 200, "status is 200")
  t.is(res.body.body, "Updated intro.", "should respond with message")
  t.is(firstIntro.author, introTest.author)
  t.is(firstIntro.body, introTest.body)
  t.is(firstIntro.cohort, introTestUpdate.cohort)
  t.is(firstIntro.title, introTest.title)
})

// delete an intro at certain ID
test.serial('DELETE /intro/:introId', async function (t) {
  const oneIntro = await introModel.findOne({}).exec()
  const res = await request(server()).delete("/intro/" + oneIntro._id)

  t.plan(2)
  t.is(res.status, 200, "responded with 200")
  t.is(res.body.body, "Deleted intro.", "should respond with message")

})

test.after.always(u.after)
