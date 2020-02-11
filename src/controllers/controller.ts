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


import { Request, Response } from 'express'
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

    }
;
