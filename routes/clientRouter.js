const Router = require('express')
const router = new Router()
const clientController = require('./../controllers/clientController')

router.get('/getSalons', clientController.getSalons)
router.get('/getSalon/:salonId', clientController.getSalon)
router.post('/getRecords', clientController.getRecords)
router.post('/createRecord', clientController.createRecord)
router.get('/getSpecialists/:salonId', clientController.getSpecialists)
router.get('/cancelRecord/:id', clientController.cancelRecord)

module.exports = router
