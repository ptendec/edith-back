const Router = require('express')
const router = new Router()
const adminController = require('./../controllers/adminController')
const authMiddleware = require('./../middleware/authMiddleware')

router.post('/authorization', adminController.authorization)
router.get('/refresh', adminController.refresh)
router.post('/getRecords', authMiddleware,  adminController.getRecords)
router.delete('/cancelRecord', authMiddleware,  adminController.cancelRecord)

module.exports = router
