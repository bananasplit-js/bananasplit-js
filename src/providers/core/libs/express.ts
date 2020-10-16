/**
 *
 *  Provider: Express
 *  @module providers/core/libs/express
 * 
 *  @description the express nodejs provider
 * 
 */
import http from 'http'
import Express from 'express'

import Settings from '@settings/express'
import SetupRouter from '@providers/core/app/routes/setup.routes'

import { loadResources, getRouters, getMiddlewares } from '@providers/core/helpers/resources'

// Interfaces
import { IModule } from '@providers/core/interfaces'


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

            this.port = config?.port || <number>( process.env.PORT || this.port )
            this.service.set( 'port', this.port )
            
            /**
             *  custom settings @overwrite
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

            const modulePaths: IModule[] = getMiddlewares()

            if ( modulePaths.length )
                loadResources({ service:this.service, modulePaths })
            ;
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

            const modulePaths: IModule[] = getRouters()
            
            if ( modulePaths.length ) {
                loadResources({
                    service: this.service,
                    modulePaths,
                    callback: ( $router: Express.Router ) => {
                        this.service.use( $router )
                    }
                })
                
            } else {
                const defaultRouter: Express.Router = SetupRouter( this.service )
                this.service.use( defaultRouter )
            }

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
