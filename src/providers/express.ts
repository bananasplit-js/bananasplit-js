/**
 *
 *  Express Provider
 * 
 *  @module providers/express
 *  @description the Express Nodejs Provider
 * 
 */


import Express, { Application as ExpressApp } from 'express'
import path from 'path'

import Settings from '../settings/settings'
import Middlewares from '../middlewares/middleware'
import MainRouter from '../routes/main.routes'


/**
 * 
 *  Definitions for ExpressProvider singleton parameters
 *  @typedef
 * 
 */
type AppProps = {
    port?: number | string
}


export default
    /**
     * 
     *  @class ExpressProvider
     *  @classdesc Provides an Express Server
     * 
     */
    class ExpressProvider {
        
        /**
         * 
         *  @private @property { ExpressApp } app
         * 
         */
        private app: ( ExpressApp | null ) = null

        /**
         * 
         *  @private @property { number | string } port
         * 
         */
        private port? : number | string | undefined

        /**
         *
         *  Singleton Instance
         *  @private @static @property { ExpressProvider } instance
         * 
         */
        private static instance: ExpressProvider
        

        /**
         * 
         *  @constructor
         *  @private
         * 
         *  Not Accesible.
         *  Implements: Singleton Pattern
         * 
         */
        private constructor() {
            // Singleton      
        }

        /**
         *  
         *  Singleton
         *  @description Build or returns a Singleton Instance for ExpressProvider
         * 
         *  @static @method build
         *  @param { AppProps } config? - Config object
         * 
         *  @returns { ExpressProvider }
         * 
         */
        public static build( config?: AppProps ): ExpressProvider {

            if ( ! ExpressProvider.instance ) {

                // Creates a new Instance:
                ExpressProvider.instance = new ExpressProvider()
                ExpressProvider.instance.app = Express()

                // Sets properties:
                ExpressProvider.instance.port = config?.port

                // Executes methods:
                ExpressProvider.instance.settings()
                ExpressProvider.instance.middlewares()
                ExpressProvider.instance.routes()

            }

            return ExpressProvider.instance

        }


        /**
         * 
         *  Returns the ExpressProvider singleton Instance
         * 
         *  @static @method
         *  @returns { ExpressProvider }
         * 
         */
        public static getInstance(): ExpressProvider {
            return ExpressProvider.instance
        }


        /**
         * 
         *  Gets Express Server Instance
         * 
         *  @method get
         *  @returns { ExpressApp }
         *  
         */
        public get(): ExpressApp {
            return <ExpressApp> this.app
        }


        /**
         * 
         *  Settings for ExpressProvider
         * 
         *  @private @method settings
         *  @returns void
         * 
         */
        private settings(): void {

            this.app?.set( 'port', this.port || process.env.PORT || 4000 )
            this.app?.set( 'public', path.join( __dirname, '/../public' ) )
            this.app?.set( 'sass', path.join( __dirname, '/../views/sass' ) )
            this.app?.set( 'sass:output', this.app?.get( 'public' ) )

            /**
             *  Then do custom settings:
             *  @overwrite
             */
            Settings( <ExpressApp> this.app )

        }


        /**
         * 
         *  Sets All Middlewares
         * 
         *  @private @method middlewares
         *  @returns void
         * 
         */
        private middlewares(): void {
            Middlewares( <ExpressApp> this.app )
        }


        /**
         * 
         *  Adds Routes for ExpressProvider
         * 
         *  @private @method routes
         *  @returns void
         * 
         */
        private routes(): void {
            MainRouter( <ExpressApp> this.app )
        }


        /**
         * 
         *  Start Express Server on specified / system / default port
         * 
         *  @async @method start
         *  @returns { Promise }
         * 
         */
        public async start( port?: number ): Promise <any> {

            await this.app?.listen( port || this.app.get('port') )
            console.log( 'Express: running on port', this.app?.get('port') )

        }

    }
;
