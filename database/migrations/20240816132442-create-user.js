// migrations/20230816-create-user.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        comment: '主键ID',
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
      },
      phone_number: {
        type: Sequelize.STRING(20),
      },
      profile_picture: {
        type: Sequelize.STRING(255),
      },
      user_type: {
        type: Sequelize.STRING(20),
        defaultValue: 'user',
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

  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
