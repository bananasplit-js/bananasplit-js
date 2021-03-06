/**
 * 
 *  Settings: Express
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
         *  @settings
         */

        // Public folder
        app.set( 'public', path.join(__dirname, '../../public') )
        
    }

;

