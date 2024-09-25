/* eslint valid-jsdoc: "off" */
const { DataTypes } = require('sequelize');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1723796845983_6465';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

  };
  config.cors = {
    origin: '*', // 允许所有域访问，如果有特定的域名要求，修改为具体域名
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.redis = {
    // 设置过期时间为2小时
    client: {
      port: 6379, // Redis 端口号
      host: '127.0.0.1', // Redis 服务器地址
      password: '',
      db: 0, // Redis 数据库索引
    },
    // agent:true ？？？？
  };
  // config.session = {
  //   key: 'EGG_SESS',
  //   maxAge: 24 * 60 * 60 * 1000, // 1天
  //   httpOnly: true,
  //   encrypt: true,
  //   store: require('egg-session-redis').Store,
  // };
  // config.sessionRedis ={
  //   name: 'session', // specific instance `session` as the session store
  // },

  config.jwt = {
    secret: 'he1237596@163.com', // 可以自定义
    sign: { // jwt.sign(***,***,[options,***])方法中，options的默认设置可以在这里配置；
      // 过期时间8小时
      //  invalid expiresIn option for number payload
      expiresIn: 2 * 60 * 60, //  生成token时，是否自动处理过期时间
    },
  };
  config.logger = {
    // 关闭所有打印到文件的日志
    // level: 'NONE',
    // 打印所有级别日志到终端,如需调整成ERROR级别
    // dir: path.join(appInfo.baseDir, 'logs'),
    // level: 'ERROR',
    // consoleLevel: 'ERROR',
    level: 'INFO',
    consoleLevel: 'INFO',
    disableConsoleAfterReady: false,
  };
  config.middleware = [ 'accessLog', 'errorHandler', 'auth', 'loadUser' ];
  config.auth = {
    enable: true,
    ignore: [ '/api/user/login', '/api/user/register' ], // 登录路由无需 JWT 验证
  };
  config.mysql = {
    client: {
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '12345678',
      // 数据库名
      database: 'pinchewang',
    },
    // 所有数据库配置的默认值
    default: {},

    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'pinchewang',
    dialectOptions: {
      allowPublicKeyRetrieval: true,
      ssl: false
    },
    define: {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        default: DataTypes.UUIDV4,
      },
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      freezeTableName: true,
      underscored: false,
      paranoid: true,
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
