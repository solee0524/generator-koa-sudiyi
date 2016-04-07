/**
 * Created by solee on 12/4/15.
 */
'use strict';

var uuid = require('node-uuid').v4;
var moment = require('moment');

module.exports = function () {
  return function *(next) {
    this.requestId = uuid();
    this.requestStart = moment().format('x');

    yield next;
  };
};
