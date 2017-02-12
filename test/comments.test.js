const test = require('tape')
const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const introRouter = require('../src/controllers/intro/introRouter')
const introModel = require('../src/models/introModel')
const u = require('./utils')

const server = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use('/intro', introRouter)
  return app
}

const introTest = {
  body: 'Hello everyone! My name is Amédée I\'m 22 and I live in France. I started FCC two weeks ago and I really enjoy it. I already have a bachelor in computer science but going back to web dev is really fun! Funny thing I\'ll start my first job as a C#/.NET dev Tuesday (I\'m quite excited to be honest !). I\'m still doing the Front-End part of FCC (wiki viewer) but I want to finish it before 2017. My goal is the FullStack certification :slightly_smiling_face: I hope to meet all of you and have a good time coding together! Thank you',
  title: 'My story',
  cohort: 'raccoons',
  author: 'Amos'
}
const saveOne = () => {
  const newIntro = new introModel(introTest)
  return newIntro.save()
}

function retrieveDoc( ){
  return introModel.findOne().exec()
}

test('before', u.before)

test('GET /intro/:introId returns one intro', t => {
  saveOne()
    .then(newIntro => {
      request(server())
        .get('/intro/' + newIntro._id)
        .end((err, res) => {
          if (err) t.fail()
          t.plan(7)
          t.equal(res.status, 200)
          t.equal(res.body.intro.author, introTest.author)
          t.equal(res.body.intro.body, introTest.body)
          t.equal(res.body.intro.cohort, introTest.cohort)
          t.equal(res.body.intro.created_at, newIntro.created_at)
          t.equal(res.body.intro.title, introTest.title)
          t.equal(res.body.intro.comments.length, 0)
          t.end()
        })
    })
})

const testComment = {
  author: 'Michael',
  body: 'This intro sucks'
}
test('POST /intro/comment/:introId - submits a comment', t => {
  retrieveDoc()
  .then(function (doc) {
    request(server())
      .post('/intro/comment/' + doc._id)
      .send(testComment)
      .end(function (err, res) {
        if (err) t.fail()
        t.plan(9)
        t.equal(res.status, 200)
        t.equal(res.body.intro.author, introTest.author)
        t.equal(res.body.intro.body, introTest.body)
        t.equal(res.body.intro.cohort, introTest.cohort)
        t.equal(res.body.intro.created_at, doc.created_at)
        t.equal(res.body.intro.title, introTest.title)
        t.equal(res.body.intro.comments.length, 1)
        const comment = res.body.intro.comments[0]
        t.equal(comment.author, testComment.author)
        t.equal(comment.body, testComment.body)
        t.end()
      })
  })
})

const newComment = {
  author: 'Michael',
  body: 'This intro is great.',
  _id: '58a0ac4b49cfb3b6516da589'
}
test('PUT /intro/comment/:introId/:commentId - should edit the comment', t => {
  retrieveDoc()
    .then(doc => {
      request(server())
        .put('/intro/comment/' + doc._id + '/' + doc.comments[0]._id)
        .send(newComment)
        .end((err, res) => {
          if (err) t.fail()
          t.plan(3)
          t.equal(res.status, 200)
          t.equal(res.body.intro.ok, 1)
          t.equal(res.body.body, 'Comment updated.')
          t.end()
        })
    })
})

test('DELETE /intro/comment/:introID/:commentId - should delete the comment', t => {
  retrieveDoc()
    .then(doc => {
      request(server())
        .delete('/intro/comment/' + doc._id + '/' + doc.comments[0]._id)
        .end((err, res) => {
          if (err) t.fail()
          t.plan(2)
          t.equal(res.status, 200)
          t.equal(res.body.body, 'Comment deleted.')
          t.end()
        })
    })
})

test('after', u.after)
