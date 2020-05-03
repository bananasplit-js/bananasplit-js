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
import handlebars from 'express-handlebars'
import path from 'path'


export default

    ( app: Express.Application ) => {

        /**
         * 
         *  @settings @overwrite
         *  Your Express settings goes here.
         * 
         */

        // Template engine
        app.engine( 'hbs', handlebars({
            extname: '.hbs'
        }))

        // Public source
        app.set( 'public', path.join( __dirname, '../public' ) )

        // Sass source
        app.set( 'sass', path.join( __dirname, '../app/views/sass' ) )
        app.set( 'sass:output', app.get( 'public' ) )

        // Handlebars source
        app.set( 'views', path.join( __dirname, '../app/views' ) )
        app.set( 'view engine', 'hbs' )

        // jQuery source
        app.set( 'jquery', path.join( __dirname, '../../node_modules/jquery/dist' ) )

        // Bootstrap source
        app.set( 'bootstrap@css', path.join( __dirname, '../../node_modules/bootstrap/dist/css' ) )
        app.set( 'bootstrap@js', path.join( __dirname, '../../node_modules/bootstrap/dist/js' ) )
        app.set( 'popper', path.join( __dirname, '../../node_modules/@popperjs/core/dist/umd' ) )
        
    }

;
