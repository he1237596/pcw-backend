/*
 * @Author: Chris
 * @Date: 2024-08-17 02:18:45
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 16:11:38
 * @Descripttion: **
 */

const uuid = require('uuid')

module.exports = {
  // generateToken(data) {
  //   const { app, ctx } = this;
  //   // sign 的data 可以是对象
  //   const token = app.jwt.sign(data, app.config.jwt.secret);
  //   return token;
  // },
  // verifyToken(token) {
  //   try {
  //     const res = this.app.jwt.verify(token, this.app.config.jwt.secret);
  //     console.log(res);
  //     return res.sessionId;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // },

  success(result, code = 200, message = 'success') {
    this.body = {
      code,
      msg: message,
      data: result
    }
  },
  error(code = 500, message = 'error') {
    this.body = {
      code,
      msg: message
    }
  }
}
