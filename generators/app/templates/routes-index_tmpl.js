/**
 * route index
 * Created by solee on 4/6/16.
 */
'use strict';

var router = require('koa-router')();

module.exports = function (app){
  router.get('/hello',function *(next){
    yield next;
    this.body = 'Hello, this is Sudiyi generator';
  });

  app.use(router.middleware());
};
