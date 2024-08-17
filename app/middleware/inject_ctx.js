const HttpStatusCode = {};
// const HttpStatusCode = require('../constants/http_status_code')
// const { appLogger } = require('../loggers')
const { appLogger } = {};
const response = function(
  code = HttpStatusCode.HTTP_OK,
  message = 'success',
  data = {}
) {
  this.body = {
    code,
    message,
    data,
  };
};
const success = function(
  result,
  fields = '',
  code = HttpStatusCode.HTTP_OK,
  message = 'success'
) {
  if (fields) {
    if (typeof fields === 'string') {
      fields = fields.split(',');
    }
  }
  if (fields.length) {
    const resResult = {};
    fields.forEach(field => {
      resResult[field] = result[field];
    });
    this.body = {
      code,
      message,
      data: resResult,
    };
  } else {
    this.body = {
      code,
      message,
      data: result,
    };
  }
};
const successWithList = function(count, rows, fields = '') {
  if (fields) {
    if (typeof fields === 'string') {
      fields = fields.split(',');
    }
  }
  if (fields.length) {
    rows = rows.map(obj => {
      const resObject = {};
      fields.forEach(field => {
        resObject[field] = obj[field];
      });
      return resObject;
    });
  }
  this.body = {
    code: HttpStatusCode.HTTP_OK,
    message: 'success',
    data: {
      count,
      rows,
    },
  };
};
const error = function(
  code = HttpStatusCode.HTTP_INTERNAL_SERVER_ERROR,
  message = ''
) {
  this.logger.error(`APP返回错误码：${code}，错误信息: ${message}`);
  this.body = {
    code,
    message,
  };
};
const throws = function(e) {
  appLogger.error(
    `APP返回业务应用错误，错误码：${e.code}，错误信息: ${e.message}, uuid: ${this.uuid}`
  );
  appLogger.error(e.stack);
  this.body = {
    code: e.code || HttpStatusCode.HTTP_INTERNAL_SERVER_ERROR,
    message: e.message,
  };
};
