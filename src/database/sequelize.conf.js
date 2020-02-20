/**
 * 
 *  Sequelize Configuration Options for Database
 *  @description Contains all Sequelize configurations for command-line (Sequelize-CLI). 
 * 
 *	! IMPORTANT: All values (except dialect that must has an expicity value) MUST be
 *	modified at the .env file in the root project directory.
 *
 */


const fs = require( 'fs' )
const dotenv = require( 'dotenv' )


dotenv.config()


module.exports = {
    // For development:
    development: {

        dialect: '',

        host: process.env.HOST,
        port: process.env.PORT,

        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,

        dialectOptions: {
            bigNumberStrings: true
        }

    },

    // * You can set your own variables for test in .env:
    test: {

        dialect: '',

        host: process.env.HOST,
        port: process.env.PORT,

        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,

        dialectOptions: {
            bigNumberStrings: true
        }

    },

    // * You can set your own variables for production in .env:
    production: {

        dialect: '',

        host: process.env.HOST,
        port: process.env.PORT,

        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,

        dialectOptions: {
            bigNumberStrings: true,
            ssl: {
                // ca: fs.readFileSync( __dirname + '/[engine]-ca-master.crt' )
            }
        }

    }

}
