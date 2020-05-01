/**
 * 
 *  Sequelize-CLI Configuration
 *  @config
 * 
 *  @description Contains all Sequelize-CLI configurations for the command-line. 
 *
 */


const fs = require( 'fs' )
const dotenv = require( 'dotenv' )

const SequelizeCLICustomOptions = require( './../../database/sequelize-cli.conf' )


dotenv.config()



let SequelizeCLIOptions = {

    // For development

    development: {

        dialect: eval(`"${process.env.DB_DIALECT}"`),

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

        dialect: eval(`"${process.env.TEST_DB_DIALECT}" || "${process.env.DB_DIALECT}"`),

        host: process.env.TEST_DB_HOST || process.env.DB_HOST,
        port: process.env.TEST_DB_PORT || process.env.DB_PORT,

        username: process.env.DB_TEST_USERNAME || process.env.DB_USERNAME,
        password: process.env.DB_TEST_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.DB_TEST_DATABASE || process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true
        }

    },

    
    // For production
    
    production: {

        dialect: eval(`"${process.env.PROD_DB_DIALECT}" || "${process.env.DB_DIALECT}"`),

        host: process.env.PROD_DB_HOST || process.env.HOST,
        port: process.env.PROD_DB_PORT || process.env.PORT,

        username: process.env.DB_PROD_USERNAME || process.env.DB_USERNAME,
        password: process.env.DB_PROD_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.DB_PROD_DATABASE || process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true,
            ssl: {}
        }

    }

}



// Merge defaults with dev config
SequelizeCLIOptions.development = { ... SequelizeCLIOptions.development, ... SequelizeCLICustomOptions.development }
SequelizeCLIOptions.test = { ... SequelizeCLIOptions.test, ... SequelizeCLICustomOptions.test }
SequelizeCLIOptions.production = { ... SequelizeCLIOptions.production, ... SequelizeCLICustomOptions.production }



module.exports = SequelizeCLIOptions
