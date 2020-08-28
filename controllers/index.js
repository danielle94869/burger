const router = require('express').Router()

router.use('/api', require('./burger-controller.js'))
router.use('/', require('./viewController.js'))

module.exports = router
