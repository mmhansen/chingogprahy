const router = require('express').Router()
const controller = require('./introController')

router.get('/count', controller.count)
router.get('/', controller.get)
router.post('/', controller.post)
router.put('/:introId', controller.put)
router.delete('/:introId', controller.delete)
router.get('/:introId', controller.getOne)
router.post('/comment/:introId', controller.addComment)
router.put('/comment/:introId/:commentId', controller.updateComment)
router.delete('/comment/:introId/:commentId', controller.deleteComment)

module.exports = router
