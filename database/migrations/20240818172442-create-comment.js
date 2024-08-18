// migrations/20230816-create-comment.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comment');
    await queryInterface.createTable('comment', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        comment: '主键ID',
      },
      fk_user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      fk_post_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('comment');
  },
};
