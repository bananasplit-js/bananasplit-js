/**
 *
 *  Express Provider
 * 
 *  @module providers/express
 *  @description the Express Nodejs Provider
 * 
 */


import http from 'http'
import Express, { Application as ExpressApp } from 'express'
import chalk from 'chalk'

import Settings from '../settings/express.settings'
import Middlewares from '../middlewares/middleware'
import MainRouter from '../app/routes/main.routes'


/**
 * 
 *  Definitions for ExpressProvider Singleton parameters
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
         *  @private @property { ExpressApp } service
         * 
         */
        private service: ( ExpressApp | undefined )


        /**
         * 
         *  @private @property { number | string } port
         * 
         */
        private port? : number | string

        
        /**
         *
         *  Singleton instance
         *  @private @static @property { ExpressProvider } instance
         * 
         */
        private static instance: ExpressProvider
        


        /**
         * 
         *  @constructor
         *  @private
         * 
         *  Not accesible
         *  Implements: Singleton pattern
         * 
         */
        private constructor() {
            // Singleton      
        }

        
        /**
         *  
         *  Singleton
         *  @description Build or returns a Singleton instance for ExpressProvider
         * 
         *  @static @method build
         *  @param { AppProps } config? - Configuration object
         * 
         *  @returns { ExpressProvider } instance
         * 
         */
        public static build( config?: AppProps ): ExpressProvider {

            if ( ! this.instance ) {

                // Creates a new instance
                this.instance = new ExpressProvider()
                this.instance.service = Express()

                // Sets properties
                this.instance.port = ( config?.port || 3000 )

                // Executes build parts
                this.instance.settings()
                this.instance.middlewares()
                this.instance.routes()

            }

            return this.instance

        }


        /**
         * 
         *  Returns the ExpressProvider singleton instance
         * 
         *  @static @method getInstance
         *  @returns { ExpressProvider } instance
         * 
         */
        public static getInstance = (): ExpressProvider => ExpressProvider.instance


        /**
         * 
         *  Gets Express Server App
         * 
         *  @method app
         *  @returns { ExpressApp } express
         *  
         */
        public app = (): ExpressApp => <ExpressApp> ExpressProvider.getInstance().service


        /**
         * 
         *  Settings for ExpressProvider
         * 
         *  @private @method settings
         *  @returns void
         * 
         */
        private settings(): void {

            this.service?.set( 'port', this.port )

            /**
             *  Then do custom settings
             *  @overwrite
             */
            Settings( <ExpressApp> this.service )

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
            Middlewares( <ExpressApp> this.service )
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
            this.service?.use( MainRouter )
        }


        /**
         * 
         *  Start Express Server on the specified or default port
         * 
         *  @async @method start
         *  @returns { Promise } httpServer
         * 
         */
        public async start( port?: number ): Promise <http.Server> {
            
            if ( port )
                this.service?.set( 'port', port )
            ;

            const httpServer: http.Server = await this.service?.listen( this.service?.get('port') )!

            
            if ( process.env.NODE_ENV === 'development' ) {

                console.log(
                    chalk.bgYellow.black( 'App' ), '->',
                    chalk.bgWhite.black( `http://localhost:${this.service?.get('port')} `)
                )

                console.log( 'Your app is running!\n' )

            }


            return httpServer

        }

    }
;
