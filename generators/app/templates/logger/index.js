/**
 * log4js
 */
var log4js = require('log4js');
var logger = log4js.getLogger('<%- project_name %>');

logger.setLevel(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing'
  ? 'TRACE'
  : 'INFO');

function stringify(data) {
  if (typeof data === 'string') {
    return data;
  }

  if (typeof data === 'object') {
    return JSON.stringify(data);
  }

  return '';
}

/**
 * 记录 API 访问日志
 * @param  {object} req     request from app or h5
 * @param  {object} options API 请求的配置
 * @param  {object} res     API 请求的响应
 * @param  {object} e       error
 */
logger.detail = function (req, options, res, e) {
  if (e) logger.error(e);

  if (req) logger.info(req.method, req.url);

  if (options) logger.info('[biu][api] request options:', stringify(options));

  if (res) {
    logger.info('[biu][api] response statusCode:', res.statusCode);
    logger.info('[biu][api] response body:', stringify(res.body));
  }
};

module.exports = logger;
