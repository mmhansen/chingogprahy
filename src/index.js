const express      = require('express')
const bodyParser   = require('body-parser')
const http         = require('debug')('http')
const db           = require('debug')('db')
const mongoose     = require('mongoose')
const app          = express()
const config       = require('./config')
const home         = require('./controllers/home/homeRouter')
const router       = require('./router')
const passport     = require('./passport')
const expressJwt   = require('express-jwt')
const jwt          = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors         = require('cors')
const path         = require('path')
// I just threw a bracket in there for good measure. - M.H. 2017
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header("Access-Control-Allow-Origin", config.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors({
  origin: config.origin
}))
app.use(express.static(path.resolve(__dirname, '../build')))
/*
 * AUTHENTICATION
 */
app.use(expressJwt({
  secret: config.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token
}));
app.use(passport.initialize());

app.get('/login/github',
  passport.authenticate('github', { scope: ['email', 'user_location'], session: false })
)

app.get('/login/github/return',
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24
    const token = jwt.sign(req.user, config.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('http://localhost:3000/');
  }
)

/*
 * ROUTES
 */
app.use('/api', router)

app.get('/*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})

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
