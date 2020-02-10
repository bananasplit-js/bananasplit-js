/**
 * 
 *  Main Routes
 *  @module routes/main.routes
 * 
 */


import { Application as ExpressApp } from 'express'


/**
 *  
 *  @routers @import
 *  Your custom Routers import goes here!!
 * 
 */
import DefaultRouter from './default.routes'


export default

    ( server: ExpressApp ): void => {

        /**
         * 
         *  @routes @register
         *  Your custom Routes register goes here!!
         *  
         */

        // Register Default Router:
        server.use( DefaultRouter )

    }

;
