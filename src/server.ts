/**
 *
 *  Server
 * 
 *  @module server
 *  @description Provides Backend Services
 * 
 */


import express from 'express'
import morgan from 'morgan'

import MainRouter from './routes/main.routes'


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
         *  @property { express.Application } server
         * 
         */
        private server: express.Application
        /**
         * 
         *  @property { number | string } port
         * 
         */
        private port? : number | string


        /**
         * 
         *  @constructor
         *  @param { number | string } port? - Port number
         * 
         */
        constructor( port? : number | string ) {
            this.server = express()
            this.port = port

            this.settings()
            this.middlewares()
            this.routes()
        }


        /**
         * 
         *  Settings for Server
         *  @method settings
         * 
         *  @private
         *  @returns void
         * 
         */
        private settings(): void {
            this.server.set( 'port', this.port || process.env.PORT || 4000 )
        }


        /**
         * 
         *  Sets All Middlewares
         *  @method middlewares
         *  
         *  @private
         *  @returns void
         * 
         */
        private middlewares(): void {
            this.server.use( morgan('dev') )
        }


        /**
         * 
         *  Makes Routes for Server
         *  @method routes
         *  
         *  @private
         *  @returns void
         * 
         */
        private routes(): void {
            this.server.use( MainRouter )
        }


        /**
         * 
         *  Runs the Server on specified/system/default port
         *  @method listen
         * 
         *  @returns { Promise }
         * 
         */
        public async listen(): Promise <any> {
            await this.server.listen( this.server.get('port') )
            console.log( 'Server running on port', this.server.get('port') )
        }

    }
;
