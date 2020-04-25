/**
 * 
 *  Sequelize Configuration Options for Database
 *  @description Contains all Sequelize configurations for command-line (Sequelize-CLI). 
 * 
 *	!IMPORTANT: All values (except dialect that must has an expicity value) MUST be
 *	modified at the .env file in the root project directory.
 *
 */


const fs = require( 'fs' )
const dotenv = require( 'dotenv' )


dotenv.config()



module.exports = {

    // For development
    development: {

        dialect: '',       // 'mysql' | 'mariadb' | 'postgres' | 'mssql'

        host: process.env.HOST,
        port: process.env.PORT,

        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true
        }

    },


    // You can set your own variables for test in .env *
    test: {

        dialect: '',        // 'mysql' | 'mariadb' | 'postgres' | 'mssql'

        host: process.env.HOST,
        port: process.env.PORT,

        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true
        }

    },

    
    // You can set your own variables for production in .env *
    production: {

        dialect: '',        // 'mysql' | 'mariadb' | 'postgres' | 'mssql'

        host: process.env.HOST,
        port: process.env.PORT,

        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true,
            ssl: {}
        }

    }

}
