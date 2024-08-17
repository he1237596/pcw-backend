/*
 * @Author: Chris
 * @Date: 2024-08-17 01:29:51
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-17 22:50:03
 * @Descripttion: **
 */
'use strict';

/**
 * Controller 和 Service 抛出异常处理
 * @author ruiyong-lee
 * @return {function} function
 */
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
      if (ctx.status === 404 && !ctx.body) {
        ctx.error(404, 'Not Found');
      }
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
      console.log(11111);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error =
        status === 500 && ctx.app.config.env === 'prod'
          ? '系统内部错误'
          : err.message;
      // 返回错误信息
      ctx.error(status, error);
      // 如果是开发环境，显示详细的错误信息
      // if (ctx.app.config.env === 'local') {
      //   ctx.body.error = err.stack;
      // }
    }
  };
};
