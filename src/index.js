const express    = require('express')
const bodyParser = require('body-parser')
const http       = require('debug')('http')
const db         = require('debug')('db')
const mongoose   = require('mongoose')
const app        = express()
const config     = require('./config')
const home       = require('./controllers/home/homeRouter')
const router     = require('./router')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", config.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/*
 * ROUTES
 */
app.use('/api', router)
app.use('/', home)

app.use((err, req, res, next) => {
  res
    .status(400)
    .json({
      body: err.message
    })
})
/*
 *
 */

mongoose.connect(config.database)
const connection = mongoose.connection
connection.on('open', () => {
  db('db open on: ' + config.database)
})

app.listen(config.port, () => {
  http('Server listening on port: ' + config.port)
})
