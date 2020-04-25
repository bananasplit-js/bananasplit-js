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
import handlebars from 'express-handlebars'
import path from 'path'


export default

    ( app: Express.Application ) => {

        /**
         * 
         *  @settings @overwrite
         *  Your App settings goes here.
         * 
         */
        app.engine( 'hbs', handlebars({
            extname: '.hbs'
        }))

        app.set( 'public', path.join( __dirname, '/../public' ) )
        app.set( 'sass', path.join( __dirname, '/../app/views/sass' ) )
        app.set( 'sass:output', app.get( 'public' ) )
        app.set( 'views', path.join( __dirname, '/../app/views' ) )
        app.set( 'view engine', 'hbs' )
        
    }

;
