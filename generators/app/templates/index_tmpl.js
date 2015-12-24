/**
 * Created by solee on 12/4/15.
 */

'use strict';

var koa = require('koa');
var app = koa();
var http = require('http');
var compress = require('koa-compress');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var jwt = require('koa-jwt');
var router = require('koa-router')(app);
var cors = require('kcors');
var path = require('path');

//middleware
var requestId = require('./middlewares/common/request_id.js');


// Serve static files
app.use(serve(path.join(__dirname, '../public')));

app.use(cors());
app.use(requestId());

//Please handle error here
//app.use(errorHandler());

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/hello',function *(next){
  yield next;
  this.body = 'Hello, this is Sudiyi generator';
});


if (!module.parent) {
  //http.createServer(app.callback()).listen(process.env.PORT || 3333);
  app.listen(process.env.PORT || 3333);
  logger.info('listening on port %s', process.env.PORT || 3333);
}

module.exports = app;
