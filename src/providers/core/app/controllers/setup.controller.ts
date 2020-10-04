/**
 * 
 *  Controller: Setup
 *  @module providers/core/app/controllers/setup
 * 
 *  @description controller for setup test
 * 
 */
import { Request, Response } from 'express'
import { Sequelize } from '@bananasplit-js'


/**
 *  @model @import
 */
import User from '@models/user'


export default

    class Controller {

        /**
         *   @handler Hello response
         */
        public static hello ( request: Request, response: Response ) {
            return response.status( 200 ).send( 'GET 200 / Hello' )
        }


        /**
         *  @handler Database connection test
         */
        public static async databaseConnectionTest ( request: Request, response: Response ) {
            try {
                await Sequelize.authenticate()
                response.status( 200 ).send( 'Connection has been established successfully.' )

            } catch(e) {
                response.status( 500 ).send( `Unable to connect to the database: ${e}` )
            }


            return response
        }


        /**
         *  @handler Database query test
         */
        public static async databaseQueryTest ( request: Request, response: Response ) {
            try {
                const [ result ] = await Sequelize.query( "SELECT 'Hello from database!' as result" )
                response.status( 200 ).send( result )

            } catch(e) {
                response.status( 500 ).send( `Unable to connect to the database: ${e}` )
            }


            return response
        }


        /**
         *  @handler Sequelize ORM query test
         */
        public static async getUsers ( request: Request, response: Response ) {
            try {
                const result = await User.findAll()
                response.status( 200 ).send( result )

            } catch(e) {
                response.status( 500 ).send( e )
            }


            return response
        }

    }
;
