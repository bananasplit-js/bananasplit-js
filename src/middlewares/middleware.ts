/**
 * 
 *  Middlewares
 *  @module middlewares/middleware
 * 
 */


import { Application as ExpressApp } from 'express'
import Morgan from 'morgan'


export default

    ( server: ExpressApp ): void => {
        
        /**
         * 
         *  Your middlewares goes here!!
         * 
         */
        
        server.use( Morgan('dev') )

    }
;
