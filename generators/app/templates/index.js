'use strict';

var koa = require('koa');
var xResponseTime = require('./middlewares/x-response-time');
var log4jsMiddleware = require('./middlewares/koa-log4js');
var bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');
var requestId = require('./middlewares/request-id');
var serve = require('koa-static-server');

var app = module.exports = koa();

app.use(cors());
app.use(serve({rootDir: 'apidoc', rootPath: '/doc'}));

app.use(xResponseTime);
app.use(log4jsMiddleware);
app.use(bodyParser());
app.use(requestId);

require('./routes')(app);

app.listen(process.env.PORT || 12345);
