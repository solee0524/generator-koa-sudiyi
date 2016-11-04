/**
 * index route
 */
'use strict';
var router = require('koa-router')();
var ctrls = require('../controllers');
var logger = require('../logger');
var redis = require('../db/redis').redis;
var _ = require('lodash');
var CONSTANTS = require('../const');
var filter = require('../middlewares/filter');

module.exports = function (app) {
  router.get('/', function *() {
    this.body = "Hello welcome to the <%- project_name %>";
  });
  router.get('/api/version', ctrls.version);

  app.use(router.middleware());
};
