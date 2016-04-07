/**
 * Created by solee on 12/4/15.
 */

'use strict';

var koa = require('koa');
var app = koa();
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');
var path = require('path');

//middlewares
var xResponseTime = require('./middlewares/common/x-response-time');
var log4jsMiddleware = require('./middlewares/common/koa-log4js');
var logger = require('./logger');
var requestId = require('./middlewares/common/request_id.js');

app.use(cors());
// Serve static files
app.use(serve(path.join(__dirname, '../public')));

app.use(requestId());
app.use(xResponseTime);
app.use(log4jsMiddleware);

//Please handle error here
//app.use(errorHandler());

app.use(bodyParser());

require('./routes')(app);


if (!module.parent) {
  app.listen(process.env.PORT || 3333);
  logger.info('listening on port %s', process.env.PORT || 3333);
}

module.exports = app;
