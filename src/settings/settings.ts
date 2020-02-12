/**
 * 
 *  Settings
 *  @settings
 * 
 *  @module settings/settings
 *  @description Settings for Application
 * 
 */


import Express from 'express'
import path from 'path'


export default

    ( app: Express.Application ) => {

        /**
         * 
         *  Your App settings goes here!!
         *  @settings @overwrite
         * 
         */

        app.set( 'public', path.join( __dirname, '/../public' ) )
        app.set( 'views', path.join( __dirname, '/../app/views' ) )
        app.set( 'sass', path.join( __dirname, '/../app/views/sass' ) )
        app.set( 'sass:output', app.get( 'public' ) )
        
    }

;
