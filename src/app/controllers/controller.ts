/**
 * 
 *  Controller
 *  @controller
 * 
 *  @module app/controllers/controller
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Controllers template! ***
 * 
 */


import { Request, Response } from 'express'
import { sequelize } from '../../providers/sequelize'
import path from 'path'


// Model:
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
         *      Hello response
         */
        public static hello( request: Request, response: Response ) {

            response.status( 200 )
            response.render( 'index' )

            return response
            
        }


        /**
         *      Database Connection Test
         */
        public static async databaseConnectionTest( request: Request, response: Response ) {

            try {
                await sequelize.authenticate()
                response.send( 'Connection has been established successfully.' )

            } catch( e ) {
                response.send( `Unable to connect to the database: ${e}` )
            }


            return response

        }


        /**
         *      Database Query Test
         */
        public static async databaseQueryTest( request: Request, response: Response ) {

            try {
                const [ result ] = await sequelize.query( "SELECT 'Hello from database!' as result" )
                response.send( result )

            } catch( e ) {
                response.send( `Unable to connect to the database: ${e}` )
            }


            return response

        }


        /**
         *      Sequelize ORM Query Test
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
