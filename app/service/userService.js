/*
 * @Author: Chris
 * @Date: 2024-08-18 15:08:44
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 18:20:29
 * @Descripttion: **
 */
'use strict'
const Service = require('egg').Service

class User extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
  }

  async findUserByUsername(username) {
    return this.app.model.User.findOne({
      where: {
        username
      }
    })
  }

  async findUserById(id) {
    return this.app.model.User.findByPk(id, {
      attributes: { exclude: ['password_hash'] }
    })
  }

  async createUser(user) {
    const { password, ...ret } = user
    const _pwd = this.app.model.User.cryptoPassword(password)
    return this.app.model.User.create({ ...ret, password_hash: _pwd })
  }

  async login(username, password) {
    console.log('-----------')
    console.log(Object.getPrototypeOf(this).constructor.name)
    console.log('-----------')
    const { app, ctx } = this
    const user = await this.findUserByUsername(username)
    app.model.User.comparePassword(password, user.password_hash)
    const token = ctx.helper.generateToken({ sessionId: user.id })
    await app.redis.setex(`token:${token}`, 2 * 60 * 60, 'valid') // 900秒即15分钟
    return token
  }
}

module.exports = User
