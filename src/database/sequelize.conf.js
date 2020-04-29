/**
 * 
 *  Sequelize Configuration Options for Database
 *  @description Contains all Sequelize configurations for command-line (Sequelize-cli). 
 * 
 *	IMPORTANT:
 *  All values (except dialect that must has an expicity value) MUST be
 *	modified at the .env file at the root project directory.
 *
 */


const fs = require( 'fs' )
const dotenv = require( 'dotenv' )


dotenv.config()



/**
 * 
 *  Dialect possibilities:
 *  'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'sqlite'
 * 
 */
module.exports = {

    // For development

    development: {

        dialect: '',

        host: process.env.HOST,
        port: process.env.PORT,

        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true
        }

    },


    // For testing

    test: {

        dialect: '',

        host: process.env.TEST_HOST || process.env.HOST,
        port: process.env.TEST_PORT || process.env.PORT,

        username: process.env.DB_TEST_USERNAME || process.env.DB_USERNAME,
        password: process.env.DB_TEST_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.DB_TEST_DATABASE || process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true
        }

    },

    
    // For production
    
    production: {

        dialect: '',

        host: process.env.PROD_HOST || process.env.HOST,
        port: process.env.PROD_PORT || process.env.PORT,

        username: process.env.DB_PROD_USERNAME || process.env.DB_USERNAME,
        password: process.env.DB_PROD_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.DB_PROD_DATABASE || process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true,
            ssl: {}
        }

    }

}
