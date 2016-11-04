/**
 * Created by solee on 1/12/16.
 */
'use strict';

var redis = require('redis');
var wrapper = require('co-redis');

var client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {no_ready_check: true});
client.auth(process.env.REDIS_PASS);
var cache = wrapper(client);

exports.redis = cache;