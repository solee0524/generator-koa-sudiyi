# generator-koa-sudiyi
A yo generator with koa.js from sudiyi.

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

## Getting To Know Sudiyi

[Sudiyi](http://sposter.net/) is cool to help user to collect online shopping packages.

## Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License
MIT © Bo Li <iblee0524@gmail.com>
