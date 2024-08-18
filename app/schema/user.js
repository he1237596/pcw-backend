/*
 * @Author: Chris
 * @Date: 2024-08-17 00:45:12
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-17 01:53:43
 * @Descripttion: **
 */
module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT, UUIDV4, UUID } = app.Sequelize
  return {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      comment: '主键ID'
    },
    username: {
      type: STRING(50),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: STRING(255),
      allowNull: false
    },
    email: {
      type: STRING(100),
      allowNull: true,
      unique: true
    },
    phone_number: {
      type: STRING(20)
    },
    profile_picture: {
      type: STRING(255)
    },
    user_type: {
      type: STRING(20),
      defaultValue: 'user'
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
  }
}
