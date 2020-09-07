/**
 * 
 *  Settings for Express
 *  @settings
 * 
 *  @module settings/express.settings
 *  @description Settings for the Express Application
 * 
 */


import Express from 'express'
import path from 'path'


export default

    ( app: Express.Application ) => {

        /**
         * 
         *  @settings @overwrite
         *  Your Express settings goes here.
         * 
         */

        // Public source
        app.set( 'public', path.join( __dirname, '../public' ) )
        
    }

;
