# generator-koa-sudiyi
A yo generator with koa.js from sudiyi.

<p align="left">
  <a href="https://npmjs.org/package/generator-koa-sudiyi">
    <img src="https://img.shields.io/npm/v/generator-koa-sudiyi.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/solee0524/generator-koa-sudiyi">
    <img src="https://img.shields.io/coveralls/solee0524/generator-koa-sudiyi.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/solee0524/generator-koa-sudiyi">
    <img src="https://img.shields.io/travis/solee0524/generator-koa-sudiyi.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/generator-koa-sudiyi">
    <img src="http://img.shields.io/npm/dm/generator-koa-sudiyi.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/solee0524/generator-koa-sudiyi.svg">
    <img src="https://david-dm.org/solee0524/generator-koa-sudiyi.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/solee0524/generator-koa-sudiyi/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/generator-koa-sudiyi.svg?style=flat-square"
         alt="License">
  </a>
</p>

## Installation

First, install [Yeoman](http://yeoman.io) and **generator-koa-sudiyi** using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-koa-sudiyi
```

Then generate your new project:

```bash
yo koa-sudiyi
```
## What do you get?

Scaffolds out a complete generator directory structure for you:

```
.
├──lib/
│   ├── controllers/
│   ├── middlewares/
│   │   └── common/
│   │       └── request_id.js
│   ├── models/
│   ├── db/
│   ├── logger/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
├── public/
├── app.js
├── .gitignore
├── .jshintrc
├── package.json
└── README.md
```

## Run the demo

After the installation, we could run script to start server (http://localhost:3333).

```bash
npm start
```

## Versions

### 1.0.0

The formal version of this generator. Works properly.

Will keep eyes on module update.

### 1.0.2

Tiny modify to Sequlize version to 3.13.0 (Because 3.14.3 will cause promise warning).

### 1.0.3

Modify index.js for further mocha test(next version will add a sample).

Remove the useless modules and add `co-mocha`, `co-supertest` to package.json

### 1.1.0

Simplify the node modules required and add logger, routes and some common middlewares.

## Getting To Know Sudiyi

[Sudiyi](http://sposter.net/) is cool to help user to collect online shopping packages.

## Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License
MIT © Bo Li ([solee.me](http://solee.me))
