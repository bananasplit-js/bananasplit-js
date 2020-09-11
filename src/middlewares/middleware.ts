/**
 * 
 *  Middlewares
 *  @middleware
 *  @module middlewares/middleware
 * 
 *  @description Contains all express server middlewares
 * 
 */
import Express from 'express'

import Morgan from 'morgan'
import dontenv from 'dotenv'
import path from 'path'


dontenv.config()



export default

    ( app: Express.Application ) => {
        
        /**
         *
         *  @middlewares 
         *  Your middlewares goes here
         * 
         */
        if ( process.env.NODE_ENV === 'development' )
            app.use( Morgan('dev') )
        ;

        app.use( Express.json() )

        // Public
        app.use( Express.static(app.get('public')) )

    }
;
