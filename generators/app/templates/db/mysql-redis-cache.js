/**
 * Created by solee on 2/26/16.
 */
'use strict';

var CircularJSON = require('circular-json');
var crypto = require('crypto');
var logger = require('../logger');
var redis = null;

module.exports = init;
/**
 * Initializer to return the cacher constructor
 * @param rds
 * @returns {Cacher}
 */
function init(rds) {
  redis = rds;
  return Cacher;
}

/**
 * Constructor of Cacher
 * @param model
 * @returns {Cacher}
 * @constructor
 */
function Cacher(model, ttl) {
  if (!(this instanceof Cacher)) {
    return new Cacher(model);
  }
  if (typeof ttl !== 'number') {
    ttl = 100;
  }
  this.model = model;
  this.method = 'find';
  this.options = {};
  this.seconds = ttl || 100;
  this.cachePrefix = 'sudiyi';
}

/**
 * Set prefix for cache key
 * @param cachePrefix
 * @returns {Cacher}
 */
Cacher.prototype.prefix = function prefix(cachePrefix) {
  this.cachePrefix = cachePrefix;
  return this;
};

/**
 * Set redis TTL (in seconds)
 * @param seconds
 * @returns {Cacher}
 */
Cacher.prototype.ttl = function ttl(seconds) {
  this.seconds = seconds;
  return this;
};

/**
 * Execute the query and return a promise
 */
Cacher.prototype.query = function * query(options) {
  this.options = options || this.options;
  this.options.raw = true;
  return yield this.fetchFromCache();
};

Cacher.prototype.fetchFromCache = function * fetchFromCache() {
  var self = this;
  var key = self.key();
  var value = yield redis.get(key);
  logger.info(value);

  if (!value) {
    return yield self.fetchFromDatabase(key);
  } else {
    return JSON.parse(value);
  }
};

Cacher.prototype.fetchFromDatabase = function * fetchFromDatabase(key) {
  var self = this;
  var res = yield self.model[self.method](self.options);
  var resRedis = yield self.setCache(key, res, self.seconds);
  return res;
};

Cacher.prototype.setCache = function * setCache(key, value, ttl) {
  value = JSON.stringify(value);
  return yield redis.setex(key, ttl, value);
};

/**
 * Create redis key
 */
Cacher.prototype.key = function key() {
  var hash = crypto.createHash('sha1')
    .update(CircularJSON.stringify(this.options, jsonReplacer))
    .digest('hex');
  return [this.cachePrefix, this.model.name, this.method, hash].join(':');
};

/**
 * Duck type to check if this is a sequelize DAOFactory
 */
function jsonReplacer(key, value) {
  if (value && value.DAO && value.sequelize) {
    return value.name;
  }
  return value;
}

/**
 * Add a retrieval method
 */
function addMethod(key) {
  Cacher.prototype[key] = function *() {
    this.method = key;
    return yield this.query.apply(this, arguments);
  };
}

var methods = [
  'find',
  'findOne',
  'findAll',
  'findAndCountAll',
  'all',
  'min',
  'max',
  'sum',
  'count'
];

methods.forEach(addMethod);

