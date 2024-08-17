/*
 * @Author: Chris
 * @Date: 2024-08-16 22:11:54
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 01:28:17
 * @Descripttion: **
 */
module.exports = (app) => {
  // console.log(app.controller, app.model)
  // app.router.get('/user/list', app.controller.news.list);
  const { controller: { user }, router } = app;
  const authMiddleware = app.middleware.auth();
  router.post('/user/register', user.register);
  router.post('/user/login', user.login);
  router.post('/user/logout', user.logout);
  router.get('/user/current', user.detail);
  router.put('/user/:id', user.update);
};