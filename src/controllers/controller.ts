/**
 * 
 *  Controller
 *  @controller
 * 
 *  @module controllers/controller
 *  @description * you can remove it or modify it *
 * 
 *  @use this file as your Controllers template! ***
 * 
 */


import { Request, Response, response } from 'express'
import { sequelize } from '../providers/sequelize'

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
         * 
         *  Hello response
         * 
         *  @param { Request } request 
         *  @param { Response } response
         * 
         *  @returns { Response }
         * 
         */
        public static hello( request: Request, response: Response ): Response {

            response.status( 200 )
            response.sendFile( path.join( __dirname + '/../views/index.html' ) )

            return response
            
        }


        /**
         * 
         *  Database Connection Test
         * 
         *  @param { Request } request 
         *  @param { Response } response
         * 
         *  @returns { Response }
         * 
         */
        public static async databaseConnectionTest( request: Request, response: Response ): Promise <Response> {

            try {
                sequelize.authenticate()
                response.send( 'Connection has been established successfully.' )

            } catch( e ) {
                response.send( `Unable to connect to the database: ${e}` )
            }


            return response

        }


        /**
         * 
         *  Database Query Test
         * 
         *  @param { Request } request 
         *  @param { Response } response
         * 
         *  @returns { Response }
         * 
         */
        public static async databaseQueryTest( request: Request, response: Response ): Promise <Response> {

            try {
                const [ result ] = await sequelize.query( 'SELECT "Hello from database!" as result' )
                response.send( result )

            } catch( e ) {
                response.send( `Unable to connect to the database: ${e}` )
            }


            return response

        }

    }
;
