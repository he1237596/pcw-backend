/*
 * @Author: Chris
 * @Date: 2024-08-16 16:54:34
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 16:14:46
 * @Descripttion: **
 */
/*
 * @Author: Chris
 * @Date: 2024-08-16 16:54:34
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-16 16:54:45
 * @Descripttion: **
 */
const { Controller } = require('egg')

class UserController extends Controller {
  async login() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const token = await ctx.service.userService.login(username, password)
    ctx.success({
      token
    })
  }
  async register() {
    const { ctx } = this
    await ctx.service.userService.createUser(ctx.request.body)
    ctx.success()
  }
  async logout() {
    this.ctx.helper.expireToken()
    this.ctx.success()
  }

  async detail() {
    const { ctx } = this
    const result = ctx.state.loginUser.toJSON()
    const { password_hash, ...rest } = result
    ctx.success(rest)
  }

  async changePassword() {
    const { ctx } = this
    const { oldPassword, newPassword, repassword } = ctx.request.body
    ctx.success(result)
  }

  async update() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }
}

module.exports = UserController
