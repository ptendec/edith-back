const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Admin = sequelize.define('admin', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName: {type: DataTypes.STRING},
  lastName: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING}
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false
})


const Token = sequelize.define('token', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  refreshToken: {type: DataTypes.TEXT, isNull: false}
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false
})

const Salon = sequelize.define('salon', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  address: {type: DataTypes.STRING},
  description: {type: DataTypes.TEXT},
  photo: {type: DataTypes.STRING},
  phoneNumber: {type: DataTypes.STRING}
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false
})

const Specialist = sequelize.define('specialist', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName: {type: DataTypes.STRING},
  lastName: {type: DataTypes.STRING},
  avatar: {type: DataTypes.STRING},
  experience: {type: DataTypes.STRING},
  salonId: {type: DataTypes.INTEGER}
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false
})

const Record = sequelize.define('record', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  firstName: {type: DataTypes.STRING},
  lastName: {type: DataTypes.STRING},
  phoneNumber: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
  specialistId: {type: DataTypes.INTEGER},
  salonId: {type: DataTypes.INTEGER},
  date: {type: DataTypes.DATEONLY},
  dateId: {type: DataTypes.INTEGER},
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false
})

Specialist.belongsTo(Salon)
Salon.hasMany(Specialist)

Record.belongsTo(Specialist)
Specialist.hasOne(Record)

Admin.hasOne(Token)
Token.belongsTo(Admin)

module.exports = {
  Admin,
  Salon,
  Specialist,
  Record,
  Token
}
