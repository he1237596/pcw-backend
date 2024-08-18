/*
 * @Author: Chris
 * @Date: 2024-08-18 17:44:25
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 17:54:31
 * @Descripttion: **
 */
// app/model/comment.js
module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      comment: '主键ID',
    },
    fk_user_id: {
      type: UUID,
      allowNull: false,
    },
    fk_post_id: {
      type: UUID,
      allowNull: false,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
    created_at: {
      type: DATE,
      defaultValue: app.Sequelize.NOW,
    },
    updated_at: {
      type: DATE,
      defaultValue: app.Sequelize.NOW,
    },
    deleted_at: {
      type: DATE,
    },
  });

  Comment.associate = function() {
    app.model.Comment.belongsTo(app.model.User, { foreignKey: 'fk_user_id', as: 'user' });
    app.model.Comment.belongsTo(app.model.Post, { foreignKey: 'fk_post_id', as: 'post' });
  };

  return Comment;
};
