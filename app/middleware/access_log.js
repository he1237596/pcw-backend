/*
 * @Author: Chris
 * @Date: 2024-08-16 22:54:35
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-16 23:34:01
 * @Descripttion: **
 */
// app/middleware/access_log.js

module.exports = () => {
  return async function accessLog(ctx, next) {
    const start = Date.now()
    const { method, url } = ctx
    ctx.logger.info(`[origin]:${ctx.ip}}`)
    await next()
    const duration = Date.now() - start

    const log = {
      method: ctx.method,
      url: ctx.url,
      status: ctx.status,
      duration,
      clientIP: ctx.ip,
      userAgent: ctx.get('User-Agent'),
      time: new Date().toISOString()
    }

    // 输出到控制台
    // console.log(`[Access Log] ${JSON.stringify(log)}`);

    // 也可以选择使用内置的 logger 来记录日志
    ctx.logger.info(`[origin]:${ctx.ip} [status]: ${ctx.status} ${duration}ms`)
  }
}
