const introRouter = require('./controllers/intro/introRouter')
const router = require('express').Router()

router.use('/intro', introRouter)

module.exports = router
