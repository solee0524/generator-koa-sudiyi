# generator-koa-sudiyi
A yo generator with koa.js from sudiyi.

## Installation

First, install [Yeoman](http://yeoman.io) and <%- generatorName %> using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g <%- generatorName %>
```

Then generate your new project:

```bash
yo <%- yoName %>
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

## Getting To Know Sudiyi

[Sudiyi](http://sposter.net/) is cool to help user to collect online shopping packages.
