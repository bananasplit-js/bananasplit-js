/**
 *
 *  Express Provider
 * 
 *  @module providers/express
 *  @description the Express Nodejs Provider
 * 
 */


import Express, { Application as ExpressApp } from 'express'
import chalk from 'chalk'

import Settings from '../settings/settings'
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
         *  @private @property { ExpressApp } express
         * 
         */
        private express: ( ExpressApp | null ) = null


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
         *  @returns { ExpressProvider }
         * 
         */
        public static build( config?: AppProps ): ExpressProvider {

            if ( ! ExpressProvider.instance ) {

                // Creates a new instance
                ExpressProvider.instance = new ExpressProvider()
                ExpressProvider.instance.express = Express()

                // Sets properties
                ExpressProvider.instance.port = ( config?.port || 3000 )

                // Executes build parts
                ExpressProvider.instance.settings()
                ExpressProvider.instance.middlewares()
                ExpressProvider.instance.routes()

            }

            return ExpressProvider.instance

        }


        /**
         * 
         *  Returns the ExpressProvider singleton instance
         * 
         *  @static @method
         *  @returns { ExpressProvider }
         * 
         */
        public static getInstance = (): ExpressProvider => ExpressProvider.instance


        /**
         * 
         *  Gets Express Server instance (app)
         * 
         *  @method get
         *  @returns { ExpressApp }
         *  
         */
        public get = (): ExpressApp => <ExpressApp> ExpressProvider.getInstance().express


        /**
         * 
         *  Settings for ExpressProvider
         * 
         *  @private @method settings
         *  @returns void
         * 
         */
        private settings(): void {

            this.express?.set( 'port', this.port )

            /**
             *  Then do custom settings
             *  @overwrite
             */
            Settings( <ExpressApp> this.express )

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
            Middlewares( <ExpressApp> this.express )
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
            this.express?.use( MainRouter )
        }


        /**
         * 
         *  Start Express Server on the specified or default port
         * 
         *  @async @method start
         *  @returns { Promise }
         * 
         */
        public async start( port?: number ): Promise <any> {
            
            if ( port )
                this.express?.set( 'port', port )
            ;

            await this.express?.listen( this.express?.get('port') )

            console.log(
                chalk.bgYellow.black( 'App' ), '->',
                chalk.bgWhite.black( `http://localhost:${this.express?.get('port')} `)
            )

            console.log( '\nYour app is running!\n' )

        }

    }
;
