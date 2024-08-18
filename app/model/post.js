/*
 * @Author: Chris
 * @Date: 2024-08-18 17:14:46
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 20:48:42
 * @Descripttion: **
 */
// app/model/post.js
module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT, UUID, UUIDV4 } = app.Sequelize

  const Post = app.model.define('post', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      comment: '主键ID'
    },
    fk_user_id: {
      type: UUID,
      references: {
        model: 'user',
        key: 'id'
      },
      allowNull: false
    },
    fk_car_id: {
      type: UUID,
      references: {
        model: 'car',
        key: 'id'
      },
      allowNull: true
    },
    post_type: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '1: 人找车 2: 车找人 3: 班车 4其他'
    },
    title: {
      type: STRING(100),
      allowNull: false
    },
    description: {
      type: TEXT
    },
    start_location: {
      type: STRING(255),
      allowNull: false
    },
    end_location: {
      type: STRING(255),
      allowNull: false
    },
    start_date: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.NOW
    },
    seat_count: {
      type: INTEGER
    },
    tel: {
      type: STRING(20),
      allowNull: false
    },
    status: {
      type: STRING(20),
      defaultValue: 'active'
    },
    created_at: {
      type: DATE,
      defaultValue: app.Sequelize.NOW
    },
    updated_at: {
      type: DATE,
      defaultValue: app.Sequelize.NOW
    },
    deleted_at: {
      type: DATE
    }
  })

  Post.associate = function () {
    app.model.Post.belongsTo(app.model.User, { foreignKey: 'fk_user_id', as: 'user' })
    // app.model.Post.belongsTo(app.model.Car, { foreignKey: 'fk_car_id', as: 'car' });
  }

  return Post
}
