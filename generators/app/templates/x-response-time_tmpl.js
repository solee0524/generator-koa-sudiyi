/**
 * x-response-time middlewares
 * Created by solee on 4/6/16.
 */
'use strict';

module.exports = function *(next) {
  var start = new Date;
  yield next;

  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
};
