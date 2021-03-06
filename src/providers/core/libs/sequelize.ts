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
 *  @description provides an ORM for interact with database
 * 
 */
class SequelizeProvider {

    /**
     * 
     *  @property { Sequelize } service
     * 
     */
    private service!: Sequelize


    /**
     *
     *  Singleton instance
     *  @property { SequelizeProvider } instance
     * 
     */
    private static instance: SequelizeProvider


    /**
     * 
     *  @constructor
     * 
     *  Not accesible
     *  Implements: singleton pattern
     * 
     */
    private constructor() { /* Singleton */ }


    /**
     *  
     *  Singleton
     *  @description build or returns a singleton instance
     * 
     *  @method build
     *  @returns { SequelizeProvider }
     * 
     */
    public static provide (): SequelizeProvider {

        if ( !this.instance ) {
            this.instance = new SequelizeProvider()

            const DBAuth: DBAuth | string = this.instance.makeAuth()
            const $Options: Options = this.instance.makeOptions()

            this.instance.service = ( DBAuth instanceof Object )
                ? new Sequelize( ...Object.values(DBAuth), $Options )
                : new Sequelize( DBAuth, $Options )
            ;
        }

        return this.instance

    }


    /**
     * 
     *  Builds the DB auth
     *  @method makeAuth
     * 
     *  @returns { DBAuth | string }
     * 
     */
    private makeAuth = (): DBAuth | string => {

        return process.env['DB_STRING'] || {
            database: process.env['DB_DATABASE']!,
            username: process.env['DB_USERNAME']!,
            password: process.env['DB_PASSWORD']
        }

    }


    /**
     * 
     *  Builds the configuration options
     * 
     *  @method makeOptions
     *  @returns { Options }
     * 
     */
    private makeOptions = (): Options => ({
        
        dialect: eval( `"${process.env['DB_DIALECT']}"` ),
        host: process.env['DB_HOST'],
        port: Number( process.env['DB_PORT'] ),

        logging: ( process.env.NODE_ENV === 'development' ) ?
            console.log : false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        ...CustomOptions

    })

    
    /**
     * 
     *  Returns the sequelize provider instance
     * 
     *  @method getInstance
     *  @returns { SequelizeProvider }
     * 
     */
    public static getInstance = (): SequelizeProvider => SequelizeProvider.instance


    /**
     * 
     *  Returns the sequelize instance
     *  
     *  @method application
     *  @returns { Sequelize }
     * 
     */
    public application = (): Sequelize => SequelizeProvider.getInstance().service

}



export default SequelizeProvider.provide().application()
