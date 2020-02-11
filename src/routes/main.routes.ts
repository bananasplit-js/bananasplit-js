/**
 * 
 *  Main Routes
 *  @routes
 * 
 *  @module routes/main.routes
 *  @description registers all application routers
 * 
 */


import Express from 'express'


/**
 *  
 *  @import @routers
 *  Your custom Routers import goes here!!
 * 
 */
import Router from './routes'


export default

    ( app: Express.Application ): void => {

        /**
         * 
         *  @register @routes
         *  Your custom Routes register goes here!!
         *  
         */

        // Register Default Router:
        app.use( Router )

    }

;
