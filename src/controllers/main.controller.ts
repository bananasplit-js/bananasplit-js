/**
 * 
 *  Main Controller
 * 
 *  @module controllers/main.controller
 *  @description Provides Main Actions
 * 
 */


import { Request, Response } from 'express'


export default
    /**
     * 
     *  @class MainController
     *  @classdesc Provides Main Actions
     * 
     */
    class MainController {
        /**
         * 
         *  Main Response
         * 
         *  @param { Request } request 
         *  @param { Response } response
         * 
         *  @returns { Response }
         * 
         */
        public static mainResponse( request: Request, response: Response ): Response {
            return response.send( 'You requested: /' )
        }
    }
;
