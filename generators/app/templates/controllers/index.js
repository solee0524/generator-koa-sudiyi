'use strict';

/**
 * index controller
 */


var Controllers = {};

Controllers.version = function *(next) {
  this.body = process.env.VERSION;
};

module.exports = Controllers;
