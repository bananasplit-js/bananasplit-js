/**
 * 
 *  Sequelize-cli configuration
 *  @config
 * 
 *  @description contains all sequelize-cli configurations
 *
 */
import dotenv from 'dotenv'
import CustomOptions from '@config/sequelize/sequelize-cli.conf'


dotenv.config()


export default {

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

        ...CustomOptions.development

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

        ...CustomOptions.test

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

        ...CustomOptions.production

    }

}
