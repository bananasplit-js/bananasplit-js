![label](https://img.shields.io/badge/js-banana--split-yellow?style=for-the-badge)

![label](https://img.shields.io/badge/js-express-lightgray) ![label](https://img.shields.io/badge/written-typescript-blue?logo=typescript) ![label](https://img.shields.io/badge/precompiler-sass-ff69b4?logo=sass) ![label](https://img.shields.io/badge/template-handlebars-orange) ![label](https://img.shields.io/badge/graphql-apollo-blue?logo=graphql) ![label](https://img.shields.io/badge/orm-sequelize-blue) ![label](https://img.shields.io/badge/test-jest-green?logo=jest) ![label](https://img.shields.io/badge/css-bootstrap-green?logo=bootstrap)

![label](https://img.shields.io/badge/version-v1.0.0-orange) ![label](https://img.shields.io/badge/release%20date-february%202020-red) ![label](https://img.shields.io/badge/license-MIT-blue)
![label](https://img.shields.io/badge/coverage-100%25-brightgreen) ![label](https://img.shields.io/badge/code%20quality-A-brightgreen)

![label](https://img.shields.io/github/stars/diegoulloao/bananasplit-express-template?style=social)

![banana-split](https://i.imgur.com/Khs8Vrf.png)

# Bananasplit-js for Express

**Bananasplit** is a **Express.js** **_superset Template_** that brings to you a background to _quickly develop your project_.

### Banana includes integrated support for:
 * **Express Framework** for Node.js
 * **Apollo** for GraphQL
 * **Jest** for Testing
 * **Sequelize** ORM for Data Management
 * **Typescript** Superset for Javascript
 * **SASS** Precompiler for CSS
 * **Handlebars** Template engine for rendering Views
 * **Bootstrap** Framework for CSS

## Banana also includes useful npm-packages already configured like:
* **nodemon** to auto-restart your server every time your code change
* **ts-node** to autocompile your Typescript files when they change
* **ts-jest** to provides Typescript support to Jest
* **morgan** to print in console detailed information about your server requests
* **node-sass-middleware** to autocompile your .scss or .sass files on every page load
* **sequelize-cli** to manage your database migrations and seeders
* **dotenv** to protect your project privacy with _out-side protected_ enviroment variables and database credentials
* **supertest** to build your http-based tests with Jest
* **faker** to generate random data and seed your database with Sequelize
* **npm-check-updates** to auto-update all your project dependencies
* **chalk** to put colorful messages in your console output

---

# Features

### A ready to code project structure
A predefined structure project with an intelligent modularization.

### All Built-in
A set of multiple technologies and configurations ready to code

### Service Providers
You only need two instructions to get Express and Apollo server working.

### File templates
A set of template files including routes, controllers, models, tests, and more.

### Lightweight code implementation
The same Express code you always knew.

### JSDocs3 documentation
Documented code based on the most professional practices.

---

# Documentation
#### You can visit the official documentation here (recommended)
https://bananasplit-js.com/docs

---

# Installation
### Step 1: Install banana-cli
Run on terminal:

```
    npm i @diegoulloao/banana-cli -g
```

### Step 2: Create a new project
Replace by your project name:

```
    banana new project-name
```

**Ready.**

---

You can also automatically init a new git repository

`banana new project-name --git` or `banana new project-name -g`

---

# Configuration

## 1. Dependencies
Install the project dependencies:

```
    npm i
```

## 2. Database engine
- **Choose** to install your database driver:

    * **MySQL:** `npm i mysql2`
    * **MariaDB:** `npm i mariadb`
    * **Postgres:** `npm i pg pg-hstore`
    * **MSSQL:** `npm i tedious`
    * **SQLite:** `npm i sqlite3`

* Then at *sequelize.conf.js* and *database.conf.ts* files, **set your dialect**:

    `dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'sqlite'`

---

**Note: SQLite3 receives special parameters.**

Read for more information: https://sequelize.org/v5/manual/getting-started.html

---

## 3. Enviroment variables
**Rename** the _.env.example_ file to _.env_, then **set your vars.**

```
    # Database
    HOST=localhost
    PORT=3306

    # Auth
    DB_DATABASE=test
    DB_USERNAME=root
    DB_PASSWORD=1234
```

## 4. Database and tables
**Create the database:**
```
    npx sequelize db:create
```

(optional) **Create the test tables:**
```
    npx sequelize-cli db:migrate
```

---

## Run the server!

```
    npm run server
```

#### Check http://localhost:3000

---

**Also you can check this routes:**

* **Database Auth test:** http://localhost:3000/db-auth-test
* **Database Query test:** http://localhost:3000/db-query-test

**Or run the tests:**

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

**Official site:** https://bananasplit-js.com

**Licensed** [MIT](https://github.com/diegoulloao/bananasplit-express-template/blob/master/LICENSE)
