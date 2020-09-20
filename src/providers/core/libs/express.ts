/**
 *
 *  Provider: Express
 *  @module providers/modules/express
 * 
 *  @description the express nodejs provider
 * 
 */
import http from 'http'
import Express, { Router, Request, Response } from 'express'

import Settings from '@settings/express'
import Middlewares from '@middlewares/express'
import MainRouter from '@routes/main.routes'

import SetupController from '@bananasplit-js/app/controllers/setup.controller'


/**
 * 
 *  Definitions for ExpressProvider singleton parameters
 *  @type { AppProps }
 * 
 */
type AppProps = {
    port?: number
}


export default
    /**
     * 
     *  @class ExpressProvider
     *  @classdesc provides an express server
     * 
     */
    class ExpressProvider {

        /**
         *
         *  @property { string } name
         * 
         */
        public readonly name: string = 'Express'

        
        /**
         * 
         *  @private @property { Express.Application } service
         * 
         */
        private service!: Express.Application


        /**
         * 
         *  @property { number } port
         * 
         */
        public port: number = 3627

        
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
         *  Implements: singleton pattern
         * 
         */
        private constructor () {
            // Singleton      
        }

        
        /**
         *  
         *  Singleton
         *  @description provides or returns a singleton instance for ExpressProvider
         * 
         *  @static @method provide
         *  @param { AppProps } config? - configuration object
         * 
         *  @returns { ExpressProvider }
         * 
         */
        public static provide ( config?: AppProps ): ExpressProvider {

            if ( !this.instance ) {

                // Creates a new instance
                this.instance = new ExpressProvider()
                this.instance.service = Express()
                
                // Executes provide build parts
                this.instance.settings( config )
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
         *  @returns { ExpressProvider }
         * 
         */
        public static getInstance = (): ExpressProvider => ExpressProvider.instance


        /**
         * 
         *  Gets express application
         * 
         *  @method application
         *  @returns { Express.Application }
         *  
         */
        public application = (): Express.Application => <Express.Application> ExpressProvider.getInstance().service


        /**
         * 
         *  Settings for ExpressProvider
         * 
         *  @private @method settings
         * 
         *  @params { AppProps } config?
         *  @returns { void }
         * 
         */
        private settings ( config?: AppProps ): void {

            this.service.set( 'port', config ? (config.port || this.port) : this.port )
            this.port = this.service.get( 'port' )

            /**
             *  Then do custom settings
             *  @overwrite
             */
            Settings( <Express.Application> this.service )

        }


        /**
         * 
         *  Sets all middlewares
         * 
         *  @private @method middlewares
         *  @returns { void }
         * 
         */
        private middlewares (): void {
            Middlewares( <Express.Application> this.service )
        }


        /**
         * 
         *  Adds routes for ExpressProvider
         * 
         *  @private @method routes
         *  @returns { void }
         * 
         */
        private routes (): void {

            this.service.use( MainRouter.length ?
                MainRouter : Router().get( '/', SetupController.hello )
            )

        }


        /**
         * 
         *  Serve express in the specified port
         * 
         *  @async @method serve
         *  @returns { http.Server }
         * 
         */
        public serve ( port?: number ): http.Server {
            
            if ( port )
                this.service.set( 'port', this.port=port )
            ;

            const httpServer: http.Server = this.service.listen( this.service.get('port') )


            return httpServer

        }

    }
;
