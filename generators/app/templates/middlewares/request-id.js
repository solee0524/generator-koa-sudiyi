/**
 * Created by solee on 8/18/16.
 */
'use strict';

var helper = require('../utils/helper');
var logger = require('../logger');
var _ = require('lodash');

module.exports = function *(next) {
  var requestId = helper.md5(helper.stringify(this.request) + helper.currentTimestamp());
  logger.info("Request ID: ", requestId);

  yield next;

  if (this.body && typeof this.body === 'object') {
    let tmpBody = _.clone(this.body);
    tmpBody.request_id = requestId;
    return this.body = tmpBody;
  }
};