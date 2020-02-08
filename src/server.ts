/**
 * 
 *  Server Webservice
 *  @module server
 * 
 */


import express from 'express'
import morgan from 'morgan'


export default
    /**
     * 
     *  Initializes the Server
     *  @class Server
     * 
     */
    class Server {

        private server: express.Application
        private port? : number | string


        /**
         * 
         *  @constructor
         *  @param port? : number | string
         * 
         */
        constructor( port? : number | string ) {
            this.server = express()
            this.port = port

            this.settings()
            this.middlewares()
        }


        /**
         * 
         *  Settings for Server
         * 
         *  @method
         *  @returns void
         * 
         */
        private settings(): void {
            this.server.set( 'port', this.port || process.env.PORT || 4000 )
        }


        /**
         * 
         *  Sets All Middlewares
         *  
         *  @method
         *  @returns void
         * 
         */
        private middlewares(): void {
            this.server.use( morgan('dev') )
        }


        /**
         * 
         *  Runs the Server on specified/system/default port
         * 
         *  @method
         *  @returns Promise
         * 
         */
        public async listen(): Promise <any> {
            await this.server.listen( this.server.get('port') )
            console.log( 'Server running on port', this.server.get('port') )
        }

    }
;
