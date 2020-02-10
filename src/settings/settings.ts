/**
 * 
 *  Settings
 *  @module settings/settings
 * 
 */


import Express from 'express'


export default

    ( app: Express.Application ): void => {

        /**
         * 
         *  Your Settings goes here!!
         *  @settings
         * 
         */

        // app.set( 'key', value )

        // Public directory:
        app.use( Express.static( './../public' ) )
        
    }

;
