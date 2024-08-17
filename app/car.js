// app/model/car.js
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize;

  const Car = app.model.define(
    'car',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      user_id: {
        type: UUID,
        references: {
          model: 'user',
          key: 'id',
        },
        allowNull: false,
      },
      license_plate: {
        type: STRING(20),
        allowNull: false,
      },
      brand: {
        type: STRING(50),
      },
      model: {
        type: STRING(50),
      },
      color: {
        type: STRING(30),
      },
      capacity: {
        type: INTEGER,
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
    },
    {
      paranoid: true, // 启用软删除
      underscored: true, // 使用下划线命名法
    }
  );

  Car.associate = function() {
    app.model.Car.belongsTo(app.model.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Car;
};
