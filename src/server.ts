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


/**
 * 
 *  Definitions for Server new Instances parameters
 * 
 */
type ServerProps = {
    port? : number | string
}


export
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
         *  @private
         * 
         */
        private port? : number | string


        /**
         * 
         *  @constructor
         *  @param { number | string } port? - Port number
         * 
         */
        constructor( { port }: ServerProps ) {

            this.server = express()
            this.port = port

            this.settings()
            this.middlewares()
            this.routes()
            
        }


        /**
         * 
         *  Get Instance of Server Express
         *  @returns { express.Application }
         *  
         */
        public getInstance(): express.Application {
            return this.server
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
            console.log( 'Server: Nodejs running on port', this.server.get('port') )

        }

    }
;




import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerExpress } from 'apollo-server-express'

import Schema from './schema'
import Resolvers from './resolvers'


/**
 * 
 *  Definitions for Apollo new Instances parameters
 * 
 */
type ApolloProps = {
    port? : number
    middleware? : Server
}


export
    /**
     * 
     *  @class Apollo
     *  @classdesc Provides GraphQL throws Apollo Service
     * 
     */
    class Apollo {

        /**
         *
         *  @property { number } port
         *  @private
         * 
         */
        private port: number

        /**
         *
         *  @property { ApolloServer } server
         *  @private
         * 
         */
        private server: ApolloServerExpress | ApolloServer


        /**
         *
         *  @constructor
         * 
         *  @param { number } port?
         *  @param { Server } middleware?
         * 
         */
        constructor( { port, middleware }: ApolloProps ) {

            this.port = ( port || process.env.PORT || 5000 ) as number

            const options: object = {
                typeDefs: Schema,
                resolvers: Resolvers
            }

            if ( middleware ) {

                this.server = new ApolloServerExpress( options )

                this.server.applyMiddleware({
                    app: middleware.getInstance()
                })

                console.log( 'Server: Apollo running on', this.server.graphqlPath )

            } else

                this.server = new ApolloServer( options )
            ;

        }


        /**
         *
         *  Runs the Apollo Server on specified/system/default port
         * 
         *  @method listen
         *  @returns { Promise }
         * 
         */
        public async listen(): Promise <void> {
            
            const server = this.server as ApolloServer

            await server.listen( this.port )
            console.log( 'Server: Apollo running on port', this.port )

        }

    }
;
