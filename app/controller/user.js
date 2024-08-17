/*
 * @Author: Chris
 * @Date: 2024-08-16 16:54:34
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 03:09:15
 * @Descripttion: **
 */
/*
 * @Author: Chris
 * @Date: 2024-08-16 16:54:34
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-16 16:54:45
 * @Descripttion: **
 */
const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx, app } = this;
    ctx.body = 'hi, egg';
  }
  async login() {
    const { ctx, app } = this;
    // console.log(this.redis, ctx.redis, this.app.redis)
    const { username, password } = ctx.request.body;
    const User = ctx.model.User;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    User.comparePassword(password, user.password_hash);
    const token = ctx.generateToken({ sessionId: user.id });
    await app.redis.setex(`token:${token}`, 2 * 60 * 60, 'valid'); // 900秒即15分钟
    ctx.success({
      token,
    });
  }
  async register() {
    const { ctx } = this;
    const { username, password, repassword } = ctx.request.body;
    const _pwd = ctx.model.User.cryptoPassword(password);
    await ctx.model.User.create({ username, password_hash: _pwd });
    ctx.success();
  }
  async logout() {
    const { ctx } = this;
    const token = ctx.request.header.authorization;
    await ctx.app.redis.del(`token:${token}`);
    ctx.success();
  }

  async detail() {
    const { ctx } = this;
    console.log(ctx.state.loginUser);
    if (!ctx.state.loginUser) return ctx.error(520, '账号异常');
    const result = ctx.state.loginUser.toJSON();
    const { password_hash, ...rest } = result;
    ctx.success(rest);
  }
  async changePassword() {
    const { ctx } = this;
    const { oldPassword, newPassword, repassword } = ctx.request.body;
    ctx.success(result);
  }

  async update() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = UserController;
