/**
 * Created by solee on 8/3/16.
 */
'use strict';

var qiniu = require('qiniu');
var path = require('path');
var helper = require('./helper');
var _ = require('lodash');
var CONSTANTS = require('../const');

qiniu.conf.ACCESS_KEY = process.env.QINIU_ACCESS_KEY;
qiniu.conf.SECRET_KEY = process.env.QINIU_SECRET_KEY;

var Qiniu = {};

function uploadFile(id, bucket, filePath) {
  var ext = path.extname(filePath);
  var filename = path.basename(filePath, ext);
  var key = String(id) + '-' + helper.md5(filename + (new Date().getTime()) + Math.random()) + ext;
  var token = uptokenByBucketKey(bucket, key);

  return new Promise(function (resolve) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, filePath, extra, function (err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        let success = _.clone(CONSTANTS.RESPONSE.SUCCESS);
        success.data = ret;
        resolve(success);
      } else {
        // 上传失败， 处理返回代码
        let fail = _.clone(CONSTANTS.USER.FILE_UPLOAD_FAIL);
        fail.data = err;
        resolve(fail);
      }
    });
  });
}

function uploadFileWithStream(id, bucket, fs) {
  var filename = fs.filename;
  var ext = path.extname(filename);
  var key = String(id) + '-' + helper.md5(filename + (new Date().getTime()) + Math.random()) + ext;
  var token = uptokenByBucketKey(bucket, key);

  return new Promise(function (resolve) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.put(token, key, fs.body, extra, function (err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        let success = _.clone(CONSTANTS.RESPONSE.SUCCESS);
        success.data = ret;
        resolve(success);
      } else {
        // 上传失败， 处理返回代码
        let fail = _.clone(CONSTANTS.USER.FILE_UPLOAD_FAIL);
        fail.data = err;
        resolve(fail);
      }
    });
  });
}

//构建上传策略函数
function uptokenByBucketKey(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
}

//构建上传策略函数 for bucket
function uptokenByBucket(bucket) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket);
  return putPolicy.token();
}

Qiniu.uploadFile = uploadFile;
Qiniu.uploadFileWithStream = uploadFileWithStream;
Qiniu.uptokenByBucketKey = uptokenByBucketKey;
Qiniu.uptokenByBucket = uptokenByBucket;

module.exports = Qiniu;