const APIError = require('../error/APIError')
const clientService = require('../services/clientService')

class ClientController {
  async getSalons(req, res, next) {
    try {
      const salons = await clientService.getSalons()
      return res.json(salons)
    } catch (error) {
      next(error)
    }
  }

  async getSalon(req, res, next) {
    try {
      const {salonId} = req.params
      const salon = await clientService.getSalon(salonId)
      return res.json(salon)
    } catch (error) {
      next(error)
    }
  }

  async createRecord(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        specialistId,
        salonId,
        date,
        dateId
      } = req.body
      console.log(firstName,
        lastName,
        phoneNumber,
        email,
        specialistId,
        salonId,
        date,
        dateId)
      const records = await clientService.createRecord(
        firstName,
        lastName,
        phoneNumber,
        email,
        specialistId,
        salonId,
        date,
        dateId)
      return res.json(records)
    } catch (error) {
      next(error)
    }
  }

  async getSpecialists(req, res, next) {
    try {
      const { salonId } = req.params
      const specialists = await clientService.getSpecialists(salonId)
      return res.json(specialists)
    } catch (error) {
      next(error)
    }
  }

  async getRecords(req, res, next) {
    try {
      const {date, specialistId, salonId} = req.body
      const records = await clientService.getRecords(date, specialistId, salonId)
      return res.json(records)
    } catch (error) {
      next(error)
    }
  }

  async cancelRecord(req, res, next) {
    try {
      const {id} = req.params
      const adminData = await clientService.cancelRecord(id)
      return res.json(adminData)

    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ClientController()
