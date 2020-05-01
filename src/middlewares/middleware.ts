/**
 * 
 *  Middlewares
 *  @middleware
 * 
 *  @module middlewares/middleware
 *  @description Contains all middlewares
 * 
 */


 
import Express from 'express'
import Morgan from 'morgan'
import SassMiddleware from 'node-sass-middleware'
import dontenv from 'dotenv'
import path from 'path'


dontenv.config()



export default

    ( app: Express.Application ) => {
        
        /**
         *
         *  @middlewares 
         *  Your Middlewares goes here.
         * 
         */
        
        if ( process.env.NODE_ENV === 'development' )
            app.use( Morgan('dev') )
        ;

        app.use( Express.json() )

        // Compile scss files into css
        app.use( SassMiddleware({

            src: app.get( 'sass' ),
            dest: app.get( 'sass:output' ),
            outputStyle: 'compressed',
            debug: process.env.NODE_ENV === 'development'

        }))

        // Public
        app.use( Express.static(app.get( 'public' )) )

        // jQuery
        app.use( '/js', Express.static(app.get( 'jquery' )) )

        // Bootstrap
        app.use( '/css', Express.static(app.get( 'bootstrap@css' )) )
        app.use( '/js', Express.static(app.get( 'bootstrap@js' )) )

    }
;
