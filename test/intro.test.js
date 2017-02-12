const test = require('tape')
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

const oneIntro = () => {
  return introModel.findOne({}).exec()
}

test('before', u.before)

test('get /intro', function (t) {
  request(server())
    .get('/intro')
    .end((err, res) => {
      t.plan(2)
      t.equal(res.status, 200, "Should respond with 200")
      t.equal(Array.isArray(res.body.intros), true, 'should be an array')
      t.end()
    })
});

// test.todo('check that intro pagination works (skip query param)')

const introTest = {
  body: 'Hello everyone! My name is Amédée I\'m 22 and I live in France. I started FCC two weeks ago and I really enjoy it. I already have a bachelor in computer science but going back to web dev is really fun! Funny thing I\'ll start my first job as a C#/.NET dev Tuesday (I\'m quite excited to be honest !). I\'m still doing the Front-End part of FCC (wiki viewer) but I want to finish it before 2017. My goal is the FullStack certification :slightly_smiling_face: I hope to meet all of you and have a good time coding together! Thank you',
  title: 'My story',
  cohort: 'raccoons',
  author: 'Amos'
}

// create a new intro
test('POST /intro', function (t) {
  request(server())
    .post('/intro').send(introTest)
    .end((err, res) => {
      const firstIntro = res.body.intro

      t.plan(6)
      t.equal(res.status, 200, "status is 200")
      t.equal(res.body.body, "created intro", "should respond with message")
      t.equal(firstIntro.author, introTest.author)
      t.equal(firstIntro.body, introTest.body)
      t.equal(firstIntro.cohort, introTest.cohort)
      t.equal(firstIntro.title, introTest.title)
      t.end()
    })
})

// modify an intro at certain ID
// check intro fields for existence
const introTestUpdate = {
  body: 'Hello everyone! My name is Amédée I\'m 22 and I live in France. I started FCC two weeks ago and I really enjoy it. I already have a bachelor in computer science but going back to web dev is really fun! Funny thing I\'ll start my first job as a C#/.NET dev Tuesday (I\'m quite excited to be honest !). I\'m still doing the Front-End part of FCC (wiki viewer) but I want to finish it before 2017. My goal is the FullStack certification :slightly_smiling_face: I hope to meet all of you and have a good time coding together! Thank you',
  title: 'My story',
  cohort: 'fox',
  author: 'Amos'
}

test('PUT /intro/:introId', function (t) {

  oneIntro()
    .then((myIntro) => {
      request(server())
        .put('/intro/' + myIntro._id)
        .send(introTestUpdate)
        .end((err, res) => {
          const firstIntro = res.body.intro

          t.plan(6)
          t.equal(res.status, 200, "status is 200")
          t.equal(res.body.body, "Updated intro.", "should respond with message")
          t.equal(firstIntro.author, introTest.author)
          t.equal(firstIntro.body, introTest.body)
          t.equal(firstIntro.cohort, introTestUpdate.cohort)
          t.equal(firstIntro.title, introTest.title)
          t.end()
        })
    })
})
// test.todo('test adding likes')
// delete an intro at certain ID
test('DELETE /intro/:introId', function (t) {
  oneIntro()
    .then(oneIntro => {
      request(server())
        .delete("/intro/" + oneIntro._id)
        .end((err, res) => {
          t.plan(2)
          t.equal(res.status, 200, "responded with 200")
          t.equal(res.body.body, "Deleted intro.", "should respond with message")
          t.end()
        })
    })
})

test('after', u.after)
