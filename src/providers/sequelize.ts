/**
 *
 *  Sequelize Provider
 * 
 *  @module providers/sequelize
 *  @description Provides an ORM for interact with Database
 * 
 */



import { Sequelize, Options as SequelizeOptions } from 'sequelize'
import SequelizeCustomOptions from '../database/sequelize.conf'

import chalk from 'chalk'
import dotenv from 'dotenv'



dotenv.config()



/**
 * 
 *  Definitions for Database Auth
 *  @typedef
 * 
 */
type DBAuth = {

    database: string,
    username: string,
    password?: string

}



/**
 * 
 *  @class SequelizeProvider
 *  @classdesc Provides an ORM for interact with Database
 * 
 */
class SequelizeProvider {

    /**
     * 
     *  @private @property { Sequelize } service
     * 
     */
    private service: ( Sequelize | undefined )


    /**
     *
     *  Singleton instance
     *  @private @static @property { SequelizeProvider } instance
     * 
     */
    private static instance: SequelizeProvider



    /**
     * 
     *  @constructor
     *  @private
     * 
     *  Not accesible
     *  Implements: Singleton pattern
     * 
     */
    private constructor() {
        // Singleton      
    }


    /**
     *  
     *  Singleton
     *  @description Build or returns a Singleton instance for SequelizeProvider
     * 
     *  @static @method build
     *  @returns { SequelizeProvider }
     * 
     */
    public static build(): SequelizeProvider {

        if ( ! this.instance ) {

            // Creates a new instance
            this.instance = new SequelizeProvider()

            // Makes Auth credentials
            const DBAuth: DBAuth | string = this.instance.makeAuth()
            // Makes config options
            const SequelizeOptions: SequelizeOptions = this.instance.makeOptions()


            // Creates Sequelize instance
            if ( typeof DBAuth === 'object' )
                this.instance.service = new Sequelize( ... Object.values( <Object> DBAuth ), SequelizeOptions )
            
            else
                // String connection
                this.instance.service = new Sequelize( DBAuth, SequelizeOptions )

        }


        return this.instance

    }


    /**
     * 
     *  Makes the DB Auth
     *  @private @method makeAuth
     * 
     *  @returns { DBAuth | string }
     * 
     */
    private makeAuth = (): DBAuth | string => {

        let DBAuth: DBAuth | string

        // ENV enviroment types
        let DB_STRING: string = ''

        let DB_DATABASE: string = ''
        let DB_USERNAME: string = ''
        let DB_PASSWORD: string = ''


        switch ( process.env.NODE_ENV ) {

            case 'development':

                DB_STRING = 'DB_STRING'

                DB_DATABASE = 'DB_DATABASE'
                DB_USERNAME = 'DB_USERNAME'
                DB_PASSWORD = 'DB_PASSWORD'

                break

            ;
            

            case 'test':

                DB_STRING = 'TEST_DB_STRING'

                DB_DATABASE = 'TEST_DB_DATABASE'
                DB_USERNAME = 'TEST_DB_USERNAME'
                DB_PASSWORD = 'TEST_DB_PASSWORD'

                break
            
            ;


            case 'production':

                DB_STRING = 'PROD_DB_STRING'

                DB_DATABASE = 'PROD_DB_DATABASE'
                DB_USERNAME = 'PROD_DB_USERNAME'
                DB_PASSWORD = 'PROD_DB_PASSWORD'

                break
                
            ;


            default:
                
                console.log( chalk.bgRed.white( 'Enviroment not valid. Options are: "development", "test", "production".' ) )

        }


        if ( process.env[ DB_STRING ] )
            DBAuth = <string> process.env[ DB_STRING ]

        else

            DBAuth = {

                database: <string> process.env[ DB_DATABASE ],
                username: <string> process.env[ DB_USERNAME ],
                password: <string> process.env[ DB_PASSWORD ]
            
            }

        ;


        return DBAuth

    }


    /**
     * 
     *  Makes the Configuration Options
     * 
     *  @private @method makeOptions
     *  @returns { SequelizeOptions }
     * 
     */
    private makeOptions = (): SequelizeOptions => {

        let SequelizeOptions: SequelizeOptions = {
            
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },

            logging: ( process.env.NODE_ENV === 'development' ) ?
                console.log : false
            ,

        }


        let DB_DIALECT: string = ''
        let DB_HOST: string = ''
        let DB_PORT: string = ''


        switch ( process.env.NODE_ENV ) {

            case 'development':

                DB_DIALECT = 'DB_DIALECT'
                DB_HOST = 'DB_HOST'
                DB_PORT = 'DB_PORT'

                break

            ;


            case 'test':

                DB_DIALECT = 'TEST_DB_DIALECT'
                DB_HOST = 'TEST_DB_HOST'
                DB_PORT = 'TEST_DB_PORT'

                break

            ;

            
            case 'production':

                DB_DIALECT = 'PROD_DB_DIALECT'
                DB_HOST = 'PROD_DB_HOST'
                DB_PORT = 'PROD_DB_PORT'

                break

            ;

        }


        SequelizeOptions = {

            ... SequelizeOptions,

            dialect: eval( `"${process.env[ DB_DIALECT ]}"` ),
            host: <string> process.env[ DB_HOST ],
            port: parseInt( process.env[ DB_PORT ]! )
        
        }


        // Overwrite default options by dev options
        SequelizeOptions = { ... SequelizeOptions, ... SequelizeCustomOptions }


        return SequelizeOptions

    }


    /**
     * 
     *  Returns sequelize instance
     *  
     *  @method app
     *  @returns { Sequelize }
     * 
     */
    public app = (): Sequelize => <Sequelize> this.service

}



// Sequelize singleton instance for usage
const sequelizeProvider: SequelizeProvider = SequelizeProvider.build()
const sequelize: Sequelize = sequelizeProvider.app()



export default sequelize
