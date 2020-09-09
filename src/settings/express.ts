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
         *  Your Express settings goes here
         * 
         */

        // Public folder
        app.set( 'public', path.join(__dirname, '../public') )
        
    }

;
