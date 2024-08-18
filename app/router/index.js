/*
 * @Author: Chris
 * @Date: 2024-08-16 22:10:25
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-16 22:58:48
 * @Descripttion: **
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.prefix('/api')
  require('./user')(app)
  // router.get('/', controller.home.index);
  // router.get('/user', controller.user.index);
}
