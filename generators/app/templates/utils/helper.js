/**
 * utilities
 */
'use strict';
var crypto = require('crypto');
var moment = require('moment');
var CONSTANTS = require('../const');
var jwt = require('koa-jwt');
var models = require('../models');
var tv4 = require('tv4');
var fs = require('fs');

exports.throwError = function (json) {
  throw new Error(JSON.stringify(json));
};

exports.pagination = function (page, perPage) {
  var page = page || 1;
  var perPage = perPage || CONSTANTS.PAGINATION.DEFUALT_PER_PAGE;

  page = page - 1 > 0
    ? page - 1
    : 0;

  return {
    offset: page * perPage,
    limit: perPage
  };
};

exports.currentTimestamp = function () {
  return moment().format('X');
};

exports.currentTimestampWithMS = function () {
  return moment().format('x');
};

exports.modelToJSON = function (model) {
  return JSON.parse(JSON.stringify(model));
};

exports.md5 = function (str) {
  return crypto.createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};

var padLeft = exports.padLeft = function (str, len, ch) {
  str = String(str);
  ch = typeof ch !== 'undefined' ? (ch + '') : '0';

  var i = -1;
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }

  return str;
};

exports.stringify = function (data) {
  if (typeof data === 'string') {
    return data;
  }

  if (typeof data === 'object') {
    return JSON.stringify(data);
  }

  return '';
};

exports.exceptionLog = function *(data) {
  var exceptionLog = {};
  exceptionLog.request_url = data.request_url || '';
  exceptionLog.request_method = data.request_method || '';
  exceptionLog.request_arguments = data.request_arguments || '';
  exceptionLog.response_status = data.response_status || 500;
  exceptionLog.response_body = data.response_body || '';
  exceptionLog.description = data.description || '';

  return yield models.stormwind.exceptionLogs.create(exceptionLog);
};

exports.schemaValidateTv4 = function (json, schema) {
  return tv4.validateResult(json, schema);
};

exports.isFileExist = function (path) {
  return new Promise(function (resolve) {
    fs.access(path, function (err) {
      if (!err) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
