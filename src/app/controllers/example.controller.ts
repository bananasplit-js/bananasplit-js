/**
 * 
 *  Controller
 *  @controller
 * 
 *  @module app/controllers/example.controller
 *  @description * you can remove it or modify it *
 * 
 *  use this file as your controllers template **
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
import User from '../models/example.model'


export default
    /**
     * 
     *  @class Controller
     *  @classdesc An example Controller
     * 
     */
    class Controller {

        /**
         *      Hello response      @handler
         */
        public static hello( request: Request, response: Response ) {

            response.status( 200 )
            response.send( 'Bananasplit-js!' )

            return response
            
        }


        /**
         *      Database Connection Test    @handler
         */
        public static async databaseConnectionTest( request: Request, response: Response ) {

            try {
                await sequelize.authenticate()
                response.send( 'Connection has been established successfully.' )

            } catch(e) {
                response.send( `Unable to connect to the database: ${e}` )
            }


            return response

        }


        /**
         *      Database Query Test     @handler
         */
        public static async databaseQueryTest( request: Request, response: Response ) {

            try {
                const [ result ] = await sequelize.query( "SELECT 'Hello from database!' as result" )
                response.send( result )

            } catch(e) {
                response.send( `Unable to connect to the database: ${e}` )
            }


            return response

        }


        /**
         *      Sequelize ORM Query Test    @handler
         */
        public static async getUsers( request: Request, response: Response ) {

            try {
                const result = await User.findAll()
                response.send( result )

            } catch(e) {
                response.send( e )
            }


            return response

        }

    }
;
