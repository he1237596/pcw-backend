/*
 * @Author: Chris
 * @Date: 2024-08-16 21:18:40
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 18:07:52
 * @Descripttion: **
 */
module.exports = class baseService {
  constructor(model) {
    this.model = model
  }
  async list(ctx) {
    const query = ctx.state.query
    const result = await this.model.findAndCountAll(query)
    return ctx.success(result)
  }

  async getById(ctx) {
    const id = ctx.params.id
    const query = ctx.state.query
    const result = await this.model.findByPk(id, query)
    if (!result) {
      return ctx.throws(this.model.notFoundError(id))
    } else {
      return ctx.success(result)
    }
  }

  async update(ctx) {
    const id = ctx.params.id
    const body = ctx.request.body
    const instance = await this.model.findByPk(id)
    if (!instance) {
      return ctx.throws(this.model.notFoundError(id))
    } else {
      const result = await instance.update(body)
      return ctx.success({
        updated_at: instance.updated_at
      })
    }
  }

  async create(ctx) {
    const info = ctx.request.body
    const instance = await this.model.create(info)
    return ctx.success({
      id: instance.id,
      created_at: instance.created_at
    })
  }

  async remove(ctx) {
    const id = ctx.params.id
    const instance = await this.model.findByPk(id)
    if (!instance) {
      return ctx.throws(this.model.notFoundError(id))
    } else {
      await instance.destroy()
      return ctx.success({
        deleted_at: instance.deleted_at
      })
    }
  }
}
