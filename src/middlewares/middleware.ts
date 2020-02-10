/**
 * 
 *  Middlewares
 *  @middleware
 * 
 *  @module middlewares/middleware
 * 
 */


import Express, { Application as ExpressApp } from 'express'
import Morgan from 'morgan'


export default

    ( server: ExpressApp ): void => {
        
        /**
         * 
         *  Your Middlewares goes here!!
         * 
         */
        
        server.use( Morgan('dev') )
        server.use( Express.json() )

    }
;
