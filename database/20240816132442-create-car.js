/*
 * @Author: Chris
 * @Date: 2024-08-16 21:29:08
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-16 21:30:46
 * @Descripttion: **
 */
// migrations/20230816-create-car.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('car', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
        allowNull: false,
      },
      license_plate: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING(50),
      },
      model: {
        type: Sequelize.STRING(50),
      },
      color: {
        type: Sequelize.STRING(30),
      },
      capacity: {
        type: Sequelize.INTEGER,
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
    }, {
      paranoid: true,  // 启用软删除
      underscored: true, // 使用下划线命名法
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('car');
  },
};
