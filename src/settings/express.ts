/**
 * 
 *  Settings: Express
 *  @settings
 *  @module settings/express
 * 
 *  @description contains all express server settings
 * 
 */
import Express from 'express'
import path from 'path'


export default

    ( app: Express.Application ) => {

        /**
         * 
         *  @settings @overwrite
         *  Your express settings goes here
         * 
         */

        // Public folder
        app.set( 'public', path.join(__dirname, '../public') )
        
    }

;
