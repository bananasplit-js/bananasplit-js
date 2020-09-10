/**
 * 
 *  Controller
 *  @controller
 * 
 *  @module app/controllers/example
 *  @description * you can remove or modify this *
 * 
 */


import { Request, Response } from 'express'
import sequelize from '../../providers/sequelize'

import path from 'path'


/**
 * 
 *  @models @import
 *  Your model import goes here.
 * 
 */
import User from '../models/user'


export default
    /**
     * 
     *  @class Controller
     *  @classdesc An example Controller
     * 
     */
    class Controller {

        /**
         *      Hello response @handler
         */
        public static hello( request: Request, response: Response ) {

            return response.status( 200 ).send( 'GET 200 / Hello' )
            
        }


        /**
         *      Database Connection Test @handler
         */
        public static async databaseConnectionTest( request: Request, response: Response ) {

            try {
                await sequelize.authenticate()
                response.status( 200 ).send( 'Connection has been established successfully.' )

            } catch(e) {
                response.status( 500 ).send( `Unable to connect to the database: ${e}` )
            }


            return response

        }


        /**
         *      Database Query Test @handler
         */
        public static async databaseQueryTest( request: Request, response: Response ) {

            try {
                const [ result ] = await sequelize.query( "SELECT 'Hello from database!' as result" )
                response.status( 200 ).send( result )

            } catch(e) {
                response.status( 500 ).send( `Unable to connect to the database: ${e}` )
            }


            return response

        }


        /**
         *      Sequelize ORM Query Test @handler
         */
        public static async getUsers( request: Request, response: Response ) {

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
