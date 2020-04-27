![label](https://img.shields.io/badge/js-banana--split-yellow?style=for-the-badge)

![label](https://img.shields.io/badge/js-express-lightgray) ![label](https://img.shields.io/badge/written-typescript-blue?logo=typescript) ![label](https://img.shields.io/badge/precompiler-+sass-ff69b4?logo=sass) ![label](https://img.shields.io/badge/template-+handlebars-orange) ![label](https://img.shields.io/badge/graphql-apollo-blue?logo=graphql) ![label](https://img.shields.io/badge/orm-sequelize-blue) ![label](https://img.shields.io/badge/test-jest-green?logo=jest)

![label](https://img.shields.io/badge/version-v1.0.0-orange) ![label](https://img.shields.io/badge/release%20date-february%202020-red) ![label](https://img.shields.io/badge/license-GPL-blue)
![label](https://img.shields.io/badge/coverage-100%25-brightgreen) ![label](https://img.shields.io/badge/code%20quality-A-brightgreen)

![label](https://img.shields.io/github/stars/diegoulloao/bananasplit-express-template?style=social)

![banana-split](https://i.imgur.com/Khs8Vrf.png)

# Bananasplit js for Express

**Bananasplit** is a **Express.js** **_superset Template_** that brings to you a background to _quickly develop your project_.

### Banana includes integrated support for:
 * **Express Framework** for Node.js
 * **Apollo** for GraphQL
 * **Jest** for Testing
 * **Sequelize** ORM for Data Management
 * **Typescript** Superset for Javascript
 * **SASS** Precompiler for CSS
 * **Handlebars** Framework for CSS

## Banana also includes useful npm-packages like:
* **nodemon** to auto-restart your server every time your code changes
* **ts-node** to autocompile your Typescript files
* **ts-jest** to provides Typescript support to Jest
* **morgan** to print in console detailed information about your server requests
* **node-sass-middleware** to autocompile your .scss or .sass files on every page load
* **sequelize-cli** to manage your database migrations and seeders
* **dotenv** to protect your project privacy with _out-side protected_ enviroment variables and database credentials
* **supertest** to build your http-based tests with Jest
* **faker** to generate random data and seed your database
* **npm-check-updates** to auto-update all your project dependencies
* **chalk** to put colorful messages in your console output

---
#### Do you like start lightly?
### You don't need to waste time building your app from scratch.
Banana comes ready and it is still clean!

---

# Features

#### A ready-to-code project tree
A predefined structure project with an intelligent modularization.

#### Lightweight code implementation
An extremely _high-simply_ Express code syntax, very close to the code that you always knew.

#### Service Providers
Amazingly simple. You only need two instructions to get Express Server and Apollo Server working.

#### File templates
A set of template files including routes, controllers, models and more that you can easily use as startpoint.

#### @JSDocs3 documentation
Fully documented code based on the _most professional practices_ for programming for Javascript.

---

# Documentation
#### You can visit the official documentation here (recommended):
https://diegoulloa.cl/bananasplit-js/docs

---

# How to start
### 1. Install banana-cli

```
    npm i @diegoulloao/banana-cli -g
```

### 2. Create a new project
**Replace by the name of your project**

```
    banana new project-name
```

**You can also automatically init a new git repository**

`banana new project-name --git` or `banana new project-name -g`

**Ready!**

# Configuration

### 1. Dependencies
```
    npm install
```

### 2. Database engine
**Banana-split** uses **Sequelize ORM** that supports:

* **MySQL:** `npm i mysql2`
* **MariaDB:** `npm i mariadb`
* **Postgres:** `npm i pg pg-hstore`
* **MSSQL:** `npm i tedious`
* **SQLite:** `npm i sqlite3`

**Choose to install the driver**, then at *sequelize.conf.js* and *database.conf.ts* files set your dialect.

`dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'sqlite'`

***Note: SQLite3 receives special parameters.**
Read for more information: https://sequelize.org/v5/manual/getting-started.html

### 3. Enviroment variables
**Rename** the _.env.example_ file located at the root of the project to _.env_ and then **set your vars.**

**Example:**

```
    # Database
    HOST=localhost
    PORT=3306

    # Auth
    DB_DATABASE=test
    DB_USERNAME=root
    DB_PASSWORD=1234
```

This variables will be used by **sequelize** and **sequelize-cli** for manage your database through command line.

### 4. Database and tables
**in order to create the database you can do it manually or just run:**

```
    npx sequelize db:create
```

**Sequelize-cli** will do for you.

**(optional) After that you have to create the test table running the migration sample:**

```
    npx sequelize-cli db:migrate
```

**Now the database and user test table are created.**

### 5. Ready to dev!

#### Now run the server

```
    npm run server
```

---

# Check-in

**You can check this routes**

* **Hello:** http://localhost:3000
* **Database Auth test:** http://localhost:3000/db-auth-test
* **Database Query test:** http://localhost:3000/db-query-test

**Or just run the tests:**
`npm test` or `npx jest`

---

# Further Information

**For more information you can visit the official documentations:**

* **Express:** https://expressjs.com
* **Apollo:** https://www.apollographql.com/docs/apollo-server/
* **GraphQL:** https://graphql.org/learn/
* **Sequelize:** https://sequelize.org/v5/
* **Jest:** https://jestjs.io/docs/en/getting-started and https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
* **Supertest:** https://github.com/visionmedia/supertest
* **Typescript:** https://www.typescriptlang.org/docs/home.html
* **SASS:** https://sass-lang.com/documentation
* **Handlebars:** https://handlebarsjs.com/guide/

---
**Bananasplit • 2020**

**Official site** https://diegoulloa.cl/bananasplit-js

Licensed [MIT](https://github.com/diegoulloao/bananasplit-express-template/blob/master/LICENSE)