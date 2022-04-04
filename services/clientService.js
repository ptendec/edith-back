const {Record, Salon, Specialist} = require('../models/models')
const APIError = require('../error/APIError')
const mailService = require('./mailService')

class ClientService {

  async getSalons() {
    const salons = await Salon.findAll({
      include: {
        model: Specialist
      }
    })
    return salons
  }


  async getSalon(salonId) {
    const salon = await Salon.findOne({
      where:
        {
          id: salonId
        },
      include:
        {
          model: Specialist
        }
    })
    return salon
  }

  async createRecord(firstName,
                     lastName,
                     phoneNumber,
                     email,
                     specialistId,
                     salonId,
                     date,
                     dateId) {
    const record = await Record.create({firstName,
      lastName,
      phoneNumber,
      email,
      specialistId,
      salonId,
      date,
      dateId})
    console.log(email, `${process.env.API_URL}/api/client/cancelRecord/${record.id}`)
    await mailService.send(email, `${process.env.API_URL}/api/client/cancelRecord/${record.id}`)
    return record
  }

  async getRecords(date, specialistId, salonId) {
    console.log(date)
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

  async getSpecialists(salonId) {
    const specialists = await Specialist.findAll({
      where: {salonId},
    })
    return specialists
  }
}

module.exports = new ClientService()
