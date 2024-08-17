/*
 * @Author: Chris
 * @Date: 2024-08-17 20:39:19
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 02:35:48
 * @Descripttion: **
 */
// app/middleware/jwt.js
module.exports = () => {
  return async function auth(ctx, next) {
    const ignorePaths = [ '/user/login', '/user/register', '/user/logout' ];
    if (ignorePaths.some(item => ctx.path.includes(item))) {
      return next();
    }
    console.log(88888888888888);
    const token = ctx.request.header.authorization; // 获取请求头中的 Token
    console.log(token, ctx.request.header);
    if (!token) {
      ctx.throw(401, 'No token provided');
    }
    const storedToken = await ctx.app.redis.get(`token:${token}`);
    console.log(storedToken, 222222222);
    if (!storedToken) {
      ctx.throw(402, 'Token is no longer valid');
    }
    try {
      // 验证 Token
      const payload = ctx.verifyToken(token);
      if (!payload) {
        ctx.throw(403, 'Invalid token');
      }
      // 检查 Token 是否过期
      console.log('verifyToken:', payload);
      ctx.state.loginUserId = payload;
      console.log(ctx.state, 11111111);
      // 检查 Token 是否在黑名单中
      // const isBlacklisted = await ctx.app.redis.get(`blacklist_${token}`);
      // if (isBlacklisted) {
      //   ctx.throw(401, 'Token has been invalidated');
      // }
      return next();
    } catch (err) {
      ctx.throw(405, 'token验证失败');
    }
  };
};
