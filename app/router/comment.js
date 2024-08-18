/*
 * @Author: Chris
 * @Date: 2024-08-16 22:11:54
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 20:33:19
 * @Descripttion: **
 */
module.exports = (app) => {
  // console.log(app.controller, app.model)
  // app.router.get('/user/list', app.controller.news.list);
  const {
    controller: { comment },
    router
  } = app
  router.post('/comment', comment.create)
  // router.put('/post/:id', user.update)
  // router.get('/post/:id', post.detail)
  // router.get('/post', post.list)
  router.delete('/post/:id', comment.removeInstance)
}
