/*
 * @Author: Chris
 * @Date: 2024-08-17 20:39:19
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 16:23:09
 * @Descripttion: **
 */
// app/middleware/jwt.js
module.exports = () => {
  return async function auth(ctx, next) {
    const ignorePaths = ['/user/login', '/user/register', '/user/logout']
    if (ignorePaths.some((item) => ctx.path.includes(item))) {
      return next()
    }
    const token = ctx.helper.getToken() // 获取请求头中的 Token
    console.log('token: ', token)
    if (!token) {
      ctx.throw(401, 'No token provided')
    }
    const storedToken = await ctx.app.redis.get(`token:${token}`)
    if (!storedToken) {
      ctx.throw(402, 'Token is no longer valid')
    }
    // 验证 Token
    const userId = ctx.helper.verifyToken(token)
    if (!userId) {
      ctx.throw(403, 'Invalid token')
    }
    ctx.state.loginUserId = userId
    return next()
  }
}
