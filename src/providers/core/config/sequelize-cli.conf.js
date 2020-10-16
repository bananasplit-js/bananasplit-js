/**
 * 
 *  Sequelize Client: options
 *  @config
 * 
 *  @description manage default and custom sequelize client options
 *
 */
import dotenv from 'dotenv'
import CustomOptions from '@config/sequelize/sequelize-cli.conf'


dotenv.config()


export default {

    /**
     *  @development 
     */
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


    /**
     *  @test
     */
    test: {

        dialect: eval(`"${process.env.DB_DIALECT}"`),

        host: process.env.DB_HOST,
        port: process.env.DB_PORT,

        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true
        },

        ...CustomOptions.test

    },


    /**
     *  @production
     */
    production: {

        dialect: eval(`"${process.env.DB_DIALECT}"`),

        host: process.env.DB_HOST,
        port: process.env.DB_PORT,

        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,

        dialectOptions: {
            bigNumberStrings: true,
            ssl: {}
        },

        ...CustomOptions.production

    }

}
