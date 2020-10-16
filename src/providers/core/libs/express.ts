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

import CustomSettings from '@settings/express'
import SetupRouter from '@core/app/routes/setup.routes'

import { loadResources, getRouters, getMiddlewares } from '@core/helpers/resources'

// Interfaces
import { IModule } from '@core/interfaces'


/**
 * 
 *  Definition for config options
 *  @interface { IC }
 * 
 */
interface IC {
    port?: number
}


export default
    /**
     * 
     *  @class ExpressProvider
     *  @description provides an express server
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
         *  @property { Express.Application } service
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
         *  @property { ExpressProvider } instance
         * 
         */
        private static instance: ExpressProvider
        

        /**
         * 
         *  @constructor
         * 
         *  Not accesible
         *  Implements: singleton pattern
         * 
         */
        private constructor () { /* Singleton */ }

        
        /**
         *  
         *  Singleton
         *  @description provides or returns a singleton instance for ExpressProvider
         * 
         *  @method provide
         *  @param { IC } config - config object
         * 
         *  @returns { ExpressProvider }
         * 
         */
        public static provide ( config?: IC ): ExpressProvider {

            if ( !this.instance ) {
                this.instance = new ExpressProvider()
                this.instance.service = Express()
                
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
         *  @method getInstance
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
        public application = (): Express.Application => ExpressProvider.getInstance().service


        /**
         * 
         *  Settings for ExpressProvider
         * 
         *  @method settings
         * 
         *  @params { IC } config object
         *  @returns { void }
         * 
         */
        private settings ( config?: IC ): void {

            this.port = config?.port || <number> ( process.env.PORT || this.port )
            this.service.set( 'port', this.port )
            
            /** Custom settings @overwrite */
            CustomSettings( this.service )

        }


        /**
         * 
         *  Sets all middlewares
         * 
         *  @method middlewares
         *  @returns { void }
         * 
         */
        private middlewares (): void {

            const modulePaths: IModule[] = getMiddlewares()
            modulePaths.length && loadResources({ service: this.service, modulePaths })
            
        }


        /**
         * 
         *  Adds routes for ExpressProvider
         * 
         *  @method routes
         *  @returns { void }
         * 
         */
        private routes (): void {

            const modulePaths: IModule[] = getRouters()
            
            if ( modulePaths.length ) {
                loadResources({
                    service: this.service,
                    modulePaths,
                    callback: ( $router: Express.Router ) => this.service.use( $router )
                })

                return
            }

            const defaultRouter: Express.Router = SetupRouter( this.service )
            this.service.use( defaultRouter )

        }


        /**
         * 
         *  Serve express in the specified port
         * 
         *  @method serve
         *  @returns { http.Server }
         * 
         */
        public serve (): http.Server {
            return this.service.listen( this.port )
        }

    }
;
