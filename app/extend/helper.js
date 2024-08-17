/*
 * @Author: Chris
 * @Date: 2024-08-17 02:18:45
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-17 21:41:43
 * @Descripttion: **
 */
const uuid = require('uuid');

module.exports = {
  generateToken(data) {
    const { app, ctx } = this;
    console.log(data)
    // sign 的data 可以是对象
    const token = app.jwt.sign(data, app.config.jwt.secret);
    return token;
  },
  verifyToken(token) {
    try {
      const res = this.app.jwt.verify(token, this.app.config.jwt.secret);
      return res.sessionId
    } catch (error) {
      console.log(error)
      return null
    }
  },
  getToken (user = {}) {
    // return this.jwt.sign({ sessionId: user._id }, this.app.config.secret, { expiresIn: '1d' })
  },
  async expireToken(token){
    // const payload = jwt.verify(token, config.server.secretKey)
    // await redis.del(payload.sessionId)
    // console.log('expired sessionId:', payload)
  },
  uuidv4(){
    return uuid.v4()
  }
}