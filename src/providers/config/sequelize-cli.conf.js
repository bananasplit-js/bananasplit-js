/**
 * 
 *  Sequelize-cli configuration file
 *  @config
 * 
 *  @description Contains all sequelize-cli configurations
 *
 */


const fs = require( 'fs' )
const dotenv = require( 'dotenv' )

const SequelizeCLICustomOptions = require( './../../database/config/sequelize-cli.conf' )


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
        },

    },


    // For testing

    test: {

        dialect: eval(`"${process.env.TEST_DB_DIALECT}"`),

        host: process.env.TEST_DB_HOST,
        port: process.env.TEST_DB_PORT,

        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true
        },

    },

    
    // For production
    
    production: {

        dialect: eval(`"${process.env.PROD_DB_DIALECT}"`),

        host: process.env.PROD_DB_HOST,
        port: process.env.PROD_DB_PORT,

        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true,
            ssl: {}
        },

    }

}



// Merge defaults with the developer config
SequelizeCLIOptions.development = { ... SequelizeCLIOptions.development, ... SequelizeCLICustomOptions.development }
SequelizeCLIOptions.test = { ... SequelizeCLIOptions.test, ... SequelizeCLICustomOptions.test }
SequelizeCLIOptions.production = { ... SequelizeCLIOptions.production, ... SequelizeCLICustomOptions.production }



module.exports = SequelizeCLIOptions
