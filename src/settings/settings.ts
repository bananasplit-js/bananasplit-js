/**
 * 
 *  Settings
 *  @module settings/settings
 * 
 */


import Express, { Application as ExpressApp } from 'express'


export default

    ( server: ExpressApp ): void => {

        /**
         * 
         *  Your Settings goes here!!
         *  @settings
         * 
         */

        // server.set( 'key', value )

        // Public directory:
        server.use( Express.static( './../public' ) )
        
    }

;
