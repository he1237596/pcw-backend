/*
 * @Author: Chris
 * @Date: 2024-08-16 16:30:07
 * @LastEditors: Chris
 * @LastEditTime: 2024-08-18 00:14:32
 * @Descripttion: **
 */
/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   static: {
//     enable: true,
//   }
// };
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};