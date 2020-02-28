# Banana-split for Express

**Banana-split** is a **Node.js** superset **_Template_** that bring to you a background to _quickly develop your project_.

### Banana includes integrated support to:
 * **Express Framework** for Node.js
 * **Apollo** for GraphQL
 * **Jest** for Test
 * **Sequelize** ORM
 * **Typescript** Language
 * **SASS** Pre-compiler
 * **Handlebars** Template engine

### Also includes userful npm-packages like:
* **nodemon** for auto-restart your server every time your code changes
* **ts-node** for autocompile your Typescript files
* **ts-jest** for provides Typescript support to Jest
* **morgan** for print in console detailed information about your server requests
* **node-sass-middleware** for autocompile your .scss or .sass files on every page load
* **sequelize-cli** for manage your database migrations and seeders
* **dotenv** for protect your project privacity with _out-side protected_ enviroment variables and database credentials
* **supertest** for build your http-based tests with Jest
* **faker** for generate random data and seed your database
* **npm-check-updates** for auto-update all your project dependencies
* **chalk** for put colorful messages in your console output

---
#### ¿Do you like start lightly?
### You don't need waste time building your project from clean.
**Banana comes ready and is still clean!**

![Imgur](https://i.imgur.com/HRfzak8.png)

# Features

#### In addition to that Banana provides a _ready-to-code_ project tree
A predefined structure project with an intelligent modularization.

#### _Lightweight-close_ code implementation
An extremely _high-simply_ Express code syntax, very close to the code that you always know.

#### Service Providers to get it working simply
Amazing simple. You only need two instructions to get Express Server and/or Apollo Server working. Nothing else!

#### File templates
A set of sample files including routes, controllers, models, tests, graphQL schemas-resolvers, and database migrations-seeders that you can easily use as your template or code start-point.

#### @JSDocs3 documentation
Fully documented code based on the _most professional practices_ for programming in Javascript.

# How to start
### 1. Install banana-cli:

```
    npm i @diegoulloao/banana-cli -g
```

### 2. Create a new project:
**Replace _project-name_ with the name of your new project:**

```
    banana new project-name
```

**You can also automatically init a new git repository:**

`banana new project-name --git` or `banana new project-name -g`

**Ready!**

# Configuration

### 1. Install project dependencies:
```
    npm install
```

### 2. Install database engine:
**Banana-split** uses **Sequelize ORM** that supports:

* **MySQL:** `npm i mysql2`
* **MariaDB:** `npm i mariadb`
* **Postgres:** `npm i pg pg-hstore`
* **MSSQL:** `npm i tedious`
* **SQLite:** `npm i sqlite3`

**After install set your engine dialect in the configuration files:**
_sequelize.conf.js_ and _database.conf.ts_ both located at src/database path:
`'mysql' | 'mariadb' | 'postgres' | 'mssql'`

***Note: SQLite3 receives special parameters.**
Read for more information: https://sequelize.org/v5/manual/getting-started.html

### 3. Configure the enviroment variables for database:
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

### 4. Create database and test table:
**For create the database you can do it manually or just run:**

```
    npx sequelize db:create
```

**Sequelize-cli** will do for you.

**After that you have to create the test table running the migration sample:**

```
    npx sequelize-cli db:migrate
```

**Now the database and user test table are created.**

---

#### (Optional) Changing ports:
If you wanna change default ports:
- Open _app.ts_ file and change the application ports as you want.

---

### 5. Ready to dev!

#### Now run the server:

```
    npm run server
```

# Check-in

**You can check this routes:**

* **Hello:** http://localhost:4000
* **Database Auth test:** http://localhost:4000/db-auth-test
* **Database Query test:** http://localhost:4000/db-query-test

**Or just run the tests:**
`npm test` or `npx jest`

---

# Documentation

## 1. GraphQL as independent service

By default **GraphQL** service is provided throw the **Express Server middleware**, this means that **GraphQL** will only works if **Express** is running.

To change this behavior you can specify that you want **GraphQL** running as independent port:

**app.ts**
```
    // Apollo Server:
    const apollo: Apollo = Apollo.build({
        port: 5000
    })

    await apollo.start()
```

Now **GraphQL** will be accesible via http://localhost:5000

## 2. About SQLite configuration

**SQLite** databases requieres two parameters in the **Sequelize** configuration object.
* Dialect
* Storage path

If you are using **SQLite** may you want to modify this configuration in _database.conf.ts_ file located at src/database:

**database.conf.ts**
```
    ...

    /**
    * 
    *  Sequelize App Options:
    *  @options
    * 
    */
    const SequelizeOptions: Sequelize.Options = {

        dialect: 'sqlite',
        storage: 'path/to/database.sqlite'

    }

    ...
```

## 3. Customizing GraphQL
To pre-process your **GraphQL** schema before **Banana** creates the service you can use the _customize.graphql.ts_ file located at src/graphql/apollo.

This file let you **manipulate** the schema with **Apollo** functions or **graphql-tools**, for example.

This function is called by the **Provider** before instanciates **Apollo Server** and receives as _parameter_ the **schema object** (returned by _makeExecutableSchema_ function from **Apollo**).

**Let's see an example:**

**customize.graphql.ts**
```
    ...

    ( schema: GraphQLSchema ): object => {

        // My GraphQL customization:
        addMockFunctionsToSchema({

            schema,
            mocks: {},
            preserveResolvers: false

        })
        // End


        /**
         * 
         *  Your Apollo options goes in there!!
         *  @options
         * 
         */
        const options: object = {

            schema,
            context: {}

            ...

        }
        

        return options

    }
```

**Finally** the function <ins>must returns</ins> an **options object** that will be passed **directly** to the **Apollo Server** construct for build the service.

## 4. Database vars for development, test and production

By default **Banana** uses the same variables for development, test and production.
Plus, **Banana** uses **dotenv** that allow you to create or delete your own variables easily.

For set differents variables you need to **put focus on two files:**
* **_sequelize.conf.ts_** located at src/database • _where we specify the variables to use_
* **_.env_** located at the root of your project • _where we declarate those variables_

**Let's see an example setting variables for development and testing:**

**sequelize.conf.ts**
```
    ...

    module.exports = {

        // For development:
        development: {

            dialect: 'mysql',

            host: process.env.DB_DEV_HOST,
            port: process.env.DB_DEV_PORT,

            username: process.env.DB_DEV_USERNAME,
            password: process.env.DB_DEV_PASSWORD,
            database: process.env.DB_DEV_DATABASE,

            ...

        },

        // For testing:
        test: {

            dialect: 'mysql',

            host: process.env.DB_TEST_HOST,
            port: process.env.DB_TEST_PORT,

            username: process.env.DB_TEST_USERNAME,
            password: process.env.DB_TEST_PASSWORD,
            database: process.env.DB_TEST_DATABASE,

            ...

        },

        // ...
    }
```

**Notice that we have two variable prefix groups here:**
* `DB_DEV_*` for development variables
* `DB_TEST_*` for testing variables

**In that way now you can declare those variables at your _.env_ file:**

**.env**
```
    # Development Database:

    DB_DEV_HOST=localhost
    DB_DEV_PORT=3306

    DB_DEV_DATABASE=test
    DB_DEV_USERNAME=root
    DB_DEV_PASSWORD=1234


    # Testing Database:

    DB_TEST_HOST=localhost
    DB_TEST_PORT=1433

    DB_TEST_DATABASE=digitalocean_test
    DB_TEST_USERNAME=user_db
    DB_TEST_PASSWORD=abcd1234
```

# Basics:

## 1. Creating new Routes modules
Routes in **Banana** works the same as in **Express**. 
For create a **new route** module you can use the _sample_ file _(routes.ts)_ as template.

**So you will have something like:**

**my-custom-routes.ts**
```
    /**
    * 
    *  My Custom Router
    *  @routes
    * 
    *  @module app/routes/my-custom-routes
    * 
    */


    import { Router } from 'express'

    // Creates new Router:
    const router: Router = Router()


    /**
    * 
    *  My Custom Controller
    *  @import @controller
    * 
    */
    import CustomController from '../controllers/my-custom-controller'


    ( $ => {

        /**
        * 
        *  My custom routes
        *  @routes
        * 
        */
        
        $.route( '/some-route' )
            .get( CustomController.doSomething )
        
    } )( router )


    export default router

```

__* Banana__ _recommend keeps the comments to give others more information about what are you doing._

**After that final step is register that module in the main routes file:**

**main.routes.ts**
```
    ...

    /**
    *  
    *  @import @routers
    *  Your custom Routers import goes here!!
    * 
    */
    import Router from './routes'
    import MyCustomRouter from './my-custom-router'     // My new Router import


    export default [

        /**
        * 
        *  @register @routes
        *  Your custom Routes register goes here!!
        *  
        */

        Router,
        MyCustomRouter      // My new Router registry

    ]
```

## 2. Creating new Controllers
**Banana** is a _MVC template_ so all the functions that will be handled by your routes should be contained in a class controller as static methods.

For create a **new controller** you can use the _sample_ file _(controller.ts)_ as template.

**So you will have something like:**

**my-custom-controller.ts**
```
    /**
    * 
    *  My Custom Controller
    *  @controller
    * 
    *  @module app/controllers/my-custom-controller
    *  @description This is my Custom Controller
    * 
    */


    import { Request, Response } from 'express'


    // Model:
    import Model from '../models/my-model'


    export default
        /**
        * 
        *  @class CustomController
        *  @classdesc This is my Custom Controller
        * 
        */
        class CustomController {

            /**
            *      I do something
            */
            public static doSomething( request: Request, response: Response ) {

                response.status( 200 )
                response.send( 'I did something :)' )

                return response
                
            }

        }
    ;
```

__* Banana__ _recommend keeps comments to give others more information about what are you doing._

**Now you can import your brand new Controller anywhere and access the methods by his class-name:**
`CustomController.doSomething()`

## 3. Creating new Models

**Models are the ORM representation of your database table.**

Read more: https://en.wikipedia.org/wiki/Object-relational_mapping

**For create a new model you have two choices:**
* Use **sequelize-cli** for command line
* Use the **model file** _template_ _(models.ts)_ included

**And there are three main differences:**
1. **Sequelize-cli** works with **Javascript** / **Banana** with **Typescript**
2. **Sequelize-cli** provides a _"less"_ orderly model / **Banana** is cool
3. **Sequelize-cli** works with _functions-based_ models / **Banana** with _class-based_ models

In this case, **Banana** recommend you to _use the template_ included becase works directly with **Typescript** and is **clean**.

### 3.1 Using sequelize-cli:
**Replace model-name and attribute:type and run:**
```
    npx sequelize-cli model:generate --name model-name --attributes attribute:type
```

You can **add multiple attributes** separated by comas: `--attributes id:number,name:string,lastname:string`

For more information about **sequelize-cli** usage please _visit_: https://sequelize.org/master/manual/migrations.html

### 3.2 Using the template:
**As said, this is the best option.**

In this case, class attributes <ins>only will works as a "guide"</ins> for list the table fields, real magic happens at **fields** object attribute. This object contains all the table representation.

**Important:** <ins>The class-name must be the same as your database table.</ins>

**So you will have something like this:**

**my-model.ts**
```
    /**
    *
    *  My new Model
    *  @model
    * 
    *  @module app/models/new-model
    *  @description This is my new model
    * 
    */


    import { Model, DataTypes } from 'sequelize'
    import { sequelize } from '../../providers/sequelize'

    
    class MyModel extends Model {

        // Fields:
        private id!: number
        private name!: string


        // Fields Definitions (defines Model):
        public static fields = {

            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },

            name: {
                type: new DataTypes.STRING(30),
                allowNull: false
            }
            
        }

        // Options:
        public static options = {
            sequelize,  // sequelize connection
            timestamps: false
        }

    }


    MyModel.init( MyModel.fields, MyModel.options )


    ; ( async () => {

        // do something async before export model if you need

    } )()

    
    export default MyModel
```

**Another option** is to pass the table name as value in the **options object**:

```
    // Options:
    public static options = {

        tableName: 'my_tablename',      // We pass the table name as options value

        sequelize,  // sequelize connection
        timestamps: false

    }
```

**Now your model is ready to interact with your database table.**

For more information using **sequelize** with **typescript** please _visit_: https://sequelize.org/v5/manual/typescript.html

## 4. Creating new Migrations and Seeders
In this cases the **best option** is to use **sequelize-cli**.

**Sequelize-cli don't provides native Typescript support**, therefore they must be written in **Javascript**.

### 4.1 Migrations:
**Migrations are like a "version control" history of your database.**
In a migration file you can create your tables, modifiy it or just delete it in a kind of "timeline".

**For create a new one replace the migration-name and run:**
```
    npx sequelize-cli migration:generate --name migration-name
```

**This command will generate the file automatically in the migrations folder.**

### 4.2 Seeders:
**Seeders are a mechanism to populate your database tables with data for develop and test your application.**
You can generate one file per table.

**For create a new one replace the seeder-name and run:**
```
    npx sequelize-cli seeder:generate --name seeder-name
```

**This command will generate the file automatically in the seeders folder.**

For more information about _creating migrations and seeders_ with **sequelize-cli** please _visit_: https://sequelize.org/master/manual/migrations.html

## 5. Creating new Helper functions
**Helper functions** are _portions of code_ that helps your _application_ to do **background specific task.**

**To add a new helper function** open the _helpers.ts_ file located at src/app/helpers **and type:**

**helpers.ts**
```
    /**
    * 
    *	Your helpers goes here!!
    *	@helpers
    * 
    */
    export function helper(): void {

        // do something helpful

    },

    // My new Helper:
    export function anotherHelper(): void {

        // do something helpful too

    }
```

Notice that we have two helpers function that can be imported independently.

**Now you can import your new helper from anywhere as:**

`import { anotherHelper } from './src/app/helpers/helpers'`

*_be sure to add the correct relative path to your helper file._

## 6. GraphQL: Registering new Schemas and Resolvers
**Create Schemas and Resolvers is quite simple. No words necessary.**

**After that** (just like routes) your new schemas and resolvers **need to be registered** in _main.schemas.ts_ and _main.resolvers.ts_ files located at src/graphql/schemas and src/graphql/resolvers folders.

**main.schemas.ts**
```
    /**
    *
    *  Your Schemas import goes here!!
    *  @import @schemas
    * 
    */
    import HelloSchema from './schemas/hello.schema'
    import MyNewSchema from './schemas/my-new-schema.schema'        // My new schema import


    export default [
        
        /**
        *
        *  Your Schemas register goes here!!
        *  @register @schemas
        * 
        */

        HelloSchema,
        MyNewSchema     // My new schema registry

    ]
```

**main.resolvers.ts**
```
    /**
    *
    *  Your Resolvers import goes here!!
    *  @import @resolvers
    * 
    */
    import HelloResolvers from './resolvers/hello.resolvers'
    import MyNewRosolvers from './resolvers/my-new-resolvers.resolvers'     // My new resolvers import


    export default [
        
        /**
        *
        *  Your Resolvers register goes here!!
        *  @register @resolvers
        * 
        */

        HelloResolvers,
        MyNewResolvers      // My new resolvers registry

    ]
```

**This is the way to tell Apollo that adds your new schemes and resolvers.**

# Advanced

## Extend Providers functionalities:
**Banana** is based on their own **Providers** classes that provides to the template all the basics services.

By default **Banana** includes three **Providers**.

**If you wanna extend or modify the functionalities of each one you dispose of three classes for do it:**
* **Express Provider:** This is the _class_ that provides all the **Express Server service** and the **middlewaring**
* **Apollo Provider:** This is the _class_ that provides all the **GraphQL and Apollo Server services**
* **Sequelize Provider:** This is the _class_ that provides all the **Sequelize ORM integration** and **Database configuration** for your application

**This classes are all located at the src/providers folder.**

### You are free for extend or modify what you want.

---

# More information

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
**Banana-split template • 2020**
