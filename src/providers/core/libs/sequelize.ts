/**
 *
 *  Provider: Sequelize
 *  @module providers/core/libs/sequelize
 * 
 *  @description provides an ORM for interact with the database
 * 
 */
import { Sequelize, Options } from 'sequelize'
import CustomOptions from '@config/sequelize/sequelize.conf'

import dotenv from 'dotenv'


dotenv.config()


/**
 * 
 *  Definitions for database auth
 *  @typedef
 * 
 */
interface DBAuth {
    database: string
    username: string
    password?: string
}



/**
 * 
 *  @class SequelizeProvider
 *  @classdesc Provides an ORM for interact with database
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
     *  Implements: singleton pattern
     * 
     */
    private constructor() {
        // Singleton      
    }


    /**
     *  
     *  Singleton
     *  @description build or returns a singleton instance
     * 
     *  @static @method build
     *  @returns { SequelizeProvider }
     * 
     */
    public static provide (): SequelizeProvider {

        if ( !this.instance ) {

            // Creates a new instance
            this.instance = new SequelizeProvider()

            // Builds auth credentials
            const DBAuth: DBAuth | string = this.instance.makeAuth()

            // Builds config options
            const Options: Options = this.instance.makeOptions()


            // Creates a sequelize instance
            if ( typeof DBAuth === 'object' )
                this.instance.service = new Sequelize( ...Object.values(<Object> DBAuth), Options )
            
            else
                // String connection way
                this.instance.service = new Sequelize( DBAuth, Options )

        }


        return this.instance

    }


    /**
     * 
     *  Builds the DB auth
     *  @private @method makeAuth
     * 
     *  @returns { DBAuth | string }
     * 
     */
    private makeAuth = (): DBAuth | string => {

        let DBAuth: DBAuth | string


        if ( process.env['DB_STRING'] )
            DBAuth = <string> process.env[ 'DB_STRING' ]

        else

            DBAuth = {

                database: <string> process.env[ 'DB_DATABASE' ],
                username: <string> process.env[ 'DB_USERNAME' ],
                password: <string> process.env[ 'DB_PASSWORD' ]
            
            }

        ;


        return DBAuth

    }


    /**
     * 
     *  Builds the configuration options
     * 
     *  @private @method makeOptions
     *  @returns { Options }
     * 
     */
    private makeOptions = (): Options => {

        let Options: Options = {
            
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


        Options = {

            ...Options,

            dialect: eval( `"${process.env['DB_DIALECT']}"` ),
            host: <string> process.env['DB_HOST'],
            port: parseInt( process.env['DB_PORT']! )
        
        }


        // Overwrite default options by custom
        Options = { ...Options, ...CustomOptions }


        return Options

    }


    /**
     * 
     *  Returns sequelize instance
     *  
     *  @method app
     *  @returns { Sequelize }
     * 
     */
    public application = (): Sequelize => <Sequelize> this.service

}


// Singleton sequelize instance for usage
const sequelizeProvider: SequelizeProvider = SequelizeProvider.provide()
const sequelize: Sequelize = sequelizeProvider.application()


export default sequelize
