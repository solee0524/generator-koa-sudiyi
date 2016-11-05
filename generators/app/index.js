'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.props = {};
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the luminous ' + chalk.red('generator-koa-sudiyi') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input project name (sudiyi_app):',
        default: 'sudiyi_app'
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:'
      },
      {
        type: 'input',
        name: 'projectMain',
        message: 'Main file (app.js):',
        default: 'app.js'
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Author (sudiyi):',
        default: 'sudiyi'
      },
      {
        type: 'list',
        name: 'projectLicense',
        message: 'Please choose license:',
        choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));

  },

  defaults: function () {

    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.projectName + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

  },

  writing: function () {

    var readmeTmpl = _.template(this.fs.read(this.templatePath('./basic/README.md')));
    this.fs.write(this.destinationPath('README.md'), readmeTmpl({
      project_name: this.props.projectName,
      project_license: this.props.projectLicense,
      project_author: this.props.projectAuthor
    }));

    var pkg = this.fs.readJSON(this.templatePath('./basic/package_tmpl.json'), {});
    extend(pkg, {
      dependencies: {
        "circular-json": "^0.3.1",
        "co": "^4.6.0",
        "co-busboy": "^1.3.1",
        "co-fs": "^1.2.0",
        "co-redis": "^2.1.1",
        "json-key-converter": "^1.0.0",
        "koa": "^1.2.4",
        "koa-bodyparser": "^2.2.0",
        "koa-cors": "0.0.16",
        "koa-jwt": "^1.2.0",
        "koa-request": "^1.0.0",
        "koa-router": "^5.4.0",
        "koa-static-server": "^1.0.0",
        "lodash": "^4.16.6",
        "log4js": "^1.0.0",
        "md5": "^2.2.1",
        "moment": "^2.10.6",
        "mysql": "^2.9.0",
        "password-generator": "^2.0.2",
        "qiniu": "^6.1.11",
        "redis": "^2.6.3",
        "request": "^2.78.0",
        "sequelize": "^3.24.7",
        "tv4": "^1.2.7"
      },
      devDependencies: {
        "apidoc": "^0.16.1",
        "chai": "^3.5.0",
        "chai3-json-schema": "^1.2.1",
        "co-mocha": "^1.1.2",
        "co-supertest": "0.0.10",
        "mocha": "^2.5.3",
        "supertest": "^1.2.0"
      }
    });
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('generator-koa-sudiyi');

    pkg.name = this.props.projectName;
    pkg.description = this.props.projectDesc;
    pkg.main = this.props.projectMain;
    pkg.author = this.props.projectAuthor;
    pkg.license = this.props.projectLicense;

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    mkdirp('lib/const');
    mkdirp('lib/controllers');
    mkdirp('lib/db');
    mkdirp('lib/logger');
    mkdirp('lib/middlewares');
    mkdirp('lib/models');
    mkdirp('lib/routes');
    mkdirp('lib/schemas');
    mkdirp('lib/services');
    mkdirp('lib/utils');
    mkdirp('public');

    // copy setting files
    this.fs.copy(
      this.templatePath('./basic/gitignore_tmpl'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('./basic/jshintrc_tmpl'),
      this.destinationPath('.jshintrc')
    );
    this.fs.copy(
      this.templatePath('./basic/app_tmpl.js'),
      this.destinationPath('app.js')
    );
    var pm2JsonTmpl = _.template(this.fs.read(this.templatePath('./basic/pm2_tmpl.json')));
    this.fs.write(this.destinationPath('pm2.json'), pm2JsonTmpl({
      project_name: this.props.projectName
    }));

    this.fs.copy(
      this.templatePath('index.js'),
      'lib/index.js'
    );

    // copy constant index file
    this.fs.copy(
      this.templatePath('./const/index.js'),
      'lib/const/index.js'
    );

    // copy controllers index file
    this.fs.copy(
      this.templatePath('./controllers/index.js'),
      'lib/controllers/index.js'
    );

    // copy db files
    this.fs.copy(
      this.templatePath('./db/mysql.js'),
      'lib/db/mysql.js'
    );
    this.fs.copy(
      this.templatePath('./db/mysql-redis-cache.js'),
      'lib/db/mysql-redis-cache.js'
    );
    this.fs.copy(
      this.templatePath('./db/redis.js'),
      'lib/db/redis.js'
    );

    //copy logger file
    var loggerIndexTmpl = _.template(this.fs.read(this.templatePath('./logger/index.js')));
    this.fs.write(this.destinationPath('lib/logger/index.js'), loggerIndexTmpl({
      project_name: this.props.projectName
    }));

    //copy middlewares from templates
    this.fs.copy(
      this.templatePath('./middlewares/request-id.js'),
      'lib/middlewares/request-id.js'
    );
    this.fs.copy(
      this.templatePath('./middlewares/koa-log4js.js'),
      'lib/middlewares/koa-log4js.js'
    );
    this.fs.copy(
      this.templatePath('./middlewares/x-response-time.js'),
      'lib/middlewares/x-response-time.js'
    );
    this.fs.copy(
      this.templatePath('./middlewares/filter.js'),
      'lib/middlewares/filter.js'
    );

    // copy models index file
    this.fs.copy(
      this.templatePath('./models/index.js'),
      'lib/models/index.js'
    );

    //copy routes file
    var routesIndexTmpl = _.template(this.fs.read(this.templatePath('./routes/index.js')));
    this.fs.write(this.destinationPath('lib/routes/index.js'), routesIndexTmpl({
      project_name: this.props.projectName
    }));

    // copy schemas index file
    this.fs.copy(
      this.templatePath('./schemas/index.js'),
      'lib/schemas/index.js'
    );

    // copy services index file
    this.fs.copy(
      this.templatePath('./services/index.js'),
      'lib/services/index.js'
    );

    //copy util files
    this.fs.copy(
      this.templatePath('./utils/helper.js'),
      'lib/utils/helper.js'
    );
    this.fs.copy(
      this.templatePath('./utils/qiniu.js'),
      'lib/utils/qiniu.js'
    );
    this.fs.copy(
      this.templatePath('./utils/resp-code-handler.js'),
      'lib/utils/resp-code-handler.js'
    );

  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
