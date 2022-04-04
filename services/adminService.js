const {Admin, Record} = require('../models/models')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const APIError = require('../error/APIError')
const AdminDTO = require('../DTO/adminDTO')

class AdminService {
  async authorization(email, password) {
    const admin = await Admin.findOne({where: {email}})
    console.log(admin)
    if (!admin) {
      throw APIError.badRequest('Пользователь с таким именем не найден ')
    }
    let comparePassword = bcrypt.compareSync(password, admin.password)
    if (!comparePassword) {
      throw APIError.internal('Указан неправильный пароль')
    }
    const adminDTO = new AdminDTO(admin)
    const token = tokenService.generateToken({...adminDTO})
    await tokenService.saveToken(admin.id, token.refreshToken)
    return {...token, admin: adminDTO}
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw APIError.forbidden('Не авторизован')
    }
    const adminData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken)
    if (!adminData || !tokenFromDB) {
      throw APIError.forbidden('Не авторизован')
    }
    const admin = await Admin.findByPk(adminData.id)
    const token = tokenService.generateToken({...admin})
    console.log(token)
    await tokenService.saveToken(admin.id, token.refreshToken)
    return {...token, admin}
  }

  async getRecords(date, specialistId, salonId) {
    const response = await Record.findAll({
      where: {date, specialistId, salonId}
    })
    return response
  }

  async cancelRecord(id) {
    const response = await Record.destroy({
      where: {id}
    })
    return response
  }
}

module.exports = new AdminService()
