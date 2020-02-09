/**
 *
 *  Server
 * 
 *  @module server
 *  @description Provides a Nodejs Server
 * 
 */


import Express, { Application as ExpressApp } from 'express'
import Morgan from 'morgan'

import MainRouter from './routes/main.routes'


/**
 * 
 *  Definitions for Server new Instances parameters
 *  @typedef
 * 
 */
type ServerProps = {
    port?: number | string
}


export default
    /**
     * 
     *  @class Server
     *  @classdesc Initializes the Server
     * 
     */
    class Server {
        
        /**
         * 
         *  @property { ExpressApp } server
         * 
         */
        private server: ( ExpressApp | null ) = null

        /**
         * 
         *  @private @property { number | string } port
         * 
         */
        private port? : number | string

        /**
         *
         *  Singleton Instance
         *  @private @property { Server } instance
         * 
         */
        private static instance: Server
        

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
         *  @description Creates or returns a Singleton Instance for Server
         * 
         *  @method create
         *  @param { number | string } port? - Port number
         * 
         */
        public static create( { port }: ServerProps ): Server {

            if ( ! Server.instance ) {

                // Creates a new Instance:
                Server.instance = new Server()
                Server.instance.server = Express()

                // Sets properties:
                Server.instance.port = port

                // Executes methods:
                Server.instance.settings()
                Server.instance.middlewares()
                Server.instance.routes()

            }

            return Server.instance

        }


        /**
         * 
         *  Gets Express Server Instance
         *  @returns { ExpressApp }
         *  
         */
        public getService(): ExpressApp {
            return <ExpressApp> this.server
        }


        /**
         * 
         *  Settings for Server
         * 
         *  @private @method settings
         *  @returns void
         * 
         */
        private settings(): void {
            const $this = {
                server: <ExpressApp> this.server
            }


            /**
             * 
             *  Your settings goes here!!
             *  Use $this instead this
             * 
             */
            $this.server.set( 'port', this.port || process.env.PORT || 4000 )

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
            const $this = {
                server: <ExpressApp> this.server
            }


            /**
             * 
             *  Your middlewares goes here!!
             *  Use $this instead this
             * 
             */
            $this.server.use( Morgan('dev') )

        }


        /**
         * 
         *  Makes Routes for Server
         * 
         *  @private @method routes
         *  @returns void
         * 
         */
        private routes(): void {

            const $this = {
                server: <ExpressApp> this.server
            }


            /**
             * 
             *  Your routes goes here!!
             *  Use $this instead this
             * 
             */
            $this.server.use( MainRouter )

        }


        /**
         * 
         *  Runs the Server on specified/system/default port
         * 
         *  @method listen
         *  @returns { Promise }
         * 
         */
        public async listen(): Promise <any> {
            
            const $this = {
                server: <ExpressApp> this.server
            }

            await $this.server.listen( $this.server.get('port') )
            console.log( 'Server: Nodejs running on port', $this.server.get('port') )

        }

    }
;
