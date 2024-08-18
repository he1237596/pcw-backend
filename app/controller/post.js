/*
 * @Author: Chris
 * @Date: 2024-08-16 16:54:34
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 20:12:34
 * @Descripttion: **
 */
/*
 * @Author: Chris
 * @Date: 2024-08-16 16:54:34
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-16 16:54:45
 * @Descripttion: **
 */
const BaseController = require('./baseController')
// const { Controller } = require('egg')

class PostController extends BaseController {
  // constructor(ctx) {
  //   super(ctx, 'Post')
  // }

  constructor(ctx) {
    super(ctx, 'Post')
  }
  async create() {
    const { ctx } = this
    await this.createInstance({
      ...ctx.request.body,
      fk_user_id: ctx.state.loginUserId
    })
  }
}

module.exports = PostController
