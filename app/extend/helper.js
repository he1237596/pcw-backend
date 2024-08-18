/*
 * @Author: Chris
 * @Date: 2024-08-17 02:18:45
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 16:11:17
 * @Descripttion: **
 */
const uuid = require('uuid')

module.exports = {
  uuidv4() {
    return uuid.v4()
  },
  generateToken(data) {
    const { app, ctx } = this
    // sign 的data 可以是对象
    const token = app.jwt.sign(data, app.config.jwt.secret)
    return token
  },
  verifyToken(token) {
    try {
      const _token = token || this.getToken()
      const res = this.app.jwt.verify(_token, this.app.config.jwt.secret)
      return res.sessionId
    } catch (error) {
      console.log(error)
      return null
    }
  },
  getToken() {
    return this.ctx.request.header.authorization
  },
  async expireToken(token) {
    const _token = token || this.getToken()
    console.log(_token)
    await this.ctx.app.redis.del(`token:${_token}`)
  },
  uuidv4() {
    return uuid.v4()
  }
}
