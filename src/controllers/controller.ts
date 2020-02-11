/**
 * 
 *  Controller
 * 
 *  @module controllers/controller
 *  @description Provides default actions
 * 
 */


import { Request, Response } from 'express'
import path from 'path'


export default
    /**
     * 
     *  @class Controller
     *  @classdesc Provides default handlers
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

            response.status(200)
            response.sendFile( path.join( __dirname + '/../views/index.html' ) )

            return response
            
        }
    }
;
