const express    = require('express')
const bodyParser = require('body-parser')
const http = require('debug')('http')

const app = express()
const config     = require('./config')
const home       = require('./controllers/home/homeRouter')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/*
 * ROUTES
 */
app.use('/', home)
/*
 *
 */
app.listen(config.port, () => {
  http('Server listening on port: ' + config.port)
})
