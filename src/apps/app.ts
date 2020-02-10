/**
 *
 *  App
 * 
 *  @module app
 *  @description the Express Nodejs App
 * 
 */


import Express, { Application as ExpressApp } from 'express'

import Settings from '../settings/app.settings'
import Middlewares from '../middlewares/middleware'
import MainRouter from '../routes/main.routes'


/**
 * 
 *  Definitions for App new Instances parameters
 *  @typedef
 * 
 */
type AppProps = {
    port?: number | string
}


export default
    /**
     * 
     *  @class App
     *  @classdesc Initializes the App
     * 
     */
    class App {
        
        /**
         * 
         *  @property { ExpressApp } app
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
         *  @private @property { App } instance
         * 
         */
        private static instance: App
        

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
         *  @description Build or returns a Singleton Instance for App
         * 
         *  @method build
         *  @param { AppProps } config? - Config object
         * 
         */
        public static build( config?: AppProps ): App {

            if ( ! App.instance ) {

                // Creates a new Instance:
                App.instance = new App()
                App.instance.app = Express()

                // Sets properties:
                App.instance.port = config?.port

                // Executes methods:
                App.instance.settings()
                App.instance.middlewares()
                App.instance.routes()

            }

            return App.instance

        }


        /**
         * 
         *  Returns the App class Instance
         *  @method
         * 
         */
        public static getInstance(): App {
            return App.instance
        }


        /**
         * 
         *  Gets Express App Instance
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
         *  Settings for App
         * 
         *  @private @method settings
         *  @returns void
         * 
         */
        private settings(): void {

            this.app?.set( 'port', this.port || process.env.PORT || 4000 )
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
         *  Makes Routes for App
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
         *  Start the App on specified/system/default port
         * 
         *  @method start
         *  @returns { Promise }
         * 
         */
        public async start( port?: number ): Promise <any> {

            await this.app?.listen( port || this.app.get('port') )
            console.log( 'App: running on port', this.app?.get('port') )

        }

    }
;
