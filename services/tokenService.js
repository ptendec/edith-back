const jwt = require('jsonwebtoken')
const {Token} = require('./../models/models')

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m'
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d'
    })
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(adminId, refreshToken) {
    console.log(adminId, refreshToken)
    const tokenData = await Token.findOne({where: {adminId}})
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    return await Token.create({adminId, refreshToken})
  }

  async removeToken(refreshToken) {
    return await Token.destroy({where: {refreshToken}})
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({where: {refreshToken}})
    console.log(tokenData)
    return tokenData
  }

  validateAccessToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return data
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {

      const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return data
    } catch (error) {
      return null
    }
  }


}

module.exports = new TokenService()
