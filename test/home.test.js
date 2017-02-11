const test = require('ava')
const request = require('supertest')
const express = require('express')
const home = require('../src/controllers/home/homeRouter')

const server = () => {
  const app = express()
  app.use('/', home)
  return app
}

test('GET /', async t => {
  const res = await request(server()).get('/')

  t.plan(2)
  t.is(res.status, 200, 'should be status 200')
  t.is(res.body.body, 'Welcome home.', 'should respond with message')
})

test('GET /elbow', async t => {
  const res = await request(server()).get('/elbow')

  t.plan(2)
  t.is(res.status, 404, 'should respond with 404')
  t.is(res.body.body, 'Not found.', 'should res with not found')
})
