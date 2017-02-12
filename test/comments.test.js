const test = require('tape')
const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const introController = require('../src/controllers/intro/introController')
const u = require('./utils')

const server = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use('/intro', introController)
  return app
}

// test('before', u.before)
// // test.todo('get single intro by ID w/ comments')
// // test.todo('submit comment')
// // test.todo('edit comment')
// // test.todo('delete comment')
// test('after', u.after)
