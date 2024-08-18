/*
 * @Author: Chris
 * @Date: 2024-08-16 20:40:16
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 17:33:17
 * @Descripttion: **
 */
const bcrypt = require('bcryptjs')
// const crypto = require('crypto')
module.exports = (app) => {
  const userSchema = require('../schema/user.js')(app)
  const User = app.model.define('user', userSchema)
  User.cryptoPassword = (password) => {
    // const passwordHash = crypto.createHash('sha256').update(password).digest('hex')
    // console.log(crypto.createHash('sha256').update('123456').digest('hex'), '---------------')
    // console.log(bcrypt.hashSync('123456', bcrypt.genSaltSync(10)))
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
  User.comparePassword = (password, cryptoPassword) => {
    // return bcrypt.compareSync(password, hash)
    const match = bcrypt.compareSync(password, cryptoPassword)
    if (!match) {
      throw new Error('密码错误')
    }
  }
  return User
}
