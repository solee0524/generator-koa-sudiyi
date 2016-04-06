/**
 * log4js
 * Created by solee on 4/6/16.
 */
'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('<%- project_name %>');

logger.setLevel(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing'
                                      ? 'TRACE'
                                      : 'INFO');

module.exports = logger;
