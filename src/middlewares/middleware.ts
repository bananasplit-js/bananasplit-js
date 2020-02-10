/**
 * 
 *  Middlewares
 *  @middleware
 * 
 *  @module middlewares/middleware
 * 
 */


import Express from 'express'
import Morgan from 'morgan'


export default

    ( app: Express.Application ): void => {
        
        /**
         * 
         *  Your Middlewares goes here!!
         * 
         */
        
        app.use( Morgan('dev') )
        app.use( Express.json() )

        // Public directory:
        app.use( Express.static( './../public' ) )

    }
;
