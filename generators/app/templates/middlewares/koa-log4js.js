/**
 * koa log4js middlewares
 */
var moment = require('moment');
var logger = require('../logger');

module.exports = function *(next) {
  var nodeReq = this.req;
  var start = new Date;

  yield next;

  var ms = new Date - start;
  logger.info(
    '%s %s -- %s %s %s HTTP/%s, %s %s %sms',
    moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
    this.ip,
    this.method,
    this.url,
    this.status,
    nodeReq.httpVersion,
    this.length || null,
    this.header['user-agent'],
    ms
  );
};
