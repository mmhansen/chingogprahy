// Creates an instance of a router
const router = require('express').Router()
const controller = require('./homeController')

router.get('/', controller.home)
router.get('/*', controller.notFound)

module.exports = router
