// migrations/20230816-create-post.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post');
    await queryInterface.createTable('post', {
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
      fk_car_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      post_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      start_location: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      end_location: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      seat_count: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'active',
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
    await queryInterface.dropTable('post');
  },
};
