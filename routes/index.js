const Router = require('express')
const router = new Router()

const adminRouter = require('./adminRouter')
const clientRouter = require('./clientRouter')

router.use('/admin', adminRouter)
router.use('/client', clientRouter)

module.exports = router

