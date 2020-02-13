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
            response.sendFile( path.join( __dirname + '/../views/index.html' ) )

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

    }
;
