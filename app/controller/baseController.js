/*
 * @Author: Chris
 * @Date: 2024-08-18 18:27:19
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 20:30:09
 * @Descripttion: **
 */
const { Controller } = require('egg')

module.exports = class BaseController extends Controller {
  constructor(ctx, modelName) {
    super(ctx, modelName)
    // `this.model` 是子类控制器在调用时指定的模型
    this.modelName = modelName
    if (!this.modelName) {
      throw new Error('Subclasses must define `this.model`')
    }
  }
  async list() {
    const { ctx } = this
    const query = ctx.state.query
    console.log(query)
    const result = await ctx.model[this.modelName].findAndCountAll(query)
    return ctx.success(result)
  }

  async getById() {
    const { ctx } = this
    const id = ctx.params.id
    const query = ctx.state.query
    const result = await ctx.model[this.modelName].findByPk(id, query)
    return ctx.success(result)
  }

  async updateInstance() {
    const { ctx } = this
    const id = ctx.params.id
    const body = ctx.request.body
    const instance = await ctx.model[this.modelName].findByPk(id)
    if (!instance) {
      return ctx.error(500, 'Not Found')
    } else {
      await instance.update(body)
      return ctx.success({
        updated_at: instance.updated_at
      })
    }
  }

  async createInstance(data) {
    const instance = await this.ctx.model[this.modelName].create(data)
    return this.ctx.success({
      id: instance.id,
      created_at: instance.created_at
    })
  }

  async removeInstance() {
    const { ctx } = this
    const id = ctx.params.id
    const instance = await ctx.model[this.modelName].findByPk(id)
    console.log('-----------', id, '-----------------')
    if (!instance) {
      return ctx.error(500, 'Not Found')
    } else {
      await instance.destroy()
      return ctx.success({
        deleted_at: instance.deleted_at
      })
    }
  }
}
