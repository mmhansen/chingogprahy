const router = require('express').Router()
const controller = require('./introController')

router.get('/', controller.get)
router.post('/', controller.post)
router.put('/:introId', controller.put)
router.delete('/:introId', controller.delete)

module.exports = router
