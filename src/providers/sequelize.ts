/**
 *
 *  Sequelize Provider
 * 
 *  @module providers/sequelize
 *  @description Provides an ORM for interact with Database
 * 
 */



import { Sequelize, Options as SequelizeOptions } from 'sequelize'
import DBAuth from '../providers/interfaces/database.auth'
import SequelizeCustomOptions from '../database/sequelize.conf'

import chalk from 'chalk'
import dotenv from 'dotenv'



dotenv.config()



/**
 * 
 *  @class SequelizeProvider
 *  @classdesc Provides an ORM for interact with Database
 * 
 */
class SequelizeProvider {

    /**
     * 
     *  @private @property { Sequelize } sequelize
     * 
     */
    private sequelize: Sequelize


    /**
     * 
     * @constructor
     * 
     * @param { object } SequelizeOptions
     * 
     */
    constructor() {

        const DBAuth: DBAuth | string = this.makeAuth()
        const SequelizeOptions: SequelizeOptions = this.makeOptions()


        if ( typeof DBAuth === 'object' )
            this.sequelize = new Sequelize( ... Object.values( DBAuth ), SequelizeOptions )
        
        else
            // String connection
            this.sequelize = new Sequelize( DBAuth, SequelizeOptions )

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


        switch ( process.env.NODE_ENV ) {

            case 'development':

                if ( process.env.DB_STRING )
                    DBAuth = <string> process.env.DB_STRING

                else
                    DBAuth = {
        
                        database: <string> process.env.DB_DATABASE,
                        username: <string> process.env.DB_USERNAME,
                        password: <string> process.env.DB_PASSWORD
                    
                    }

                ;

                break

            ;
            

            case 'test':

                if ( process.env.TEST_DB_STRING )
                    DBAuth = <string> process.env.TEST_DB_STRING

                else
                    DBAuth = {
                
                        database: <string> process.env.DB_TEST_DATABASE,
                        username: <string> process.env.DB_TEST_USERNAME,
                        password: <string> process.env.DB_TEST_PASSWORD
                    
                    }

                ;

                break
            
            ;


            case 'production':

                if ( process.env.PROD_DB_STRING )
                    DBAuth = <string> process.env.PROD_DB_STRING

                else
                    DBAuth = {
        
                        database: <string> process.env.PROD_DB_DATABASE,
                        username: <string> process.env.PROD_DB_USERNAME,
                        password: <string> process.env.PROD_DB_PASSWORD
                    
                    }

                ;

                break
                
            ;


            default:
                
                DBAuth = '' // Forced string
                console.log( chalk.bgRed.white( 'Enviroment not valid. Options are: "dev", "test", "prod".' ) )

        }


        return DBAuth

    }


    /**
     * 
     *  Makes the Configuration Options
     * 
     *  @private method makeOptions
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
            }

        }


        switch ( process.env.NODE_ENV ) {

            case 'development':

                SequelizeOptions = {

                    ... SequelizeOptions,

                    dialect: eval(`"${process.env.DB_DIALECT}"`),
                    host: <string> process.env.DB_HOST,
                
                }

                break

            ;


            case 'test':

                SequelizeOptions = {

                    ... SequelizeOptions,
                    
                    dialect: eval(`"${process.env.TEST_DB_DIALECT}"`),
                    host: <string> process.env.TEST_DB_HOST,
                
                }

                break

            ;

            case 'production':

                SequelizeOptions = {

                    ... SequelizeOptions,
                    
                    dialect: eval(`"${process.env.PROD_DB_DIALECT}"`),
                    host: <string> process.env.PROD_DB_HOST,
                
                }

                break

            ;

        }


        // Overwrite default options by dev options
        SequelizeOptions = { ... SequelizeOptions, ... SequelizeCustomOptions }


        return SequelizeOptions

    }


    /**
     * 
     *  Returns sequelize instance
     *  
     *  @method
     *  @returns { Sequelize }
     * 
     */
    public get = (): Sequelize => this.sequelize

}



// Sequelize instance for usage
const sequelizeProvider: SequelizeProvider = new SequelizeProvider()
const sequelize: Sequelize = sequelizeProvider.get()



// You can add more sequelize instances to export ** 
export { sequelize }
