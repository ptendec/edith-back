const APIError = require('../error/APIError')
const adminService = require('../services/adminService')
const clientService = require("../services/clientService")

class AdminController {
  async authorization(req, res, next) {
    try {
      const {email, password} = req.body
      console.log(email, password)
      const adminData = await adminService.authorization(email, password)
      res.cookie('refreshToken', adminData.refreshToken, {maxAge: 34 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(adminData)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const adminData = await adminService.refresh(refreshToken)
      res.cookie('refreshToken', adminData.refreshToken, {maxAge: 34 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(adminData)
    } catch (error) {
      next(error)
    }
  }

  async getRecords(req, res, next) {
    try {
      const {date, specialistId, salonId} = req.body
      console.log(date, specialistId, salonId)
      const records = await adminService.getRecords(date, specialistId, salonId)
      return res.json(records)
    } catch (error) {
      next(error)
    }
  }

  async cancelRecord(req, res, next) {
    try {
      const {id} = req.body
      const adminData = await adminService.cancelRecord(id)
      return res.json(adminData)

    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AdminController()
